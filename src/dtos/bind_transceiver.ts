import { DTO, DTOFunction } from '../types';

const MAX_LENGTH = {
    system_id: 16,
    password: 9,
    system_type: 13,
    address_range: 41,
};

export interface BindTransceiver extends DTO {
    system_id: { type: 'Cstring'; value: string };
    password: { type: 'Cstring'; value: string };
    system_type: { type: 'Cstring'; value: string };
    interface_version: { type: 'Int8'; value: number };
    addr_ton: { type: 'Int8'; value: number };
    addr_npi: { type: 'Int8'; value: number };
    address_range: { type: 'Cstring'; value: string };
}

export interface BindTransceiverFunction extends DTOFunction<{ systemIdValue: string; passwordValue: string }, BindTransceiver> {
    ({ systemIdValue, passwordValue }: { systemIdValue: string; passwordValue: string }): BindTransceiver;
}

export const bindTransceiverDTO: BindTransceiverFunction = ({
    systemIdValue,
    passwordValue,
}: {
    systemIdValue: string;
    passwordValue: string;
}): BindTransceiver => {
    const dto: BindTransceiver = {
        system_id: { type: 'Cstring', value: systemIdValue },
        password: { type: 'Cstring', value: passwordValue },
        system_type: { type: 'Cstring', value: '' },
        interface_version: { type: 'Int8', value: 80 },
        addr_ton: { type: 'Int8', value: 0 },
        addr_npi: { type: 'Int8', value: 0 },
        address_range: { type: 'Cstring', value: '' },
    };

    validateDto(dto);
    return dto;
};

/**
 * Add length plus one to add 00 validation
 * 
 * Ref: Page 49 - SMPP_v5
 * @param dto BindTransceiver
 */
const validateDto = (dto: BindTransceiver): void => {
    const validator = Object.entries(MAX_LENGTH);
    for (let index = 0; index < validator.length; index += 1) {
        if (dto[validator[index][0]].value.toString().length + 1 > validator[index][1]) {
            throw new Error(`${validator[index][0]} need to be minor than ${validator[index][1]}`);
        }
    }
};
