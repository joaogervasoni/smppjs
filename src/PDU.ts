import { commandsId } from './helpers';

export default class PDU {
    call(command: 'bind_transceiver', sequenceNumber: number) {}

    initPduBuffer({ command_length, commandId, sequenceNumber }: { command_length: number; commandId: 'bind_transceiver'; sequenceNumber: number }): Buffer {
        let pduBuffer = Buffer.alloc(command_length);
        const commandStatus = 0;

        pduBuffer.writeUInt32BE(command_length, 0);
        pduBuffer.writeUInt32BE(commandsId[commandId], 4);
        pduBuffer.writeUInt32BE(commandStatus, 8);
        pduBuffer.writeUInt32BE(sequenceNumber, 12);

        return pduBuffer;
    }
}
