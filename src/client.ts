import Session from './session';

export default class Client {
    private readonly session!: Session;

    constructor() {
        this.session = new Session();
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

    on(eventName: 'connect' | 'close' | 'error', callback: (...args: any[]) => void) {
        this.session.on(eventName, callback);
    }
}
