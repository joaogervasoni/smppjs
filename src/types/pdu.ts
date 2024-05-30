import { DTO } from '.';

/**
 * Base class to manage PDU.
 */
export interface IPDU {
    /**
     * Call a smpp protocol.
     * @param command Command name - SendCommandName
     * @param sequenceNumber - Sequence number of call
     * @param commandParams Params of command called
     */
    call({ command, sequenceNumber, commandParams }: { command: SendCommandName; sequenceNumber: number; commandParams: DTO }): boolean;
    /**
     * Receive a smpp protocol buffer, read and return formated to object Pdu.
     * @param buffer Buffer
     */
    readPdu(buffer: Buffer): Record<string, string | number>;
}

/**
 * Indicate version of SMPP protocol
 * 80 - 5
 * 52 - 3.4
 * 51 - 3.3
 */
export type InterfaceVersion = 51 | 52 | 80;

/**
 * Commands name
 */
export type CommandName = SendCommandName | ResponseCommandName;

/**
 * Semd commands name
 */
export type SendCommandName =
    | 'generic_nack'
    | 'bind_receiver'
    | 'bind_transmitter'
    | 'query_sm'
    | 'submit_sm'
    | 'deliver_sm'
    | 'unbind'
    | 'replace_sm'
    | 'cancel_sm'
    | 'bind_transceiver'
    | 'outbind'
    | 'enquire_link'
    | 'submit_multi'
    | 'alert_notification'
    | 'data_sm';

/**
 * Response commands name
 */
export type ResponseCommandName =
    | 'bind_receiver_resp'
    | 'bind_transmitter_resp'
    | 'query_sm_resp'
    | 'submit_sm_resp'
    | 'deliver_sm_resp'
    | 'unbind_resp'
    | 'replace_sm_resp'
    | 'cancel_sm_resp'
    | 'bind_transceiver_resp'
    | 'enquire_link_resp'
    | 'submit_multi_resp'
    | 'data_sm_resp';

/**
 * Pdu base object
 */
export interface Pdu {
    command_length: number;
    command_id: number;
    command_status: number;
    sequence_number: number;
    command: CommandName | '';
    [key: string]: any;
}

/**
 * Indicate priority
 * 
 * Prioritys have difference to type, read: 4.7.19 on Smpp v5 doc.
 */
export type PriorityFlag = 0 | 1 | 2 | 3 | 4;
