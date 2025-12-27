import { Socket } from 'net';
import { TLSSocket, SecureContextOptions } from 'tls';
import PDU from './PDU';
import { getDTO, DTOPayloadMap } from './dtos';
import { Logger } from './utils/logger';
import {
    InterfaceVersion,
    BindTransceiverFunction,
    BindTransceiverParams,
    SubmitSmFunction,
    SubmitSmParams,
    EnquireLinkFunction,
    BindReceiverParams,
    BindReceiverFunction,
    UnbindFunction,
    BindTransmitterFunction,
    BindTransmitterParams,
    DataSmParams,
    DataSmFunction,
    QuerySmParams,
    QuerySmFunction,
    CancelSmParams,
    CancelSmFunction,
    ReplaceSmFunction,
    ReplaceSmParams,
    DeliverSmRespFunction,
    DeliverSmRespParams,
    Pdu,
    SubmitMultiParams,
    SubmitMultiFunction,
} from './types';

type EventListener =
    | (() => void)
    | ((hadError: boolean) => void)
    | ((err: Error) => void)
    | ((data: Buffer) => void)
    | ((message: string) => void)
    | ((pdu: Pdu) => void)
    | ((pdu: Pdu<DTOPayloadMap[keyof DTOPayloadMap] & Record<string, string | number>>) => void)
    | ((...args: unknown[]) => void);

export default class Session {
    private socket!: Socket | TLSSocket;
    private logger!: Logger;
    private PDU!: PDU;
    private _sequenceNumber = new Uint32Array(1);
    private storedListeners: Record<string, EventListener[]> = {};
    private _connectionInfo: { host: string; port: number } | undefined = undefined;
    private _remainingAttempts: number | undefined = undefined;
    private _reconnectTimeout: NodeJS.Timeout | undefined = undefined;
    private _reconnectInProgress: boolean = false;

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

    public get reconnectInProgress(): boolean {
        return this._reconnectInProgress;
    }

    private set reconnectInProgress(value: boolean) {
        this._reconnectInProgress = value;
    }

    public get connectionInfo(): { host: string; port: number } | undefined {
        return this._connectionInfo;
    }

    private get sequenceNumber(): number {
        this._sequenceNumber[0] += 1;

        if (this._sequenceNumber[0] === 0) {
            this._sequenceNumber[0] = 1;
        }

        return this._sequenceNumber[0];
    }

    constructor(
        private readonly interfaceVersion: InterfaceVersion,
        private readonly debug = false,
        private readonly timeout: number,
        private readonly secure: { tls?: boolean; unsafeBuffer?: boolean; secureOptions?: SecureContextOptions },
        private readonly reconnect?: { attempts: number; interval: number },
    ) {
        this.initSession();
        this.initResponseEnd();
        this.initResponseError();
        this.initResponseRead();
    }

    initSession(): void {
        if (this.secure.tls === true) {
            this.socket = new TLSSocket(new Socket(), { isServer: false, ...this.secure.secureOptions });
        } else {
            this.socket = new Socket();
        }

        this.socket.setTimeout(this.timeout);
        this.logger = new Logger(this.socket, { debug: this.debug });
        this.PDU = new PDU(this.socket, { unsafeBuffer: this.secure.unsafeBuffer || false });
    }

    initResponseEnd(): void {
        this.socket.removeAllListeners('end');
        this.socket.on('end', () => {
            this.connected = false;
            this.logger.debug(`disconnect - forced - disconnected from smpp server.`);
            this.socket.destroy();

            if (this.reconnect && this._connectionInfo) {
                this.reconnectInProgress = false;
                this.attemptReconnect();
            } else {
                throw new Error('Server closed the conn.');
            }
        });
    }

