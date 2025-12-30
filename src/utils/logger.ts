import { Socket } from 'net';

class Logger {
    constructor(
        private socket: Socket,
        private readonly options: {
            debug: boolean;
        },
    ) {}

    debug(message: string, object?: object): void {
        if (this.options.debug) {
            const messageEmit = object ? `${message} - ${JSON.stringify(object)}` : `${message} - {}`;
            this.socket.emit('debug', messageEmit);
        }
    }
}

export { Logger };
