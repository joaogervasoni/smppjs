import { DTO, DTOFunction } from '../index';

export interface BindReceiverResp extends DTO {
    command: {
        system_id: { type: 'Cstring'; value: string };
    };
}

export type BindReceiverRespParams = {
    systemIdValue?: string;
};

export interface BindReceiverRespFunction extends DTOFunction<BindReceiverRespParams, BindReceiverResp> {
    ({ systemIdValue }: BindReceiverRespParams): BindReceiverResp;
}
