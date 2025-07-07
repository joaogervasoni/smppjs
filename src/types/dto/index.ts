export * from './bind_transceiver';
export * from './bind_transceiver_resp';
export * from './submit_sm';
export * from './submit_sm_resp';
export * from './enquire_link';
export * from './enquire_link_resp';
export * from './bind_receiver';
export * from './bind_receiver_resp';
export * from './unbind';
export * from './unbind_resp';
export * from './bind_transmitter';
export * from './bind_transmitter_resp';
export * from './data_sm';
export * from './data_sm_resp';

export type DTO<
    T = {
        command: Record<string, { type: 'Cstring' | 'Int8'; value: string | number | Buffer; encode?: Encode; setLength?: boolean }>;
        tlvs?: Record<string, { type: 'Cstring' | 'Int8'; value: string | number | Buffer | undefined; encode?: Encode }>;
    },
> = T;
export interface DTOFunction<T = unknown, Y = DTO> {
    (...args: T[]): Y;
}

/**
 * Accepted encodes
 */
export type Encode = 'ascii' | 'latin1' | 'ucs2';

/**
 * Enum to reference date types
 */
export enum DateType {
    ABSOLUTE = 0,
    RELATIVE = 1,
    ABSOLUTE_AND_RELATIVE = 2,
}
