import { DTO } from '.';
import { optionalParams } from '../constains';

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
    call({ command, sequenceNumber, dto }: { command: SendCommandName; sequenceNumber: number; dto: DTO }): boolean;
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

// Will be removed in the future.
/**
 * Commands client
 */
export type CommandClient =
    | 'bind_receiver'
    | 'bind_transmitter'
    | 'submit_sm'
    | 'bind_transceiver'
    | 'enquire_link'
    | 'data_sm'
    | 'query_sm'
    | 'outbind'
    | 'cancel_sm'
    | 'bind_receiver_resp'
    | 'bind_transmitter_resp'
    | 'bind_transceiver_resp'
    | 'submit_sm_resp'
    | 'unbind_resp'
    | 'enquire_link_resp'
    | 'query_sm_resp'
    | 'cancel_sm_resp'
    | 'data_sm_resp'
    | 'replace_sm'
    | 'deliver_sm'
    | 'deliver_sm_resp';

/**
 * Send commands name
 */
export type SendCommandName =
    | 'generic_nack'
    | 'bind_receiver'
    | 'bind_transmitter'
    | 'query_sm'
    | 'submit_sm'
    | 'deliver_sm_resp'
    | 'unbind'
    | 'replace_sm'
    | 'cancel_sm'
    | 'bind_transceiver'
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
    | 'unbind_resp'
    | 'replace_sm_resp'
    | 'cancel_sm_resp'
    | 'bind_transceiver_resp'
    | 'enquire_link_resp'
    | 'submit_multi_resp'
    | 'data_sm_resp'
    | 'outbind'
    | 'deliver_sm';

/**
 * Pdu base object
 */
export interface Pdu {
    command_length: number;
    command_id: number;
    command_status: number;
    sequence_number: number;
    command: CommandName | '';
    [key: string]: string | number;
}

/**
 * Indicate priority
 *
 * Prioritys have difference to type, read: 4.7.19 on Smpp v5 doc.
 */
export type PriorityFlag = 0 | 1 | 2 | 3 | 4;

/**
 * Some default values to system type
 *
 * This is only some options.
 */
export type SystemType = 'SMPP' | 'VMS' | 'VASP' | 'OTA' | 'WAP' | 'USSD' | 'SCM' | 'EMAIL' | 'VOICE' | 'IP' | 'CMT' | 'WWW';

/**
 * Names of optinal params
 */
export type OptionalParamKey = keyof typeof optionalParams;
