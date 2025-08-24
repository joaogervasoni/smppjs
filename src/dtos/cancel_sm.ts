import { CancelSm, CancelSmFunction, CancelSmParams } from '../types';
import { dtoValidation } from '../helpers';

const MAX_LENGTH: Record<string, number> = {
    message_id: 65,
    service_type: 6,
    source_addr: 21,
    destination_addr: 21,
};

const REQUIRED = ['message_id', 'source_addr', 'destination_addr'];

export const cancelSmDTO: CancelSmFunction = ({
    destinationAddr,
    messageId,
    systemTypeValue,
    sourceAddrTon,
    sourceAddrNpi,
    sourceAddr,
    destAddrTon,
    destAddrNpi,
}: CancelSmParams): CancelSm => {
    const dto: CancelSm = {
        command: {
            service_type: { type: 'Cstring', value: systemTypeValue || '' },
            message_id: { type: 'Cstring', value: messageId },
            source_addr_ton: { type: 'Int8', value: sourceAddrTon || 0 },
            source_addr_npi: { type: 'Int8', value: sourceAddrNpi || 0 },
            source_addr: { type: 'Cstring', value: sourceAddr },
            dest_addr_ton: { type: 'Int8', value: destAddrTon || 0 },
            dest_addr_npi: { type: 'Int8', value: destAddrNpi || 0 },
            destination_addr: { type: 'Cstring', value: destinationAddr },
        },
    };

    dtoValidation({ dto, MAX_LENGTH, REQUIRED });
    return dto;
};
