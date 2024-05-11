import { dateToAbsolute } from '../helpers';
import { DTO, DTOFunction } from '../types';

const MAX_LENGTH = {
    service_type: 6,
    source_addr: 21,
    destination_addr: 21,
};

export interface SubmitSm extends DTO {
    service_type: { type: 'Cstring'; value: string };
    source_addr_ton: { type: 'Int8'; value: number };
    source_addr_npi: { type: 'Int8'; value: number };
    source_addr: { type: 'Cstring'; value: string };
    dest_addr_ton: { type: 'Int8'; value: number };
    dest_addr_npi: { type: 'Int8'; value: number };
    destination_addr: { type: 'Cstring'; value: string };
    esm_class: { type: 'Int8'; value: number };
    protocol_id: { type: 'Int8'; value: number };
    priority_flag: { type: 'Int8'; value: number };
    schedule_delivery_time: { type: 'Cstring'; value: string };
    validity_period: { type: 'Cstring'; value: string };
    registered_delivery: { type: 'Int8'; value: number };
    replace_if_present_flag: { type: 'Int8'; value: number };
    data_coding: { type: 'Int8'; value: number };
    sm_default_msg_id: { type: 'Int8'; value: number };
    // short_message
    // need to create message validations to send submitsm
}

export type SubmitSmParams = {
    destinationAddr: string;
    dataCoding: number;
    esmClass: number;
    systemTypeValue?: string;
    sourceAddrTon?: number;
    sourceAddrNpi?: number;
    sourceAddr?: string;
    destAddrTon?: number;
    destAddrNpi?: number;
    protocolId?: number;
    priorityFlag?: number;
    scheduleDeliveryTime?: Date;
    validityPeriod?: Date;
    registeredFelivery?: number;
    replaceIfPresentFlag?: number;
    smDefaultMsgId?: number;
};

export interface SubmitSmFunction extends DTOFunction<SubmitSmParams, SubmitSm> {
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
        protocolId,
        priorityFlag,
        scheduleDeliveryTime,
        validityPeriod,
        registeredFelivery,
        replaceIfPresentFlag,
        smDefaultMsgId,
    }: SubmitSmParams): SubmitSm;
}

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
    registeredFelivery,
    replaceIfPresentFlag,
    smDefaultMsgId,
}: SubmitSmParams): SubmitSm => {
    const dto: SubmitSm = {
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
        registered_delivery: { type: 'Int8', value: registeredFelivery || 0 },
        schedule_delivery_time: { type: 'Cstring', value: scheduleDeliveryTime ? dateToAbsolute(scheduleDeliveryTime) : '' },
        validity_period: { type: 'Cstring', value: validityPeriod ? dateToAbsolute(validityPeriod) : '' },
        replace_if_present_flag: { type: 'Int8', value: replaceIfPresentFlag || 0 },
        data_coding: { type: 'Int8', value: dataCoding },
        sm_default_msg_id: { type: 'Int8', value: smDefaultMsgId || 0 },
    };

    validateDto(dto);
    return dto;
};

/**
 * Add length plus one to add 00 validation
 *
 * Ref: Page 49 - SMPP_v5
 * @param dto SubmitSm
 */
const validateDto = (dto: SubmitSm): void => {
    const validator = Object.entries(MAX_LENGTH);
    for (let index = 0; index < validator.length; index += 1) {
        if (dto[validator[index][0]].value.toString().length + 1 > validator[index][1]) {
            throw new Error(`${validator[index][0]} need to be minor than ${validator[index][1]}`);
        }
    }
};
