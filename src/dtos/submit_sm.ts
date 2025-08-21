import { dateToAbsolute } from '../helpers';
import { DateType, SubmitSm, SubmitSmFunction, SubmitSmParams } from '../types';
import { dtoValidation } from '../helpers';

const MAX_LENGTH: Record<string, number> = {
    service_type: 6,
    source_addr: 21,
    destination_addr: 21,
    short_message: 256,
    /* Dates */
    schedule_delivery_time: 17,
    validity_period: 17,
};

const DATE_TYPE = {
    schedule_delivery_time: DateType.ABSOLUTE_AND_RELATIVE,
    validity_period: DateType.ABSOLUTE_AND_RELATIVE,
};

const REQUIRED = ['destination_addr', 'data_coding', 'esm_class'];

export const submitSmDTO: SubmitSmFunction = ({
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
    tlvs,
}: SubmitSmParams): SubmitSm => {
    const dto: SubmitSm = {
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
            schedule_delivery_time: { type: 'Cstring', value: scheduleDeliveryTime ? dateToAbsolute(scheduleDeliveryTime) : '' },
            validity_period: { type: 'Cstring', value: validityPeriod ? dateToAbsolute(validityPeriod) : '' },
            registered_delivery: { type: 'Int8', value: registeredDelivery || 0 },
            replace_if_present_flag: { type: 'Int8', value: replaceIfPresentFlag || 0 },
            data_coding: { type: 'Int8', value: dataCoding },
            sm_default_msg_id: { type: 'Int8', value: smDefaultMsgId || 0 },
            short_message: {
                type: 'Cstring',
                value: shortMessage?.message || Buffer.alloc(0, '', shortMessage?.encoding as BufferEncoding),
                encode: shortMessage?.encoding,
                setLength: true,
            },
        },
        tlvs: {
            message_payload: { type: 'Cstring', value: tlvs?.messagePayload || '', encode: 'ascii' }, // TODO: Add to pass encode client
        },
    };

    dtoValidation({ dto, DATE_TYPE, MAX_LENGTH, REQUIRED });
    return dto;
};
