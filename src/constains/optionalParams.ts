/**
 * The SMPP supported Optional Parameters and their associated Tag
 *
 * ref: Documentation SMPP_v3_4
 * ref: Documentation SMPP_v5 - 3.2.1.6
 */
const optionalParams: Record<string, number> = {
    receipted_message_id: 0x001e,
    message_payload: 0x0424,
};

export { optionalParams };
