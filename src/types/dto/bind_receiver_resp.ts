import { DTO, DTOFunction, InterfaceVersion } from '../index';

export interface BindReceiverResp extends DTO {
    command: {
        system_id: { type: 'Cstring'; value: string };
    };
    tlvs: {
        sc_interface_version: { type: 'Int8'; value: InterfaceVersion | 0 };
    };
}

export type BindReceiverRespParams = {
    systemIdValue?: string;
    tlvs?: {
        scInterfaceVersion?: InterfaceVersion | 0;
    };
};

export interface BindReceiverRespFunction extends DTOFunction<BindReceiverRespParams, BindReceiverResp> {
    ({ systemIdValue }: BindReceiverRespParams): BindReceiverResp;
}
