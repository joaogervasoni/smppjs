import { dtoValidation } from '../helpers';
import { BindReceiver, BindReceiverFunction, BindReceiverParams } from '../types';

const MAX_LENGTH: Record<string, number> = {
    system_id: 16,
    password: 9,
    system_type: 13,
    address_range: 41,
};

export const bindReceiverDTO: BindReceiverFunction = ({
    systemId,
    password,
    systemType,
    interfaceVersion,
    addrNpi,
    addrTon,
    addressRange,
}: BindReceiverParams): BindReceiver => {
    const dto: BindReceiver = {
        command: {
            system_id: { type: 'Cstring', value: systemId },
            password: { type: 'Cstring', value: password },
            system_type: { type: 'Cstring', value: systemType || '' },
            interface_version: { type: 'Int8', value: interfaceVersion || 80 },
            addr_ton: { type: 'Int8', value: addrTon || 0 },
            addr_npi: { type: 'Int8', value: addrNpi || 0 },
            address_range: { type: 'Cstring', value: addressRange || '' },
        },
    };

    dtoValidation({ dto, MAX_LENGTH });
    return dto;
};
