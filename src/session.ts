import net from 'net';
import PDU from './PDU';

export default class Session {
    private socket!: net.Socket;
    private PDU!: PDU;
    private sequenceNumber: number = 0;

    public get closed(): boolean {
        return this.socket.closed;
    }

    constructor() {
        this.initSession();
    }

    initSession() {
        this.socket = new net.Socket();
        this.PDU = new PDU();
    }

    connect({ host, port }: { host: string; port: number }) {
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
