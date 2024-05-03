import { Socket } from 'net';
import PDU from './PDU';
import { Logger } from './utils/logger';
import { Commands } from './helpers';


export default class Session {
    private socket!: Socket;
    private logger!: Logger;
    private PDU!: PDU;
    private sequenceNumber: number = 0;

    public get closed(): boolean {
        return this.socket.closed;
    }

    constructor(private readonly debug = false) {
        this.initSession();
        this.initResponseRead();
    }

    initSession() {
        this.socket = new Socket();
        this.logger = new Logger(this.socket, { debug: this.debug });
        this.PDU = new PDU();
    }

    initResponseRead() {
        this.socket.on('readable', () => {
            const pdu = this.PDU.readPduBuffer(this.socket.read());
            this.socket.emit('pdu', pdu);
        });
    }

    connect({ host, port }: { host: string; port: number }) {
        this.socket.connect(port, host, () => {
            console.log('Connected to SMPP server.');
        });
    }

    disconnect(): boolean {
        this.socket.destroy();
        return this.socket.closed;
    }


    on(eventName: 'connect' | 'close' | 'error' | 'timeout' | 'debug' | 'data' | 'pdu'  | Commands, callback: (...args: any[]) => void) {
        this.socket.on(eventName, callback);
    }

    bindTransceiver({ system_id, password }: { system_id: string; password: string }): boolean {
        this.sequenceNumber += 1;
        return this.PDU.call('bind_transceiver', this.sequenceNumber, this.socket, { system_id, password });
    }
}
