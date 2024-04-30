import { Socket } from 'net';

class Logger {
    constructor(private socket: Socket) {}

    debug(message: string) {
        this.socket.emit('debug', message);
    }
}

export { Logger };
