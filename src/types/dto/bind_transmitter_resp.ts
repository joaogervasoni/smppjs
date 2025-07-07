import { DTO, DTOFunction, InterfaceVersion } from '../index';

export interface BindTransmitterResp extends DTO {
    command: {
        system_id: { type: 'Cstring'; value: string };
    };
    tlvs: {
        sc_interface_version: { type: 'Int8'; value: InterfaceVersion | undefined };
    };
}

export type BindTransmitterRespParams = {
    systemIdValue?: string;
    tlvs?: {
        scInterfaceVersion?: InterfaceVersion | undefined;
    };
};

export interface BindTransmitterRespFunction extends DTOFunction<BindTransmitterRespParams, BindTransmitterResp> {
    ({ systemIdValue }: BindTransmitterRespParams): BindTransmitterResp;
}
