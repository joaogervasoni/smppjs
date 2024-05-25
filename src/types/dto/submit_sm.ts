import { DTO, DTOFunction, Encode, PriorityFlag } from '../index';

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
    /**
     * Default ASCII
     */
    short_message: { type: 'Cstring'; value: string | Buffer; encode?: Encode; setLength?: boolean };
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
    priorityFlag?: PriorityFlag;
    scheduleDeliveryTime?: Date;
    validityPeriod?: Date;
    registeredFelivery?: number;
    replaceIfPresentFlag?: number;
    smDefaultMsgId?: number;
    shortMessage?: {
        message: string;
        encoding?: Encode;
    };
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
        shortMessage,
    }: SubmitSmParams): SubmitSm;
}
