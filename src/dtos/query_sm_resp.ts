import { QuerySmRespFunction, QuerySmResp, QuerySmRespParams } from '../types';

export const querySmRespDTO: QuerySmRespFunction = ({ messageId, finalDate, messageState, errorCode }: QuerySmRespParams): QuerySmResp => {
    return {
        command: {
            message_id: { type: 'Cstring', value: messageId },
            final_date: { type: 'Cstring', value: finalDate || '' },
            message_state: { type: 'Int8', value: messageState },
            error_code: { type: 'Int8', value: errorCode },
        },
    };
};
