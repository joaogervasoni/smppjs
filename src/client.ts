import { SecureContextOptions } from 'tls';
import Session from './session';
import { BindReceiverParams, BindTransceiverParams, BindTransmitterParams, CommandName, InterfaceVersion, SubmitSmParams } from './types';

export default class Client {
    private readonly session!: Session;
    private _debug: boolean;
    private _enquireLink: { auto: boolean; interval?: number };

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
        },
        debug = false,
    }: {
        interfaceVersion: InterfaceVersion;
        /**
         * Default interval 20000
         */
        enquireLink: { auto: boolean; interval?: number };
        secure: { tls?: boolean; unsafeBuffer?: boolean; secureOptions?: SecureContextOptions };
        debug?: boolean;
    }) {
        this._debug = debug;
        this._enquireLink = enquireLink;
        this.session = new Session(interfaceVersion, this.debug, secure);
    }

    connect({ url }: { url: string }): void {
        const [host, portStr] = url.split(':');

        if (!host || !portStr) {
            throw new Error('Invalid URL.');
        }

        const port = parseInt(portStr, 10);

        if (isNaN(port)) {
            throw new Error('Invalid port.');
        }

        this.session.connect({ host, port });

        if (this._enquireLink.auto && this._enquireLink.interval) {
            this.enquireLink();
            this.autoEnquireLink(this._enquireLink.interval);
        }
    }

    /**
     * It's recommended to call unbind event to close connection with server safety.
     *
     * @returns boolean confirmation do disconnect.
     */
    disconnect(): boolean {
        return this.session.disconnect();
    }

    on(eventName: 'connect' | 'close' | 'error' | 'timeout' | 'debug' | 'data' | 'pdu' | CommandName, callback: (...args: unknown[]) => void) {
        this.session.on(eventName, callback);
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

    enquireLink(): boolean {
        return this.session.enquireLink();
    }

    unbind(): boolean {
        return this.session.unbind();
    }

    private autoEnquireLink(interval: number = 20000) {
        setInterval(() => {
            this.enquireLink();
        }, interval);
    }
}
