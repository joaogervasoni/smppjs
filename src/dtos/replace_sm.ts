import { dateToAbsolute } from '../helpers';
import { DateType, ReplaceSm, ReplaceSmFunction, ReplaceSmParams } from '../types';
import { dtoValidation } from '../helpers';

const MAX_LENGTH: Record<string, number> = {
    source_addr: 21,
    short_message: 256,
    /* Dates */
    schedule_delivery_time: 17,
    validity_period: 17,
};

const DATE_TYPE = {
    schedule_delivery_time: DateType.ABSOLUTE_AND_RELATIVE,
    validity_period: DateType.ABSOLUTE_AND_RELATIVE,
};

const REQUIRED = ['messageId', 'short_message'];

export const replaceSmDTO: ReplaceSmFunction = ({
    messageId,
    sourceAddrTon,
    sourceAddrNpi,
    sourceAddr,
    scheduleDeliveryTime,
    validityPeriod,
    registeredDelivery,
    smDefaultMsgId,
    shortMessage,
}: ReplaceSmParams): ReplaceSm => {
    const dto: ReplaceSm = {
        command: {
            message_id: { type: 'Cstring', value: messageId },
            source_addr_ton: { type: 'Int8', value: sourceAddrTon || 0 },
            source_addr_npi: { type: 'Int8', value: sourceAddrNpi || 0 },
            source_addr: { type: 'Cstring', value: sourceAddr || '' },
            schedule_delivery_time: { type: 'Cstring', value: scheduleDeliveryTime ? dateToAbsolute(scheduleDeliveryTime) : '' },
            validity_period: { type: 'Cstring', value: validityPeriod ? dateToAbsolute(validityPeriod) : '' },
            registered_delivery: { type: 'Int8', value: registeredDelivery || 0 },
            sm_default_msg_id: { type: 'Int8', value: smDefaultMsgId || 0 },
            short_message: {
                type: 'Cstring',
                value: shortMessage?.message || Buffer.alloc(0, '', shortMessage?.encoding as BufferEncoding),
                encode: shortMessage?.encoding,
                setLength: true,
            },
        },
    };

    dtoValidation({ dto, DATE_TYPE, MAX_LENGTH, REQUIRED });
    return dto;
};
