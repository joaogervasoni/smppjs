import { QuerySm, QuerySmFunction, QuerySmParams } from '../types';
import { dtoValidation } from '../helpers';

const MAX_LENGTH: Record<string, number> = {
    message_id: 65,
    source_addr: 21,
};

const REQUIRED = ['message_id'];

export const querySmDTO: QuerySmFunction = ({ messageId, sourceAddrTon, sourceAddrNpi, sourceAddr }: QuerySmParams): QuerySm => {
    const dto: QuerySm = {
        command: {
            message_id: { type: 'Cstring', value: messageId },
            source_addr_ton: { type: 'Int8', value: sourceAddrTon || 0 },
            source_addr_npi: { type: 'Int8', value: sourceAddrNpi || 0 },
            source_addr: { type: 'Cstring', value: sourceAddr || '' },
        },
    };

    dtoValidation({ dto, MAX_LENGTH, REQUIRED });
    return dto;
};
