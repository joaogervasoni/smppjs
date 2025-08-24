/**
 * The complete set of SMPP command status for version 3.4
 *
 * ref: Documentation SMPP_v3_4 - 5.1.3
 */
const CommandStatus34 = {
    ESME_ROK: 0x0000,
    ESME_RINVMSGLEN: 0x0001,
    ESME_RINVCMDLEN: 0x0002,
    ESME_RINVCMDID: 0x0003,
    ESME_RINVBNDSTS: 0x0004,
    ESME_RALYBND: 0x0005,
    ESME_RINVPRTFLG: 0x0006,
    ESME_RINVREGDLVFLG: 0x0007,
    ESME_RSYSERR: 0x0008,
    ESME_RINVSRCADR: 0x000a,
    ESME_RINVDSTADR: 0x000b,
    ESME_RINVMSGID: 0x000c,
    ESME_RBINDFAIL: 0x000d,
    ESME_RINVPASWD: 0x000e,
    ESME_RINVSYSID: 0x000f,
    ESME_RCANCELFAIL: 0x0011,
    ESME_RREPLACEFAIL: 0x0013,
    ESME_RMSGQFUL: 0x0014,
    ESME_RINVSERTYP: 0x0015,
    ESME_RINVNUMDESTS: 0x0033,
    ESME_RINVDLNAME: 0x0034,
    ESME_RINVDESTFLAG: 0x0040,
    ESME_RINVSUBREP: 0x0042,
    ESME_RINVESMCLASS: 0x0043,
    ESME_RCNTSUBDL: 0x0044,
    ESME_RSUBMITFAIL: 0x0045,
    ESME_RINVSRCTON: 0x0048,
    ESME_RINVSRCNPI: 0x0049,
    ESME_RINVDSTTON: 0x0050,
    ESME_RINVDSTNPI: 0x0051,
    ESME_RINVSYSTYP: 0x0053,
    ESME_RINVREPFLAG: 0x0054,
    ESME_RINVNUMMSGS: 0x0055,
    ESME_RTHROTTLED: 0x0058,
    ESME_RINVSCHED: 0x0061,
    ESME_RINVEXPIRY: 0x0062,
    ESME_RINVDFTMSGID: 0x0063,
    ESME_RX_T_APPN: 0x0064,
    ESME_RX_P_APPN: 0x0065,
    ESME_RX_R_APPN: 0x0066,
    ESME_RQUERYFAIL: 0x0067,
    ESME_RINVTLVSTREAM: 0x00c0,
    ESME_RTLVNOTALLWD: 0x00c1,
    ESME_RINVTLVLEN: 0x00c2,
    ESME_RMISSINGTLV: 0x00c3,
    ESME_RINVTLVVAL: 0x00c4,
    ESME_RDELIVERYFAILURE: 0x00fe,
    ESME_RUNKNOWNERR: 0x00ff,
};

/**
 * The complete set of SMPP command status for version 5
 *
 * ref: Documentation SMPP_v5 - 4.7.6
 */
const CommandStatus5 = {
    ESME_RSERTYPUNAUTH: 0x0100,
    ESME_RPROHIBITED: 0x0101,
    ESME_RSERTYPUNAVAIL: 0x0102,
    ESME_RSERTYPDENIED: 0x0103,
    ESME_RINVDCS: 0x0104,
    ESME_RINVSRCADDRSUBUNIT: 0x0105,
    ESME_RINVDSTADDRSUBUNIT: 0x0106,
    ESME_RINVBCASTFREQINT: 0x0107,
    ESME_RINVBCASTALIAS_NAME: 0x0108,
    ESME_RINVBCASTAREAFMT: 0x0109,
    ESME_RINVNUMBCAST_AREAS: 0x010a,
    ESME_RINVBCASTCNTTYPE: 0x010b,
    ESME_RINVBCASTMSGCLASS: 0x010c,
    ESME_RBCASTFAIL: 0x010d,
    ESME_RBCASTQUERYFAIL: 0x010e,
    ESME_RBCASTCANCELFAIL: 0x010f,
    ESME_RINVBCAST_REP: 0x0110,
    ESME_RINVBCASTSRVGRP: 0x0111,
    ESME_RINVBCASTCHANIND: 0x0112,
};