    initResponseError(): void {
        this.socket.removeAllListeners('error');
        this.socket.on('error', (error: NodeJS.ErrnoException) => {
            const connectionErrors = ['ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND', 'ECONNRESET', 'EHOSTUNREACH'];
            const isConnectionError = error.code && connectionErrors.includes(error.code);

            if (isConnectionError && this.reconnect && this._connectionInfo) {
                this.connected = false;
                this.logger.debug(`disconnect - connection error: ${error.code} - ${error.message}`);
                this.socket.destroy();

                this.reconnectInProgress = false;
                this.attemptReconnect();
            } else {
                throw error;
            }
        });
    }

    private attemptReconnect(): void {
        if (this._remainingAttempts === undefined) {
            this._remainingAttempts = this.reconnect!.attempts;
        }

        if (!this.reconnect || !this.reconnect.interval || !this._connectionInfo) {
            return;
        }

        if (this._reconnectInProgress || this._reconnectTimeout) {
            this.logger.debug('reconnect - already in progress, skipping duplicate attempt.');
            return;
        }

        if (this._remainingAttempts <= 0) {
            throw new Error('Max attempts reached to reconnect. Server closed the conn.');
        }

        this.reconnectInProgress = true;

        this._reconnectTimeout = setTimeout(() => {
            this._remainingAttempts! -= 1;
            this.logger.debug(`reconnect - attempting to reconnect (${this._remainingAttempts!} attempts remaining).`);

            if (this.socket && !this.socket.destroyed) {
                this.socket.destroy();
            }

            this.initSession();
            this.initResponseEnd();
            this.initResponseError();
            this.initResponseRead();
            this.restoreListeners();
            this.connect(this._connectionInfo!);

            this._reconnectTimeout = undefined;
        }, this.reconnect.interval);
    }

    initResponseRead(): void {
        this.socket.removeAllListeners('readable');
        this.socket.on('readable', () => {
            try {
                const data = this.socket.read();

                if (data) {
                    const pdu = this.PDU.readPdu(data);
                    this.socket.emit('pdu', pdu);
                    this.socket.emit(pdu.command, pdu);
                }
            } catch (error) {
                this.socket.emit('error', error);
            }
        });
    }

    connect({ host, port }: { host: string; port: number }): void {
        this._connectionInfo = { host, port };

        this.socket.connect(port, host, () => {
            this.connected = true;
            this._remainingAttempts = undefined;
            this.reconnectInProgress = false;

            if (this._reconnectTimeout) {
                clearTimeout(this._reconnectTimeout);
                this._reconnectTimeout = undefined;
            }

            this.logger.debug(`connect - called - connected to smpp server using secure set to: ${this.secure.tls}`, { host, port });
        });
    }

    disconnect(): boolean {
        if (this._reconnectTimeout) {
            clearTimeout(this._reconnectTimeout);
            this._reconnectTimeout = undefined;
        }

        this.reconnectInProgress = false;
        this.socket.destroy();
        this.connected = false;
        this.logger.debug(`disconnect - called - disconnected to smpp server.`);
        return this.socket.closed;
    }

    on(event: 'connect' | 'end' | 'timeout' | 'readable', listener: () => void): this;
    on(event: 'close', listener: (hadError: boolean) => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'data', listener: (data: Buffer) => void): this;
    on(event: 'debug', listener: (message: string) => void): this;
    on(event: 'pdu', listener: (pdu: Pdu) => void): this;
    on<T extends keyof DTOPayloadMap>(event: T, listener: (pdu: Pdu<DTOPayloadMap[T] & Record<string, string | number>>) => void): this;
    on(event: string, listener: EventListener): this {
        if (!this.storedListeners[event]) {
            this.storedListeners[event] = [];
        }

        this.storedListeners[event].push(listener);
        this.socket.on(event, listener as (...args: unknown[]) => void);
        return this;
    }

    private restoreListeners(): void {
        const events = Object.keys(this.storedListeners);

        for (let i = 0; i < events.length; i += 1) {
            const event = events[i];
            const listeners = this.storedListeners[event];

            for (let j = 0; j < listeners.length; j += 1) {
                this.socket.on(event, listeners[j] as (...args: unknown[]) => void);
            }
        }
    }

