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

export interface Pdu {
    command_length: number;
    command_id: number;
    command_status: number;
    sequence_number: number;
    command: CommandName | '';
    [key: string]: any;
}
