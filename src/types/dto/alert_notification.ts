import { DTO, DTOFunction } from '../index';

export interface AlertNotification extends DTO {
    command: {
        source_addr_ton: { type: 'Int8'; value: number };
        source_addr_npi: { type: 'Int8'; value: number };
        source_addr: { type: 'Cstring'; value: string };
        esme_addr_ton: { type: 'Int8'; value: number };
        esme_addr_npi: { type: 'Int8'; value: number };
        esme_addr: { type: 'Cstring'; value: string };
    };
    tlvs: {
        ms_availability_status: { type: 'Int8'; value: number | undefined };
    };
}

export type AlertNotificationParams = {
    sourceAddrTon?: number;
    sourceAddrNpi?: number;
    sourceAddr?: string;
    esmeAddrTon?: number;
    esmeAddrNpi?: number;
    esmeAddr?: string;
    tlvs?: {
        msAvailabilityStatus?: number | undefined;
    };
};

export interface AlertNotificationFunction extends DTOFunction<AlertNotificationParams, AlertNotification> {
    ({ sourceAddrTon, sourceAddrNpi, sourceAddr, esmeAddrTon, esmeAddrNpi, esmeAddr, tlvs }: AlertNotificationParams): AlertNotification;
}
