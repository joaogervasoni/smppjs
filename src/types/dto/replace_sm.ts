import { DTO, DTOFunction, Encode } from '../index';

/**
 * sm_length - Passed in short message DTO (setLength).
 */
export interface ReplaceSm extends DTO {
    command: {
        message_id: { type: 'Cstring'; value: string };
        source_addr_ton: { type: 'Int8'; value: number };
        source_addr_npi: { type: 'Int8'; value: number };
        source_addr: { type: 'Cstring'; value: string };
        schedule_delivery_time: { type: 'Cstring'; value: string };
        validity_period: { type: 'Cstring'; value: string };
        registered_delivery: { type: 'Int8'; value: number };
        sm_default_msg_id: { type: 'Int8'; value: number };
        /**
         * Default ASCII
         */
        short_message: { type: 'Cstring'; value: string | Buffer; encode?: Encode; setLength?: boolean };
    };
}

export type ReplaceSmParams = {
    messageId: string;
    sourceAddrTon?: number;
    sourceAddrNpi?: number;
    sourceAddr?: string;
    scheduleDeliveryTime?: Date | string;
    validityPeriod?: Date | string;
    registeredDelivery?: number;
    smDefaultMsgId?: number;
    shortMessage?: {
        message: string;
        encoding?: Encode;
    };
};

export interface ReplaceSmFunction extends DTOFunction<ReplaceSmParams, ReplaceSm> {
    ({
        messageId,
        sourceAddrTon,
        sourceAddrNpi,
        sourceAddr,
        scheduleDeliveryTime,
        validityPeriod,
        registeredDelivery,
        smDefaultMsgId,
        shortMessage,
    }: ReplaceSmParams): ReplaceSm;
}
