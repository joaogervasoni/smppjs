import { DTO, DTOFunction, SystemType } from '../index';

export interface CancelSm extends DTO {
    command: {
        service_type: { type: 'Cstring'; value: SystemType | (string & {}) };
        message_id: { type: 'Cstring'; value: string };
        source_addr_ton: { type: 'Int8'; value: number };
        source_addr_npi: { type: 'Int8'; value: number };
        source_addr: { type: 'Cstring'; value: string };
        dest_addr_ton: { type: 'Int8'; value: number };
        dest_addr_npi: { type: 'Int8'; value: number };
        destination_addr: { type: 'Cstring'; value: string };
    };
}

export type CancelSmParams = {
    messageId: string;
    destinationAddr: string;
    systemTypeValue?: SystemType | (string & {});
    sourceAddrTon?: number;
    sourceAddrNpi?: number;
    sourceAddr?: string;
    destAddrTon?: number;
    destAddrNpi?: number;
};

export interface CancelSmFunction extends DTOFunction<CancelSmParams, CancelSm> {
    ({ systemTypeValue, messageId, sourceAddrTon, sourceAddrNpi, sourceAddr, destAddrTon, destAddrNpi, destinationAddr }: CancelSmParams): CancelSm;
}
