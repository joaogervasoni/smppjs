import { DataCoding, DTO, DTOFunction, Encode, PriorityFlag, SystemType } from '../index';

/**
 * sm_length - Passed in short message DTO (setLength).
 */
export interface SubmitSm extends DTO {
    command: {
        service_type: { type: 'Cstring'; value: SystemType | (string & {}) };
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
    };
    tlvs: {
        message_payload: { type: 'Cstring'; value: string | Buffer; encode?: Encode };
    };
}

export type SubmitSmParams = {
    destinationAddr: string;
    dataCoding: number | DataCoding;
    esmClass: number;
    systemTypeValue?: SystemType | (string & {});
    sourceAddrTon?: number;
    sourceAddrNpi?: number;
    sourceAddr?: string;
    destAddrTon?: number;
    destAddrNpi?: number;
    protocolId?: number;
    priorityFlag?: PriorityFlag;
    scheduleDeliveryTime?: Date | string;
    validityPeriod?: Date | string;
    registeredDelivery?: number;
    replaceIfPresentFlag?: number;
    smDefaultMsgId?: number;
    shortMessage?: {
        message: string;
        /**
         * @deprecated Use dataCoding parameter instead. This will be removed in v1.4.0
         */
        encoding?: Encode;
    };
    tlvs?: {
        messagePayload: string;
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
        registeredDelivery,
        replaceIfPresentFlag,
        smDefaultMsgId,
        shortMessage,
        tlvs,
    }: SubmitSmParams): SubmitSm;
}
