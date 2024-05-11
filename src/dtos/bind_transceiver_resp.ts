import { BindTransceiverRespFunction, BindTransceiverResp, BindTransceiverRespParams } from '../types';

export const bindTransceiverRespDTO: BindTransceiverRespFunction = ({ systemIdValue }: BindTransceiverRespParams): BindTransceiverResp => {
    return {
        system_id: { type: 'Cstring', value: '' },
    };
};
