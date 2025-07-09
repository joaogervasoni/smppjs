import { MessageState } from '../types';

/**
 * The complete set of SMPP message states ID.
 *
 * ref: Documentation SMPP_v5 - 4.7.15 message_state
 */
const messageState: Record<string, MessageState> = {
    ENROUTE: MessageState.ENROUTE,
    DELIVERED: MessageState.DELIVERED,
    EXPIRED: MessageState.EXPIRED,
    DELETED: MessageState.DELETED,
    UNDELIVERABLE: MessageState.UNDELIVERABLE,
    ACCEPTED: MessageState.ACCEPTED,
    UNKNOWN: MessageState.UNKNOWN,
    REJECTED: MessageState.REJECTED,
    SKIPPED: MessageState.SKIPPED,
};

export { messageState };
