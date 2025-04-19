import { DTO, DTOFunction } from '../index';

export interface SubmitSmResp extends DTO {
    command: {
        message_id: { type: 'Cstring'; value: string };
    };
    tlvs: {};
}

export type SubmitSmRespParams = {
    messageId?: string;
};

export interface SubmitSmRespFunction extends DTOFunction<SubmitSmRespParams, SubmitSmResp> {
    ({ messageId }: SubmitSmRespParams): SubmitSmResp;
}
