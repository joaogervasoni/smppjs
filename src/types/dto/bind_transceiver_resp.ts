import { DTO, DTOFunction } from '../index';

export interface BindTransceiverResp extends DTO {
    system_id: { type: 'Cstring'; value: string };
}

export type BindTransceiverRespParams = {
    systemIdValue?: string;
};

export interface BindTransceiverRespFunction extends DTOFunction<BindTransceiverRespParams, BindTransceiverResp> {
    ({ systemIdValue }: BindTransceiverRespParams): BindTransceiverResp;
}
