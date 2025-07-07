import { DTO, DTOFunction, InterfaceVersion } from '../index';

export interface BindTransmitterResp extends DTO {
    command: {
        system_id: { type: 'Cstring'; value: string };
    };
    tlvs: {
        sc_interface_version: { type: 'Int8'; value: InterfaceVersion | 0 };
    };
}

export type BindTransmitterRespParams = {
    systemIdValue?: string;
    tlvs?: {
        scInterfaceVersion?: InterfaceVersion | 0;
    };
};

export interface BindTransmitterRespFunction extends DTOFunction<BindTransmitterRespParams, BindTransmitterResp> {
    ({ systemIdValue }: BindTransmitterRespParams): BindTransmitterResp;
}
