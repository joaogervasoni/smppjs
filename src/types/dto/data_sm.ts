import { DataCoding, DTO, DTOFunction, Encode, SystemType } from '../index';

/**
 * sm_length - Passed in short message DTO (setLength).
 */
export interface DataSm extends DTO {
    command: {
        service_type: { type: 'Cstring'; value: SystemType | (string & {}) };
        source_addr_ton: { type: 'Int8'; value: number };
        source_addr_npi: { type: 'Int8'; value: number };
        source_addr: { type: 'Cstring'; value: string };
        dest_addr_ton: { type: 'Int8'; value: number };
        dest_addr_npi: { type: 'Int8'; value: number };
        destination_addr: { type: 'Cstring'; value: string };
        esm_class: { type: 'Int8'; value: number };
        registered_delivery: { type: 'Int8'; value: number };
        data_coding: { type: 'Int8'; value: number };
    };
    tlvs: {
        message_payload: { type: 'Cstring'; value: string | Buffer; encode?: Encode };
    };
}

export type DataSmParams = {
    destinationAddr: string;
    dataCoding: number | DataCoding;
    esmClass: number;
    systemTypeValue?: SystemType | (string & {});
    sourceAddrTon?: number;
    sourceAddrNpi?: number;
    sourceAddr?: string;
    destAddrTon?: number;
    destAddrNpi?: number;
    registeredDelivery?: number;
    tlvs?: {
        messagePayload: string;
    };
};

export interface DataSmFunction extends DTOFunction<DataSmParams, DataSm> {
    ({
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
    }: DataSmParams): DataSm;
}
