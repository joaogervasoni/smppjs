import { DTO, DTOFunction } from '../index';

export interface DataSmResp extends DTO {
    command: {
        message_id: { type: 'Cstring'; value: string };
    };
}

export type DataSmRespParams = {
    messageId?: string;
};

export interface DataSmRespFunction extends DTOFunction<DataSmRespParams, DataSmResp> {
    ({ messageId }: DataSmRespParams): DataSmResp;
}
