import { SubmitSmRespFunction, SubmitSmResp, SubmitSmRespParams } from '../types';

export const submitSmRespDTO: SubmitSmRespFunction = ({ messageId }: SubmitSmRespParams): SubmitSmResp => {
    return {
        command: {
            message_id: { type: 'Cstring', value: messageId || '' },
        },
        tlvs: {},
    };
};
