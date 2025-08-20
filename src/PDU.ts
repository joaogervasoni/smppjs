import { Socket } from 'net';
import { getDTO } from './dtos/index';
import { octets } from './octets';
import { CommandStatus, CommandStatusInfo, commandsId, commandsName, optionalParams, encodesName } from './constains';
import { DTO, DTOFunction, Encode, IPDU, Pdu, SendCommandName, OptionalParamKey } from './types';

const HEADER_COMMAND_LENGTH = 16;

export default class PDU implements IPDU {
    constructor(
        private socket: Socket,
        private secure: { unsafeBuffer: boolean },
    ) {}

    call({ command, sequenceNumber, dto }: { command: SendCommandName; sequenceNumber: number; dto: DTO }): boolean {
        const commandParams = dto.command;
        const tlvs = dto.tlvs;

        const commandId = commandsId[command];
        let commandLength = HEADER_COMMAND_LENGTH;

        const paramEntries = Object.entries(commandParams);

        for (let index = 0; index < paramEntries.length; index++) {
            const element = paramEntries[index][1];

            if (element.encode && element.type === 'Cstring' && typeof element.value === 'string') {
                element.value = octets[element.type].convertToUtf16be(element.value);
            }

            commandLength += octets[element.type].size(element.value);
        }

        if (tlvs) {
            const tlvsEntries = Object.entries(tlvs);

            for (let index = 0; index < tlvsEntries.length; index++) {
                const element = tlvsEntries[index][1];

                if (element.value) {
                    if (element.encode && element.type === 'Cstring' && typeof element.value === 'string') {
                        element.value = octets[element.type].convertToUtf16be(element.value);
                    }

                    // Add 4 for tlvs element + length.  * ref: Documentation SMPP_v5 - 4.8.4.1
                    commandLength += octets[element.type].size(element.value) + 4;
                }
            }
        }

        const buffer = this.createPdu({ pduParams: commandParams, commandLength, commandId, sequenceNumber, tlvs, unsafeBuffer: this.secure.unsafeBuffer });
        return this.socket.write(buffer);
    }

