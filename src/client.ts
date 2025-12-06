import { SecureContextOptions } from 'tls';
import Session from './session';
import {
    BindReceiverParams,
    BindTransceiverParams,
    BindTransmitterParams,
    CancelSmParams,
    DataSmParams,
    InterfaceVersion,
    QuerySmParams,
    ReplaceSmParams,
    SubmitSmParams,
    DeliverSmRespParams,
    IClient,
    type Pdu,
    SubmitMultiParams,
} from './types';
import type { DTOPayloadMap } from './dtos';

export default class Client implements IClient {
    private readonly session: Session;
    private _debug: boolean;
    private _enquireLink: { auto: boolean; interval?: number };

    public get connectionInfo(): { host: string; port: number } | undefined {
        return this.session.connectionInfo;
    }

    public get debug(): boolean {
        return this._debug;
    }

    public get connected(): boolean {
        return this.session.connected;
    }

    /**
     *
     * @param enquireLink Interval is in milliseconds.
     */
    constructor({
        interfaceVersion = 80,
        enquireLink,
        secure = {
            tls: false,
            unsafeBuffer: false,
            secureOptions: undefined,
        },
        timeout = 3000,
        debug = false,
        reconnect = true,
    }: {
        interfaceVersion: InterfaceVersion;
        /**
         * Default interval 20000
         */
        enquireLink: { auto: boolean; interval?: number };
        secure: { tls?: boolean; unsafeBuffer?: boolean; secureOptions?: SecureContextOptions };
        timeout?: number;
        debug?: boolean;
        reconnect?: boolean;
    }) {
        this._debug = debug;
        this._enquireLink = enquireLink;
        this._enquireLink.interval = this._enquireLink.interval || 20000;

        this.session = new Session(interfaceVersion, this.debug, timeout, reconnect, secure);
    }

    connect({ url }: { url: string }): void {
        const { host, port } = this.validateUrl(url);
        this.session.connect({ host, port });

        if (this._enquireLink.auto && this._enquireLink.interval) {
            this.enquireLink();
            this.autoEnquireLink(this._enquireLink.interval);
        }
    }

    disconnect(): boolean {
        return this.session.disconnect();
    }

    on(event: 'connect' | 'end' | 'timeout' | 'readable', listener: () => void): this;
    on(event: 'close', listener: (hadError: boolean) => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'data', listener: (data: Buffer) => void): this;
    on(event: 'debug', listener: (message: string) => void): this;
    on(event: 'pdu', listener: (pdu: Pdu) => void): this;
    on<T extends keyof DTOPayloadMap>(event: T, listener: (pdu: Pdu<DTOPayloadMap[T] & Record<string, string | number>>) => void): this;
    on(
        event: string,
        listener:
            | (() => void)
            | ((hadError: boolean) => void)
            | ((err: Error) => void)
            | ((data: Buffer) => void)
            | ((message: string) => void)
            | ((pdu: Pdu) => void)
            | ((pdu: Pdu<DTOPayloadMap[keyof DTOPayloadMap] & Record<string, string | number>>) => void)
            | ((...args: unknown[]) => void),
    ): this {
        this.session.on(event as Parameters<Session['on']>[0], listener as (...args: unknown[]) => void);
        return this;
    }

    bindTransceiver(params: BindTransceiverParams): boolean {
        return this.session.bindTransceiver(params);
    }

    bindReceiver(params: BindReceiverParams): boolean {
        return this.session.bindReceiver(params);
    }

    bindTransmitter(params: BindTransmitterParams): boolean {
        return this.session.bindTransmitter(params);
    }

    submitSm(params: SubmitSmParams): boolean {
        return this.session.submitSm(params);
    }

    submitMulti(params: SubmitMultiParams): boolean {
        return this.session.submitMulti(params);
    }

    dataSm(params: DataSmParams): boolean {
        return this.session.dataSm(params);
    }

    querySm(params: QuerySmParams): boolean {
        return this.session.querySm(params);
    }

    cancelSm(params: CancelSmParams): boolean {
        return this.session.cancelSm(params);
    }

    replaceSm(params: ReplaceSmParams): boolean {
        return this.session.replaceSm(params);
    }

    deliverSmResp(params: DeliverSmRespParams): boolean {
        return this.session.deliverSmResp(params);
    }

    enquireLink(): boolean {
        return this.session.enquireLink();
    }

    unbind(): boolean {
        return this.session.unbind();
    }

    private validateUrl(url: string): { host: string; port: number } {
        if (!url || typeof url !== 'string') {
            throw new Error('URL must be a string.');
        }

        url = url.trim();

        const lastColonIndex = url.lastIndexOf(':');

        if (lastColonIndex === -1) {
            throw new Error('Invalid URL format. Expected "host:port".');
        }

        const host = url.substring(0, lastColonIndex);
        const portStr = url.substring(lastColonIndex + 1);

        if (!host) {
            throw new Error('Host cannot be empty.');
        }

        const port = parseInt(portStr, 10);

        if (isNaN(port) || port < 0 || port > 65535) {
            throw new Error('Invalid port. Port must be between 0 and 65535.');
        }

        return { host, port };
    }

    private autoEnquireLink(interval: number = 20000) {
        const scheduleNext = () => {
            setTimeout(() => {
                if (this.connected) {
                    this.enquireLink();
                    scheduleNext();
                }
            }, interval);
        };

        scheduleNext();
    }
}