/**
 * The complete set of SMPP command status
 *
 * The command_status field of a SMPP message response indicates the success or failure of
 * a SMPP request. It is relevant only in the SMPP response message and should be set to
 * NULL in SMPP request messages.
 *
 * ref: Documentation SMPP_v3_4 and SMPP_v5
 */
const CommandStatus = Object.assign({}, CommandStatus34, CommandStatus5);

/**
 * The complete set of SMPP command status with information.
 *
 * The command_status field of a SMPP message response indicates the success or failure of
 * a SMPP request. It is relevant only in the SMPP response message and should be set to
 * NULL in SMPP request messages.
 *
 * ref: Documentation SMPP_v3_4 and SMPP_v5 (command_status, error_status_code)
 */
const CommandStatusInfo: Record<string, { name: keyof typeof CommandStatus; description: string }> = {
    0x00000001: { name: 'ESME_RINVMSGLEN', description: 'Message Length is invalid.' },
    0x00000002: { name: 'ESME_RINVCMDLEN', description: 'Command Length is invalid.' },
    0x00000003: { name: 'ESME_RINVCMDID', description: 'Invalid Command ID.' },
    0x00000004: { name: 'ESME_RINVBNDSTS', description: 'Incorrect BIND Status for given command.' },
    0x00000005: { name: 'ESME_RALYBND', description: 'ESME Already in Bound State.' },
    0x00000006: { name: 'ESME_RINVPRTFLG', description: 'Invalid Priority Flag.' },
    0x00000007: { name: 'ESME_RINVREGDLVFLG', description: 'Invalid Registered Delivery Flag.' },
    0x00000008: { name: 'ESME_RSYSERR', description: 'System Error.' },
    0x0000000a: { name: 'ESME_RINVSRCADR', description: 'Invalid Source Address.' },
    0x0000000b: { name: 'ESME_RINVDSTADR', description: 'Invalid Destination Address.' },
    0x0000000c: { name: 'ESME_RINVMSGID', description: 'Message ID is invalid.' },
    0x0000000d: { name: 'ESME_RBINDFAIL', description: 'Bind Failed.' },
    0x0000000e: { name: 'ESME_RINVPASWD', description: 'Invalid Password.' },
    0x0000000f: { name: 'ESME_RINVSYSID', description: 'Invalid System ID.' },
    0x00000011: { name: 'ESME_RCANCELFAIL', description: 'Cancel SM Failed.' },
    0x00000013: { name: 'ESME_RREPLACEFAIL', description: 'Replace SM Failed.' },
    0x00000014: { name: 'ESME_RMSGQFUL', description: 'Message Queue Full.' },
    0x00000015: { name: 'ESME_RINVSERTYP', description: 'Invalid Service Type.' },
    0x00000033: { name: 'ESME_RINVNUMDESTS', description: 'Invalid number of destinations.' },
    0x00000034: { name: 'ESME_RINVDLNAME', description: 'Invalid Distribution List name.' },
    0x00000040: { name: 'ESME_RINVDESTFLAG', description: 'Destination flag is invalid (submit_multi).' },
    0x00000042: {
        name: 'ESME_RINVSUBREP',
        description: 'Submit w/replace functionality has been requested where it is either unsupported or inappropriate for the particular MC.',
    },
    0x00000043: { name: 'ESME_RINVESMCLASS', description: 'Invalid esm_class field data.' },
    0x00000044: { name: 'ESME_RCNTSUBDL', description: 'Cannot Submit to Distribution List.' },
    0x00000045: { name: 'ESME_RSUBMITFAIL', description: 'submit_sm, data_sm or submit_multi failed.' },
    0x00000048: { name: 'ESME_RINVSRCTON', description: 'Invalid Source address TON.' },
    0x00000049: { name: 'ESME_RINVSRCNPI', description: 'Invalid Source address NPI.' },
    0x00000050: { name: 'ESME_RINVDSTTON', description: 'Invalid Destination address TON.' },
    0x00000051: { name: 'ESME_RINVDSTNPI', description: 'Invalid Destination address NPI.' },
    0x00000053: { name: 'ESME_RINVSYSTYP', description: 'Invalid system_type field.' },
    0x00000054: { name: 'ESME_RINVREPFLAG', description: 'Invalid replace_if_present flag.' },
    0x00000055: { name: 'ESME_RINVNUMMSGS', description: 'Invalid number of messages.' },
    0x00000058: { name: 'ESME_RTHROTTLED', description: 'Throttling error (ESME has exceeded allowed message limits).' },
    0x00000061: { name: 'ESME_RINVSCHED', description: 'Invalid Scheduled Delivery Time.' },
    0x00000062: { name: 'ESME_RINVEXPIRY', description: 'Invalid message validity period (Expiry time).' },
    0x00000063: { name: 'ESME_RINVDFTMSGID', description: 'Predefined Message ID is Invalid or specified predefined message was not found.' },
    0x00000064: { name: 'ESME_RX_T_APPN', description: 'ESME Receiver Temporary App Error Code.' },
    0x00000065: { name: 'ESME_RX_P_APPN', description: 'ESME Receiver Permanent App Error Code.' },
    0x00000066: { name: 'ESME_RX_R_APPN', description: 'ESME Receiver Reject Message Error Code.' },
    0x00000067: { name: 'ESME_RQUERYFAIL', description: 'query_sm request failed.' },
    0x000000c0: { name: 'ESME_RINVTLVSTREAM', description: 'Error in the optional part of the PDU Body.' },
    0x000000c1: { name: 'ESME_RTLVNOTALLWD', description: 'TLV not allowed.' },
    0x000000c2: { name: 'ESME_RINVTLVLEN', description: 'Invalid Parameter Length.' },
    0x000000c3: { name: 'ESME_RMISSINGTLV', description: 'Expected TLV missing.' },
    0x000000c4: { name: 'ESME_RINVTLVVAL', description: 'Invalid TLV Value.' },
    0x000000fe: { name: 'ESME_RDELIVERYFAILURE', description: 'Transaction Delivery Failure.' },
    0x000000ff: { name: 'ESME_RUNKNOWNERR', description: 'Unknown Error.' },
    0x00000100: { name: 'ESME_RSERTYPUNAUTH', description: 'ESME Not authorised to use specified service_type.' },
    0x00000101: { name: 'ESME_RPROHIBITED', description: 'Prohibited from using specified ESME operation.' },
    0x00000102: { name: 'ESME_RSERTYPUNAVAIL', description: 'Specified service_type is unavailable.' },
    0x00000103: { name: 'ESME_RSERTYPDENIED', description: 'Specified service_type is denied.' },
    0x00000104: { name: 'ESME_RINVDCS', description: 'Invalid Data Coding Scheme.' },
    0x00000105: { name: 'ESME_RINVSRCADDRSUBUNIT', description: 'Source Address Sub unit is Invalid.' },
    0x00000106: { name: 'ESME_RINVDSTADDRSUBUNIT', description: 'Destination Address Sub unit is Invalid.' },
    0x00000107: { name: 'ESME_RINVBCASTFREQINT', description: 'Broadcast Frequency Interval is invalid.' },
    0x00000108: { name: 'ESME_RINVBCASTALIAS_NAME', description: 'Broadcast Alias Name is invalid.' },
    0x00000109: { name: 'ESME_RINVBCASTAREAFMT', description: 'Broadcast Area Format is invalid.' },
    0x0000010a: { name: 'ESME_RINVNUMBCAST_AREAS', description: 'Number of Broadcast Areas is invalid.' },
    0x0000010b: { name: 'ESME_RINVBCASTCNTTYPE', description: 'Broadcast Content Type is invalid.' },
    0x0000010c: { name: 'ESME_RINVBCASTMSGCLASS', description: 'Broadcast Message Class is invalid.' },
    0x0000010d: { name: 'ESME_RBCASTFAIL', description: 'broadcast_sm operation failed.' },
    0x0000010e: { name: 'ESME_RBCASTQUERYFAIL', description: 'query_broadcast_sm operation failed.' },
    0x0000010f: { name: 'ESME_RBCASTCANCELFAIL', description: 'cancel_broadcast_sm operation failed.' },
    0x00000110: { name: 'ESME_RINVBCAST_REP', description: 'Number of Repeated Broadcasts is invalid.' },
    0x00000111: { name: 'ESME_RINVBCASTSRVGRP', description: 'Broadcast Service Group is invalid.' },
    0x00000112: { name: 'ESME_RINVBCASTCHANIND', description: 'Broadcast Channel Indicator is invalid.' },
};

export { CommandStatus, CommandStatusInfo };
