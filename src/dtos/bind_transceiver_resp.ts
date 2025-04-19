import { BindTransceiverRespFunction, BindTransceiverResp, BindTransceiverRespParams } from '../types';

export const bindTransceiverRespDTO: BindTransceiverRespFunction = ({ systemIdValue }: BindTransceiverRespParams): BindTransceiverResp => {
    return {
        command: {
            system_id: { type: 'Cstring', value: systemIdValue || '' },
        },
        tlvs: {},
    };
};