    bindTransceiver(params: BindTransceiverParams): boolean {
        this.logger.debug(`bindTransceiver - called`, params);

        if (!params.interfaceVersion) {
            params.interfaceVersion = this.interfaceVersion;
        }

        const dto = getDTO<BindTransceiverFunction>('bind_transceiver')(params);
        return this.PDU.call({ command: 'bind_transceiver', sequenceNumber: this.sequenceNumber, dto });
    }

    bindReceiver(params: BindReceiverParams): boolean {
        this.logger.debug(`bindReceiver - called`, params);

        if (!params.interfaceVersion) {
            params.interfaceVersion = this.interfaceVersion;
        }

        const dto = getDTO<BindReceiverFunction>('bind_receiver')(params);
        return this.PDU.call({ command: 'bind_receiver', sequenceNumber: this.sequenceNumber, dto });
    }

    bindTransmitter(params: BindTransmitterParams): boolean {
        this.logger.debug(`bindTransmitter - called`, params);

        if (!params.interfaceVersion) {
            params.interfaceVersion = this.interfaceVersion;
        }

        const dto = getDTO<BindTransmitterFunction>('bind_transmitter')(params);
        return this.PDU.call({ command: 'bind_transmitter', sequenceNumber: this.sequenceNumber, dto });
    }

    submitSm(params: SubmitSmParams): boolean {
        this.logger.debug(`submitSm - called`, params);

        const dto = getDTO<SubmitSmFunction>('submit_sm')(params);
        return this.PDU.call({ command: 'submit_sm', sequenceNumber: this.sequenceNumber, dto });
    }

    submitMulti(params: SubmitMultiParams): boolean {
        this.logger.debug(`submitMulti - called`, params);

        const dto = getDTO<SubmitMultiFunction>('submit_multi')(params);
        return this.PDU.call({ command: 'submit_multi', sequenceNumber: this.sequenceNumber, dto });
    }

    dataSm(params: DataSmParams): boolean {
        this.logger.debug(`dataSm - called`, params);

        const dto = getDTO<DataSmFunction>('data_sm')(params);
        return this.PDU.call({ command: 'data_sm', sequenceNumber: this.sequenceNumber, dto });
    }

    querySm(params: QuerySmParams): boolean {
        this.logger.debug(`querySm - called`, params);

        const dto = getDTO<QuerySmFunction>('query_sm')(params);
        return this.PDU.call({ command: 'query_sm', sequenceNumber: this.sequenceNumber, dto });
    }

    cancelSm(params: CancelSmParams): boolean {
        this.logger.debug(`cancelSm - called`, params);

        const dto = getDTO<CancelSmFunction>('cancel_sm')(params);
        return this.PDU.call({ command: 'cancel_sm', sequenceNumber: this.sequenceNumber, dto });
    }

    replaceSm(params: ReplaceSmParams): boolean {
        this.logger.debug(`replaceSm - called`, params);

        const dto = getDTO<ReplaceSmFunction>('replace_sm')(params);
        return this.PDU.call({ command: 'replace_sm', sequenceNumber: this.sequenceNumber, dto });
    }

    enquireLink(): boolean {
        this.logger.debug(`enquireLink - called`);

        const dto = getDTO<EnquireLinkFunction>('enquire_link')({});
        return this.PDU.call({ command: 'enquire_link', sequenceNumber: this.sequenceNumber, dto });
    }

    unbind(): boolean {
        this.logger.debug(`unbind - called`);

        const dto = getDTO<UnbindFunction>('unbind')({});
        return this.PDU.call({ command: 'unbind', sequenceNumber: this.sequenceNumber, dto });
    }

    deliverSmResp(params: DeliverSmRespParams): boolean {
        this.logger.debug(`deliverSmResp - called`, params);

        const dto = getDTO<DeliverSmRespFunction>('deliver_sm_resp')(params);
        return this.PDU.call({ command: 'deliver_sm_resp', sequenceNumber: this.sequenceNumber, dto });
    }
}
