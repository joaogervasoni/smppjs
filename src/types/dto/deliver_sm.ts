import { DTO, DTOFunction, Encode, PriorityFlag, SystemType } from '../index';

export interface DeliverSm extends DTO {
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
        sm_length: { type: 'Int8'; value: number };
        /**
         * Default ASCII
         */
        short_message: { type: 'Cstring'; value: string | Buffer; encode?: Encode };
    };
}

export type DeliverSmParams = {
    destinationAddr: string;
    dataCoding: number;
    esmClass: number;
    systemTypeValue?: SystemType | (string & {});
    sourceAddrTon?: number;
    sourceAddrNpi?: number;
    sourceAddr?: string;
    destAddrTon?: number;
    destAddrNpi?: number;
    protocolId?: number;
    priorityFlag?: PriorityFlag;
    scheduleDeliveryTime?: string;
    validityPeriod?: string;
    registeredDelivery?: number;
    replaceIfPresentFlag?: number;
    smDefaultMsgId?: number;
    smLength?: number;
    shortMessage?: {
        message: string;
        encoding?: Encode;
    };
    /** Indicates if UDH (User Data Header) is present (1 = present, 0 = absent) */
    has_udh?: number;
    /** Length of the UDH in bytes, including the UDHL field itself */
    udh_length?: number;
    /** Information Element Identifier for concatenated messages (0x00 for 8-bit ref, 0x08 for 16-bit ref) */
    udh_concat_iei?: number;
    /** Reference number identifying the concatenated message set */
    udh_concat_ref?: number;
    /** Total number of parts in the concatenated message */
    udh_concat_total?: number;
    /** Sequence number of this part in the concatenated message (1-based) */
    udh_concat_seq?: number;
};

export interface DeliverSmFunction extends DTOFunction<DeliverSmParams, DeliverSm> {
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
        smLength,
        shortMessage,
    }: DeliverSmParams): DeliverSm;
}
