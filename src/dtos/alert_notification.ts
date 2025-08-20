import { AlertNotificationFunction, AlertNotification, AlertNotificationParams } from '../types';

export const alertNotificationDTO: AlertNotificationFunction = ({
    sourceAddrTon,
    sourceAddrNpi,
    sourceAddr,
    esmeAddrTon,
    esmeAddrNpi,
    esmeAddr,
    tlvs,
}: AlertNotificationParams): AlertNotification => {
    return {
        command: {
            source_addr_ton: { type: 'Int8', value: sourceAddrTon || 0 },
            source_addr_npi: { type: 'Int8', value: sourceAddrNpi || 0 },
            source_addr: { type: 'Cstring', value: sourceAddr || '' },
            esme_addr_ton: { type: 'Int8', value: esmeAddrTon || 0 },
            esme_addr_npi: { type: 'Int8', value: esmeAddrNpi || 0 },
            esme_addr: { type: 'Cstring', value: esmeAddr || '' },
        },
        tlvs: {
            ms_availability_status: { type: 'Int8', value: tlvs?.msAvailabilityStatus || undefined },
        },
    };
};
