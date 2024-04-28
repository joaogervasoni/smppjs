import { commandsId } from './helpers';
import { octets } from './octets';

export default class PDU {
    call(command: 'bind_transceiver', sequenceNumber: number) {}

    initPduBuffer({
        command_length,
        commandName,
        sequenceNumber,
    }: {
        command_length: number;
        commandName: 'bind_transceiver';
        sequenceNumber: number;
    }): Buffer {
        let pduBuffer = Buffer.alloc(command_length);
        const commandStatus = 0;

        // header
        pduBuffer.writeUInt32BE(command_length, 0);
        pduBuffer.writeUInt32BE(commandsId[commandName], 4);
        pduBuffer.writeUInt32BE(commandStatus, 8);
        pduBuffer.writeUInt32BE(sequenceNumber, 12);

        return pduBuffer;
    }

    writePduBuffer({
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
