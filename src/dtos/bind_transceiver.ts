import { DTO, DTOFunction } from '../types';

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

export const bindTransceiverDTO: BindTransceiverFunction = ({ systemIdValue, passwordValue }: { systemIdValue: string; passwordValue: string }): BindTransceiver => {
    return {
        system_id: { type: 'Cstring', value: systemIdValue },
        password: { type: 'Cstring', value: passwordValue },
        system_type: { type: 'Cstring', value: '' },
        interface_version: { type: 'Int8', value: 80 },
        addr_ton: { type: 'Int8', value: 0 },
        addr_npi: { type: 'Int8', value: 0 },
        address_range: { type: 'Cstring', value: '' },
    };
};

// validateDto()
