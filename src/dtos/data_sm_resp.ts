import { DataSmRespFunction, DataSmResp, DataSmRespParams } from '../types';

export const dataSmRespDTO: DataSmRespFunction = ({ messageId }: DataSmRespParams): DataSmResp => {
    return {
        command: {
            message_id: { type: 'Cstring', value: messageId || '' },
        },
        tlvs: {},
    };
};
