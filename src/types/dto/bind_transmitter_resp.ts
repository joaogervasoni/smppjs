import { DTO, DTOFunction } from '../index';

export interface BindTransmitterResp extends DTO {
    command: {
        system_id: { type: 'Cstring'; value: string };
    };
}

export type BindTransmitterRespParams = {
    systemIdValue?: string;
};

export interface BindTransmitterRespFunction extends DTOFunction<BindTransmitterRespParams, BindTransmitterResp> {
    ({ systemIdValue }: BindTransmitterRespParams): BindTransmitterResp;
}
