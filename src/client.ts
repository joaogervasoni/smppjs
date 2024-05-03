import Session from './session';

export default class Client {
    private readonly session!: Session;
    private _debug: boolean;

    public get debug(): boolean {
        return this._debug;
    }

    constructor({ debug = false }: { debug?: boolean }) {
        this._debug = debug;
        this.session = new Session(this.debug);
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

    on(eventName: 'connect' | 'close' | 'error' | 'timeout' | 'debug' | 'data', callback: (...args: any[]) => void) {
        this.session.on(eventName, callback);
    }

    bindTransceiver({ system_id, password }: { system_id: string; password: string }) {
        this.session.bindTransceiver({ system_id, password });
    }
}
