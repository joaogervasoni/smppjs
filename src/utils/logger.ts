import { Socket } from 'net';

class Logger {
    constructor(
        private socket: Socket,
        private readonly options: {
            debug: boolean;
        },
    ) { }

    debug(message: string, object?: object) {
        const messageEmit = `${message} - ${object ? JSON.stringify(object) : {}}`;

        if (this.options.debug) {
            this.socket.emit('debug', messageEmit);
        }
    }
}

export { Logger };
