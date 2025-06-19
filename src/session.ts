import { Socket } from 'net';
import { TLSSocket, SecureContextOptions } from 'tls';
import PDU from './PDU';
import { getDTO } from './dtos';
import { Logger } from './utils/logger';
import {
    CommandName,
    InterfaceVersion,
    BindTransceiverFunction,
    BindTransceiverParams,
    SubmitSmFunction,
    SubmitSmParams,
    EnquireLinkFunction,
    BindReceiverParams,
    BindReceiverFunction,
} from './types';

export default class Session {
    private socket!: Socket | TLSSocket;
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
        private readonly debug = false,
        private readonly secure: { tls?: boolean; unsafeBuffer?: boolean; secureOptions?: SecureContextOptions },
    ) {
        this.initSession();
        this.initResponseEnd();
        this.initResponseRead();
    }

    initSession(): void {
        if (this.secure.tls === true) {
            this.socket = new TLSSocket(new Socket(), { isServer: false });
        } else {
            this.socket = new Socket();
        }

        this.logger = new Logger(this.socket, { debug: this.debug });
        this.PDU = new PDU(this.socket, { unsafeBuffer: this.secure.unsafeBuffer || false });
    }

    initResponseEnd(): void {
        this.socket.on('end', () => {
            this.connected = false;
            this.logger.debug(`disconnect - forced - disconnected from smpp server.`);
            this.socket.destroy();
            throw new Error('Server closed the conn.');
        });
    }

    initResponseRead(): void {
        this.socket.on('readable', () => {
            try {
                const data = this.socket.read();

                if (data) {
                    const pdu = this.PDU.readPdu(data);
                    this.socket.emit('pdu', pdu);
                }
            } catch (error) {
                this.socket.emit('error', error);
            }
        });
    }

    connect({ host, port }: { host: string; port: number }): void {
        this.socket.connect(port, host, () => {
            this.connected = true;
            this.logger.debug(`connect - called - connected to smmp server using secure set to: ${this.secure.tls}`, { host, port });
        });
    }

    disconnect(): boolean {
        this.socket.destroy();
        this.connected = false;
        this.logger.debug(`disconnect - called - disconnected to smpp server.`);
        return this.socket.closed;
    }

    on(eventName: 'connect' | 'close' | 'end' | 'error' | 'timeout' | 'debug' | 'data' | 'pdu' | CommandName, callback: (...args: unknown[]) => void) {
        this.socket.on(eventName, callback);
    }

    bindTransceiver(params: BindTransceiverParams): boolean {
        this.logger.debug(`bindTransceiver - called`, params);

        if (!params.interfaceVersion) {
            params.interfaceVersion = this.interfaceVersion;
        }

        const dto = getDTO<BindTransceiverFunction>('bind_transceiver')(params);
        this.sequenceNumber += 1;
        return this.PDU.call({ command: 'bind_transceiver', sequenceNumber: this.sequenceNumber, dto });
    }

    bindReceiver(params: BindReceiverParams): boolean {
        this.logger.debug(`bindReceiver - called`, params);

        if (!params.interfaceVersion) {
            params.interfaceVersion = this.interfaceVersion;
        }

        const dto = getDTO<BindReceiverFunction>('bind_receiver')(params);
        this.sequenceNumber += 1;
        return this.PDU.call({ command: 'bind_receiver', sequenceNumber: this.sequenceNumber, dto });
    }

    submitSm(params: SubmitSmParams): boolean {
        this.logger.debug(`submitSm - called`, params);

        const dto = getDTO<SubmitSmFunction>('submit_sm')(params);
        this.sequenceNumber += 1;
        return this.PDU.call({ command: 'submit_sm', sequenceNumber: this.sequenceNumber, dto });
    }

    enquireLink(): boolean {
        this.logger.debug(`enquireLink - called`);

        const dto = getDTO<EnquireLinkFunction>('enquire_link')({});
        this.sequenceNumber += 1;
        return this.PDU.call({ command: 'enquire_link', sequenceNumber: this.sequenceNumber, dto });
    }
}
