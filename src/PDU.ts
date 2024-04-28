import { Socket } from 'net';
import { commandsId, commandsParams } from './helpers';
import { octets } from './octets';

export default class PDU {
    call(command: 'bind_transceiver', sequenceNumber: number, socket: Socket) {
        const commandId = commandsId[command];
        const commandParams = commandsParams[commandId];

        let commandLength = 16;

        const paramEntries = Object.entries(commandParams);
        for (let index = 0; index < paramEntries.length; index++) {
            const element = paramEntries[index][1];
            commandLength += octets[element.type].size(element.value);
        }

        let buffer = this.initPduBuffer({ commandLength, commandId, sequenceNumber });
        buffer = this.writePduBuffer({ pduBuffer: buffer, pduParams: commandParams, offset: 16 });
        socket.write(buffer);
    }

    private initPduBuffer({ commandLength, commandId, sequenceNumber }: { commandLength: number; commandId: number; sequenceNumber: number }): Buffer {
        let pduBuffer = Buffer.alloc(commandLength);
        const commandStatus = 0;

        // header
        pduBuffer.writeUInt32BE(commandLength, 0);
        pduBuffer.writeUInt32BE(commandId, 4);
        pduBuffer.writeUInt32BE(commandStatus, 8);
        pduBuffer.writeUInt32BE(sequenceNumber, 12);

        return pduBuffer;
    }

    private writePduBuffer({
        pduParams,
        pduBuffer,
        offset,
    }: {
        pduParams: Record<string, { type: 'Cstring' | 'Int8'; value: string | number }>;
        pduBuffer: Buffer;
        offset: number;
    }) {
        for (const key in pduParams) {
            const param = pduParams[key];
            const type = param.type;
            const value = param.value;

            if (type === 'Cstring') {
                pduBuffer = octets.Cstring.write({ buffer: pduBuffer, offset, value: value as string });
                offset += octets.Cstring.size(value as string);
            }

            if (type === 'Int8') {
                pduBuffer = octets.Int8.write({ buffer: pduBuffer, offset, value: value as number });
                offset += octets.Int8.size();
            }
        }

        return pduBuffer;
    }
}
