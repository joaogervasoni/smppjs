import { dateToAbsolute } from '../helpers';
import { DateType, SubmitMulti, SubmitMultiFunction, SubmitMultiParams } from '../types';
import { dtoValidation } from '../helpers';
import { encodesName, encodesNumber } from '../constains';

type DestAddressElement = {
    dest_flag: { type: 'Int8'; value: number };
    dest_addr_ton: { type: 'Int8'; value: number };
    dest_addr_npi: { type: 'Int8'; value: number };
    destination_addr: { type: 'Cstring'; value: string };
};

type DistListElement = {
    dest_flag: { type: 'Int8'; value: number };
    dl_name: { type: 'Cstring'; value: string };
};

type DestAddressInput = {
    destFlag: number;
    destAddrTon: number;
    destAddrNpi: number;
    destinationAddr: string;
};

type DistListInput = {
    destFlag: number;
    dlName: string;
};

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

const REQUIRED = ['dest_address', 'data_coding', 'esm_class'];

export const submitMultiDTO: SubmitMultiFunction = ({
    destAddressSME,
    destAddressDL,
    numberOfDests,
    dataCoding,
    esmClass,
    systemTypeValue,
    sourceAddrTon,
    sourceAddrNpi,
    sourceAddr,
    protocolId,
    priorityFlag,
    scheduleDeliveryTime,
    validityPeriod,
    registeredDelivery,
    replaceIfPresentFlag,
    smDefaultMsgId,
    shortMessage,
    tlvs,
}: SubmitMultiParams): SubmitMulti => {
    const destAddress = createDestAddress(destAddressSME, destAddressDL);

    /**
     * Deprecation warning for encoding property
     * Remove in v1.4.0
     */
    if (shortMessage?.encoding) {
        console.warn('[SMPP.js DEPRECATION WARNING] shortMessage.encoding is deprecated and will be removed in v1.4.0. Use dataCoding parameter instead.');
    }

    const encodeNumber = typeof dataCoding === 'number' ? dataCoding : encodesNumber[dataCoding];
    const encodeName = encodesName[encodeNumber];

    const dto: SubmitMulti = {
        command: {
            service_type: { type: 'Cstring', value: systemTypeValue || '' },
            source_addr_ton: { type: 'Int8', value: sourceAddrTon || 0 },
            source_addr_npi: { type: 'Int8', value: sourceAddrNpi || 0 },
            source_addr: { type: 'Cstring', value: sourceAddr || '' },
            number_of_dests: { type: 'Int8', value: numberOfDests || destAddress.length },
            dest_address: {
                type: 'Array',
                value: destAddress,
            },
            esm_class: { type: 'Int8', value: esmClass },
            protocol_id: { type: 'Int8', value: protocolId || 0 },
            priority_flag: { type: 'Int8', value: priorityFlag || 0 },
            schedule_delivery_time: { type: 'Cstring', value: scheduleDeliveryTime ? dateToAbsolute(scheduleDeliveryTime) : '' },
            validity_period: { type: 'Cstring', value: validityPeriod ? dateToAbsolute(validityPeriod) : '' },
            registered_delivery: { type: 'Int8', value: registeredDelivery || 0 },
            replace_if_present_flag: { type: 'Int8', value: replaceIfPresentFlag || 0 },
            data_coding: { type: 'Int8', value: encodeNumber },
            sm_default_msg_id: { type: 'Int8', value: smDefaultMsgId || 0 },
            short_message: {
                type: 'Cstring',
                value: shortMessage?.message || Buffer.alloc(0, '', shortMessage?.encoding || encodeName),
                encode: shortMessage?.encoding || encodeName,
                setLength: true,
            },
        },
        tlvs: {
            message_payload: { type: 'Cstring', value: tlvs?.messagePayload || '', encode: encodeName },
        },
    };

    dtoValidation({ dto, DATE_TYPE, MAX_LENGTH, REQUIRED });
    return dto;
};

const createDestAddress = (destAddressSME: DestAddressInput[], destAddressDL: DistListInput[]): SubmitMulti['command']['dest_address']['value'] => {
    const result: (DestAddressElement | DistListElement)[] = [];

    for (let index = 0; index < destAddressSME.length; index += 1) {
        const dest = destAddressSME[index];

        result.push({
            dest_flag: { type: 'Int8', value: dest.destFlag },
            dest_addr_ton: { type: 'Int8', value: dest.destAddrTon },
            dest_addr_npi: { type: 'Int8', value: dest.destAddrNpi },
            destination_addr: { type: 'Cstring', value: dest.destinationAddr },
        });
    }

    for (let index = 0; index < destAddressDL.length; index += 1) {
        const dest = destAddressDL[index];

        result.push({
            dest_flag: { type: 'Int8', value: dest.destFlag },
            dl_name: { type: 'Cstring', value: dest.dlName },
        });
    }

    return result as SubmitMulti['command']['dest_address']['value'];
};
