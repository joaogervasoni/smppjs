import { DeliverSm, DeliverSmFunction, DeliverSmParams } from '../types';

export const deliverSmDTO: DeliverSmFunction = ({
    destinationAddr,
    dataCoding,
    esmClass,
    systemTypeValue,
    sourceAddrTon,
    sourceAddrNpi,
    sourceAddr,
    destAddrTon,
    destAddrNpi,
    protocolId,
    priorityFlag,
    scheduleDeliveryTime,
    validityPeriod,
    registeredDelivery,
    replaceIfPresentFlag,
    smDefaultMsgId,
    shortMessage,
    smLength,
}: DeliverSmParams): DeliverSm => {
    return {
        command: {
            service_type: { type: 'Cstring', value: systemTypeValue || '' },
            source_addr_ton: { type: 'Int8', value: sourceAddrTon || 0 },
            source_addr_npi: { type: 'Int8', value: sourceAddrNpi || 0 },
            source_addr: { type: 'Cstring', value: sourceAddr || '' },
            dest_addr_ton: { type: 'Int8', value: destAddrTon || 0 },
            dest_addr_npi: { type: 'Int8', value: destAddrNpi || 0 },
            destination_addr: { type: 'Cstring', value: destinationAddr },
            esm_class: { type: 'Int8', value: esmClass },
            protocol_id: { type: 'Int8', value: protocolId || 0 },
            priority_flag: { type: 'Int8', value: priorityFlag || 0 },
            schedule_delivery_time: { type: 'Cstring', value: scheduleDeliveryTime || '' },
            validity_period: { type: 'Cstring', value: validityPeriod || '' },
            registered_delivery: { type: 'Int8', value: registeredDelivery || 0 },
            replace_if_present_flag: { type: 'Int8', value: replaceIfPresentFlag || 0 },
            data_coding: { type: 'Int8', value: dataCoding },
            sm_default_msg_id: { type: 'Int8', value: smDefaultMsgId || 0 },
            sm_length: { type: 'Int8', value: smLength || 0 },
            short_message: {
                type: 'Cstring',
                value: shortMessage?.message || '',
            },
        },
    };
};
