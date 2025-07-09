import { dtoValidation } from '../helpers';
import { DataSm, DataSmFunction, DataSmParams } from '../types/dto';

const MAX_LENGTH: Record<string, number> = {
    service_type: 6,
    source_addr: 21,
    destination_addr: 21,
};

export const dataSmDTO: DataSmFunction = ({
    destinationAddr,
    dataCoding,
    esmClass,
    systemTypeValue,
    sourceAddrTon,
    sourceAddrNpi,
    sourceAddr,
    destAddrTon,
    destAddrNpi,
    registeredDelivery,
    tlvs,
}: DataSmParams): DataSm => {
    const dto: DataSm = {
        command: {
            service_type: { type: 'Cstring', value: systemTypeValue || '' },
            source_addr_ton: { type: 'Int8', value: sourceAddrTon || 0 },
            source_addr_npi: { type: 'Int8', value: sourceAddrNpi || 0 },
            source_addr: { type: 'Cstring', value: sourceAddr || '' },
            dest_addr_ton: { type: 'Int8', value: destAddrTon || 0 },
            dest_addr_npi: { type: 'Int8', value: destAddrNpi || 0 },
            destination_addr: { type: 'Cstring', value: destinationAddr },
            esm_class: { type: 'Int8', value: esmClass },
            registered_delivery: { type: 'Int8', value: registeredDelivery || 0 },
            data_coding: { type: 'Int8', value: dataCoding },
        },
        tlvs: {
            message_payload: { type: 'Cstring', value: tlvs?.messagePayload || '', encode: 'ascii' },
        },
    };

    dtoValidation({ dto, MAX_LENGTH });
    return dto;
};
