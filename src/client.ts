import { SecureContextOptions } from 'tls';
import Session from './session';
import {
    BindReceiverParams,
    BindTransceiverParams,
    BindTransmitterParams,
    CancelSmParams,
    CommandClient,
    DataSmParams,
    InterfaceVersion,
    QuerySmParams,
    ReplaceSmParams,
    SubmitSmParams,
    DeliverSmRespParams,
} from './types';

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

    on(eventName: 'connect' | 'close' | 'error' | 'timeout' | 'debug' | 'data' | 'pdu' | 'readable' | CommandClient, callback: (...args: unknown[]) => void) {
        this.session.on(eventName, callback);
    }

    // TODO: Add description for each function
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
