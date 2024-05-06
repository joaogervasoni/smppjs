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
export type CommandName =
    | 'generic_nack'
    | 'bind_receiver'
    | 'bind_receiver_resp'
    | 'bind_transmitter'
    | 'bind_transmitter_resp'
    | 'query_sm'
    | 'query_sm_resp'
    | 'submit_sm'
    | 'submit_sm_resp'
    | 'deliver_sm'
    | 'deliver_sm_resp'
    | 'unbind'
    | 'unbind_resp'
    | 'replace_sm'
    | 'replace_sm_resp'
    | 'cancel_sm'
    | 'cancel_sm_resp'
    | 'bind_transceiver'
    | 'bind_transceiver_resp'
    | 'outbind'
    | 'enquire_link'
    | 'enquire_link_resp'
    | 'submit_multi'
    | 'submit_multi_resp'
    | 'alert_notification'
    | 'data_sm'
    | 'data_sm_resp';
