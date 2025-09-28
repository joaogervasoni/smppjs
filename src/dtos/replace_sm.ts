import { dateToAbsolute } from '../helpers';
import { DateType, ReplaceSm, ReplaceSmFunction, ReplaceSmParams } from '../types';
import { dtoValidation } from '../helpers';
import { encodesName, encodesNumber } from '../constains';

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
    dataCoding,
}: ReplaceSmParams): ReplaceSm => {
    /**
     * Deprecation warning for encoding property
     * Remove in v1.4.0
     */
    if (shortMessage?.encoding) {
        console.warn('[SMPP.js DEPRECATION WARNING] shortMessage.encoding is deprecated and will be removed in v1.4.0. Use dataCoding parameter instead.');
    }

    const encodeNumber = typeof dataCoding === 'number' ? dataCoding : encodesNumber[dataCoding];
    const encodeName = encodesName[encodeNumber];

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
                value: shortMessage?.message || Buffer.alloc(0, '', shortMessage?.encoding || encodeName),
                encode: shortMessage?.encoding || encodeName,
                setLength: true,
            },
        },
    };

    dtoValidation({ dto, DATE_TYPE, MAX_LENGTH, REQUIRED });
    return dto;
};
