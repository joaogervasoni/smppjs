import { DTO, DTOFunction, MessageState } from '../index';

export interface QuerySmResp extends DTO {
    command: {
        message_id: { type: 'Cstring'; value: string };
        final_date?: { type: 'Cstring'; value: string };
        message_state: { type: 'Int8'; value: MessageState };
        error_code: { type: 'Int8'; value: number };
    };
}

export type QuerySmRespParams = {
    messageId: string;
    finalDate: string;
    messageState: MessageState;
    errorCode: number;
};

export interface QuerySmRespFunction extends DTOFunction<QuerySmRespParams, QuerySmResp> {
    ({ messageId, finalDate, messageState, errorCode }: QuerySmRespParams): QuerySmResp;
}
