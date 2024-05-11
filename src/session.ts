import { Socket } from 'net';
import PDU from './PDU';
import { Logger } from './utils/logger';
import { BindTransceiverFunction } from './dtos/bind_transceiver';
import { getDTO } from './dtos';
import { CommandName, InterfaceVersion } from './types';
import { SubmitSmFunction, SubmitSmParams } from './dtos/submit_sm';

export default class Session {
    private socket!: Socket;
    private logger!: Logger;
    private PDU!: PDU;
    private sequenceNumber: number = 0;
    private _connected: boolean = false;

    public get connected(): boolean {
        return this._connected;
    }

    private set connected(value: boolean) {
        this._connected = value;
    }

    public get closed(): boolean {
        return this.socket.closed;
    }

    constructor(
        private readonly interfaceVersion: InterfaceVersion,
        private readonly debug = false
    ) {
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
            try {
                const pdu = this.PDU.readPdu(this.socket.read());
                this.socket.emit('pdu', pdu);
            } catch (error) {
                this.socket.emit('error', error);
            }
        });
    }

    connect({ host, port }: { host: string; port: number }) {
        this.socket.connect(port, host, () => {
            this.connected = true;
            console.log('Connected to SMPP server.');
        });
    }

    disconnect(): boolean {
        this.socket.destroy();
        this.connected = false;
        return this.socket.closed;
    }

    on(eventName: 'connect' | 'close' | 'error' | 'timeout' | 'debug' | 'data' | 'pdu' | CommandName, callback: (...args: any[]) => void) {
        this.socket.on(eventName, callback);
    }

    bindTransceiver({ systemId, password }: { systemId: string; password: string }): boolean {
        const dto = getDTO<BindTransceiverFunction>('bind_transceiver')({
            systemIdValue: systemId,
            passwordValue: password,
            interfaceVersionValue: this.interfaceVersion,
        });
        this.sequenceNumber += 1;
        return this.PDU.call('bind_transceiver', this.sequenceNumber, this.socket, dto);
    }

    submitSm(params: SubmitSmParams): boolean {
        const dto = getDTO<SubmitSmFunction>('submit_sm')(params);
        this.sequenceNumber += 1;
        return this.PDU.call('submit_sm', this.sequenceNumber, this.socket, dto);
    }
}
