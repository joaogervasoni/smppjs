import { Socket } from 'net';
import { commandsId, commandsParams } from './helpers';
import { octets } from './octets';

const HEADER_COMMAND_LENGTH = 16;

export default class PDU {

    call(command: 'bind_transceiver', sequenceNumber: number, socket: Socket) {
        const commandId = commandsId[command];
        const commandParams = commandsParams[commandId];

        let commandLength = HEADER_COMMAND_LENGTH;

        const paramEntries = Object.entries(commandParams);
        for (let index = 0; index < paramEntries.length; index++) {
            const element = paramEntries[index][1];
            commandLength += octets[element.type].size(element.value);
        }

        let buffer = this.initPduBuffer({ commandLength: HEADER_COMMAND_LENGTH, commandId, sequenceNumber });
        buffer = this.writePduBuffer({ pduBuffer: buffer, pduParams: commandParams, offset: 16 });
        socket.write(buffer);
    }

    /**
     *  Init Buffer and add header
     *
     * @param commandStatus Is relevante only in the SMPP response message, default to request should be not passed
     * @returns Buffer with header
     */
    private initPduBuffer({
        commandLength,
        commandId,
        sequenceNumber,
        commandStatus = 0,
    }: {
        commandLength: number;
        commandId: number;
        sequenceNumber: number;
        commandStatus?: number;
    }): Buffer {
        let pduBuffer = Buffer.alloc(commandLength);

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
