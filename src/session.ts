import net from 'net';

export default class Session {
    private socket!: net.Socket;

    public get closed(): boolean {
        return this.socket.closed;
    }

    constructor() {
        this.initSession();
    }

    initSession() {
        this.socket = new net.Socket();
    }

    connect({ host, port }: { host: string; port: number; }) {
        this.socket.connect(port, host, () => {
            console.log('Connected to SMPP server.');
        });
    }

    disconnect(): boolean {
        this.socket.destroy();
        return this.socket.closed;
    }

    on(eventName: 'connect' | 'close' | 'error' | 'timeout', callback: (...args: any[]) => void) {
        this.socket.on(eventName, callback);
    }
}
