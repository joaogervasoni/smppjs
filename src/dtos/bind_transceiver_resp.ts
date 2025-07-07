import { BindTransceiverRespFunction, BindTransceiverResp, BindTransceiverRespParams } from '../types';

export const bindTransceiverRespDTO: BindTransceiverRespFunction = ({ systemIdValue, tlvs }: BindTransceiverRespParams): BindTransceiverResp => {
    return {
        command: {
            system_id: { type: 'Cstring', value: systemIdValue || '' },
        },
        tlvs: {
            sc_interface_version: { type: 'Int8', value: tlvs?.scInterfaceVersion || undefined },
        },
    };
};
