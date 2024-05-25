import { BindTransceiver, BindTransceiverFunction, BindTransceiverParams } from "../types";

const MAX_LENGTH = {
    system_id: 16,
    password: 9,
    system_type: 13,
    address_range: 41,
};

export const bindTransceiverDTO: BindTransceiverFunction = ({
    systemId,
    password,
    interfaceVersion,
    systemType,
    addressRange,
}: BindTransceiverParams): BindTransceiver => {
    const dto: BindTransceiver = {
        system_id: { type: 'Cstring', value: systemId },
        password: { type: 'Cstring', value: password },
        system_type: { type: 'Cstring', value: systemType || '' },
        interface_version: { type: 'Int8', value: interfaceVersion || 80 },
        addr_ton: { type: 'Int8', value: 0 },
        addr_npi: { type: 'Int8', value: 0 },
        address_range: { type: 'Cstring', value: addressRange || '' },
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
