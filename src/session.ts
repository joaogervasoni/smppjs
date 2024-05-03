import { Socket } from 'net';
import PDU from './PDU';
import { Logger } from './utils/logger';

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
            this.PDU.readPduBuffer(this.socket.read());
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

    on(eventName: 'connect' | 'close' | 'error' | 'timeout' | 'debug' | 'data', callback: (...args: any[]) => void) {
        this.socket.on(eventName, callback);
    }

    bindTransceiver(): boolean {
        this.sequenceNumber += 1;
        return this.PDU.call('bind_transceiver', this.sequenceNumber, this.socket);
    }
}
