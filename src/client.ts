import { SubmitSmParams } from './dtos/submit_sm';
import Session from './session';
import { BindTransceiverParams, CommandName, InterfaceVersion } from './types';

export default class Client {
    private readonly session!: Session;
    private _debug: boolean;

    public get debug(): boolean {
        return this._debug;
    }

    public get connected(): boolean {
        return this.session.connected;
    }

    constructor({ interfaceVersion = 80, debug = false }: { interfaceVersion: InterfaceVersion; debug?: boolean }) {
        this._debug = debug;
        this.session = new Session(interfaceVersion, this.debug);
    }

    connect({ url }: { url: string }) {
        const [host, portStr] = url.split(':');

        if (!host || !portStr) {
            throw new Error('Invalid URL.');
        }

        const port = parseInt(portStr, 10);
        if (isNaN(port)) {
            throw new Error('Invalid port.');
        }

        this.session.connect({ host, port });
    }

    disconnect() {
        return this.session.disconnect();
    }

    on(eventName: 'connect' | 'close' | 'error' | 'timeout' | 'debug' | 'data' | 'pdu' | CommandName, callback: (...args: any[]) => void) {
        this.session.on(eventName, callback);
    }

    bindTransceiver(params: BindTransceiverParams) {
        this.session.bindTransceiver(params);
    }

    submitSm(params: SubmitSmParams) {
        this.session.submitSm(params);
    }
}