    /**
     *  Create Buffer, add header and params
     *
     * @param commandStatus Is relevant only in the SMPP response message, default to request should be not passed
     * @returns Buffer with header and params
     */
    private createPdu({
        commandLength,
        commandId,
        sequenceNumber,
        pduParams,
        tlvs,
        unsafeBuffer,
        commandStatus = 0,
    }: {
        commandLength: number;
        commandId: number;
        sequenceNumber: number;
        pduParams: Record<string, { type: 'Cstring' | 'Int8'; value: string | number | Buffer }>;
        tlvs?: Record<string, { type: 'Cstring' | 'Int8'; value: string | number | Buffer | undefined }> | undefined;
        unsafeBuffer?: boolean;
        commandStatus?: number;
    }): Buffer {
        let pduBuffer = unsafeBuffer ? Buffer.allocUnsafe(commandLength) : Buffer.alloc(commandLength);

        pduBuffer = this.writeHeaderPdu({ buffer: pduBuffer, commandLength, commandId, sequenceNumber, commandStatus });
        const pduWithParams = this.writeParamsPdu({ offset: HEADER_COMMAND_LENGTH, pduBuffer, pduParams });
        pduBuffer = pduWithParams.pduBuffer;

        pduBuffer = this.writeTlvsPdu({ offset: pduWithParams.offset, pduBuffer, tlvs });

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
    }): Buffer {
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
        pduParams: Record<string, { type: 'Cstring' | 'Int8'; value: string | number | Buffer; encode?: Encode; setLength?: boolean }>;
        pduBuffer: Buffer;
        offset: number;
    }): { offset: number; pduBuffer: Buffer } {
        for (const key in pduParams) {
            const param = pduParams[key];
            const type = param.type;
            const value = param.value;

            if (type === 'Cstring') {
                const encode = param.encode || 'ascii';
                const setLength = param.setLength || false;

                pduBuffer = octets.Cstring.write({ buffer: pduBuffer, offset, value: value as string | Buffer, encoding: encode, setLength });
                offset += octets.Cstring.size(value as string | Buffer);
            }

            if (type === 'Int8') {
                pduBuffer = octets.Int8.write({ buffer: pduBuffer, offset, value: value as number });
                offset += octets.Int8.size();
            }
        }

        return { pduBuffer, offset };
    }

    private writeTlvsPdu({
        tlvs,
        pduBuffer,
        offset,
    }: {
        pduBuffer: Buffer;
        offset: number;
        tlvs?: Record<string, { type: 'Cstring' | 'Int8'; value: string | number | Buffer | undefined; encode?: Encode; setLength?: boolean }>;
    }): Buffer {
        if (tlvs && Object.entries(tlvs)) {
            for (const key in tlvs) {
                const param = tlvs[key as OptionalParamKey];
                const type = param.type;
                const value = param.value;

                if (value) {
                    // Add 4 for tlvs element + length.  * ref: Documentation SMPP_v5 - 4.8.4.1
                    const valueSize = octets.Cstring.size(value as string | Buffer) + 4;

                    octets.Int16.write({ buffer: pduBuffer, offset, value: optionalParams[key as OptionalParamKey] });
                    offset += octets.Int16.size();
                    octets.Int16.write({ buffer: pduBuffer, offset, value: valueSize });
                    offset += octets.Int16.size();

                    if (type === 'Cstring') {
                        const encode = param.encode || 'ascii';
                        const setLength = param.setLength || false;

                        pduBuffer = octets.Cstring.write({ buffer: pduBuffer, offset, value: value as string | Buffer, encoding: encode, setLength });
                        offset += valueSize;
                    }
                }
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
    }): { params: Record<string, string | number>; offset: number } {
        const params: Record<string, string | number> = {};

        let dataCoding: number | undefined;
        let smLength: number | undefined;

        for (const key in pduParams) {
            const param = pduParams[key];
            const type = param.type;
            const value = param.value;

            if (type === 'Cstring') {
                if (key === 'short_message' && dataCoding !== undefined) {
                    const encoding = encodesName[dataCoding];

                    params[key] = octets.Cstring.read({
                        buffer: pduBuffer,
                        offset,
                        encoding,
                        length: smLength,
                    });

                    if (smLength) {
                        offset += smLength;
                    }
                } else {
                    params[key] = octets.Cstring.read({ buffer: pduBuffer, offset });
                    offset += octets.Cstring.size(params[key] || (value as string));
                }
            }

            if (type === 'Int8') {
                params[key] = octets.Int8.read({ buffer: pduBuffer, offset });
                offset += octets.Int8.size();

                if (key === 'data_coding') {
                    dataCoding = params[key] as number;
                }

                if (key === 'sm_length') {
                    smLength = params[key] as number;
                }
            }
        }

        return { params, offset };
    }

    private readTlvsPdu({
        pduTlvs,
        pduBuffer,
        offset,
    }: {
        pduTlvs: Record<string, { type: 'Cstring' | 'Int8'; value: string | number | Buffer | undefined }>;
        pduBuffer: Buffer;
        offset: number;
    }): Record<string, string | number> {
        const params: Record<string, string | number> = {};

        for (const key in pduTlvs) {
            const param = pduTlvs[key];
            const type = param.type;
            const value = param.value;

            if (value) {
                if (type === 'Cstring') {
                    params[key] = octets.Cstring.read({ buffer: pduBuffer, offset });
                    offset += octets.Cstring.size(params[key] || (value as string));
                }

                if (type === 'Int8') {
                    params[key] = octets.Int8.read({ buffer: pduBuffer, offset });
                    offset += octets.Cstring.size(value as string);
                }
            }
        }

        return params;
    }

    private readHeaderPdu({ buffer, pdu }: { buffer: Buffer; pdu: Pdu }): Pdu {
        if (buffer.length < HEADER_COMMAND_LENGTH) {
            throw new Error('PDU: Buffer too small for header.');
        }

        pdu.command_length = buffer.readUInt32BE(0);

        if (pdu.command_length < 16 || pdu.command_length > 65536) {
            throw new Error('PDU: Invalid command length.');
        }

        pdu.command_id = buffer.readUInt32BE(4);
        pdu.command_status = buffer.readUInt32BE(8);
        pdu.sequence_number = buffer.readUInt32BE(12);

        return pdu;
    }

    readPdu(buffer: Buffer): Pdu {
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
        const { params, offset } = this.readParamsPdu({ pduBuffer: buffer, pduParams: commandParams.command, offset: HEADER_COMMAND_LENGTH });

        let tlvs: Record<string, string | number | undefined> | undefined = undefined;

        if (commandParams.tlvs) {
            tlvs = this.readTlvsPdu({ pduBuffer: buffer, pduTlvs: commandParams.tlvs, offset });
        }

        if (pdu.command_status !== CommandStatus.ESME_ROK) {
            const errorInfo = CommandStatusInfo[pdu.command_status];
            throw new Error(`Command {${pdu.command}} return error {${errorInfo.name}} with info {${errorInfo.description}}.`);
        }

        return Object.assign({}, pdu, params, tlvs);
    }
}
