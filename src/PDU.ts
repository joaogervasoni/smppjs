import { Socket } from 'net';
import { commandsId, commandsName } from './constains';
import { octets } from './octets';
import { getDTO } from './dtos';
import { DTO, DTOFunction, Pdu, SendCommandName } from './types';

const HEADER_COMMAND_LENGTH = 16;

export default class PDU {
    call(command: SendCommandName, sequenceNumber: number, socket: Socket, commandParams: DTO): boolean {
        const commandId = commandsId[command];
        let commandLength = HEADER_COMMAND_LENGTH;

        const paramEntries = Object.entries(commandParams);
        for (let index = 0; index < paramEntries.length; index++) {
            const element = paramEntries[index][1];
            commandLength += octets[element.type].size(element.value);
        }

        const buffer = this.createPdu({ pduParams: commandParams, commandLength, commandId, sequenceNumber });
        return socket.write(buffer);
    }

    /**
     *  Create Buffer, add header and params
     *
     * @param commandStatus Is relevante only in the SMPP response message, default to request should be not passed
     * @returns Buffer with header and params
     */
    private createPdu({
        commandLength,
        commandId,
        sequenceNumber,
        pduParams,
        commandStatus = 0,
    }: {
        commandLength: number;
        commandId: number;
        sequenceNumber: number;
        pduParams: Record<string, { type: 'Cstring' | 'Int8'; value: string | number | Buffer }>;
        commandStatus?: number;
    }): Buffer {
        let pduBuffer = Buffer.alloc(commandLength);

        pduBuffer = this.writeHeaderPdu({ buffer: pduBuffer, commandLength, commandId, sequenceNumber, commandStatus });
        pduBuffer = this.writeParamsPdu({ offset: HEADER_COMMAND_LENGTH, pduBuffer, pduParams });

        return pduBuffer;
    }

    private writeHeaderPdu({
        buffer,
        commandLength,
        commandId,
        sequenceNumber,
        commandStatus,
    }: {
        buffer: Buffer;
        commandLength: number;
        commandId: number;
        sequenceNumber: number;
        commandStatus: number;
    }) {
        buffer.writeUInt32BE(commandLength, 0);
        buffer.writeUInt32BE(commandId, 4);
        buffer.writeUInt32BE(commandStatus, 8);
        buffer.writeUInt32BE(sequenceNumber, 12);

        return buffer;
    }

    private writeParamsPdu({
        pduParams,
        pduBuffer,
        offset,
    }: {
        pduParams: Record<string, { type: 'Cstring' | 'Int8'; value: string | number | Buffer }>;
        pduBuffer: Buffer;
        offset: number;
    }) {
        for (const key in pduParams) {
            const param = pduParams[key];
            const type = param.type;
            const value = param.value;

            if (type === 'Cstring') {
                pduBuffer = octets.Cstring.write({ buffer: pduBuffer, offset, value: value as string | Buffer });
                offset += octets.Cstring.size(value as string | Buffer);
            }

            if (type === 'Int8') {
                pduBuffer = octets.Int8.write({ buffer: pduBuffer, offset, value: value as number });
                offset += octets.Int8.size();
            }
        }

        return pduBuffer;
    }

    private readParamsPdu({
        pduParams,
        pduBuffer,
        offset,
    }: {
        pduParams: Record<string, { type: 'Cstring' | 'Int8'; value: string | number | Buffer }>;
        pduBuffer: Buffer;
        offset: number;
    }) {
        const params: Record<string, string | number> = {};

        for (const key in pduParams) {
            const param = pduParams[key];
            const type = param.type;
            const value = param.value;

            if (type === 'Cstring') {
                params[key] = octets.Cstring.read({ buffer: pduBuffer, offset });
                offset += octets.Cstring.size(value as string);
            }
        }

        return params;
    }

    private readHeaderPdu({ buffer, pdu }: { buffer: Buffer; pdu: Pdu }) {
        pdu.command_length = buffer.readUInt32BE(0);
        pdu.command_id = buffer.readUInt32BE(4);
        pdu.command_status = buffer.readUInt32BE(8);
        pdu.sequence_number = buffer.readUInt32BE(12);

        return pdu;
    }

    readPdu(buffer: Buffer): Record<string, string | number> {
        const pdu: Pdu = {
            command: '',
            command_id: 0,
            command_length: 0,
            command_status: 0,
            sequence_number: 0,
        };

        this.readHeaderPdu({ buffer, pdu });
        pdu.command = commandsName[pdu.command_id];

        const DTO = getDTO<DTOFunction>(pdu.command);
        if (!DTO) {
            throw new Error(`Command {${pdu.command}} not found.`);
        }

        const commandParams = DTO({});
        const params = this.readParamsPdu({ pduBuffer: buffer, pduParams: commandParams, offset: HEADER_COMMAND_LENGTH });

        return Object.assign({}, pdu, params);
    }
}
