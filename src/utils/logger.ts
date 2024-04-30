import { Socket } from 'net';

class Logger {
    constructor(
        private socket: Socket,
        private readonly options: {
            debug: boolean;
        }
    ) {}

    debug(message: string) {
        if (this.options.debug) {
            this.socket.emit('debug', message);
        }
    }
}

export { Logger };
