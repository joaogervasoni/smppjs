import { DTO, DTOFunction } from '../index';

export interface BindTransceiverResp extends DTO {
    command: {
        system_id: { type: 'Cstring'; value: string };
    };
    tlvs: {};
}

export type BindTransceiverRespParams = {
    systemIdValue?: string;
};

export interface BindTransceiverRespFunction extends DTOFunction<BindTransceiverRespParams, BindTransceiverResp> {
    ({ systemIdValue }: BindTransceiverRespParams): BindTransceiverResp;
}
