import { DTO, DTOFunction, InterfaceVersion } from '../index';

export interface BindTransceiverResp extends DTO {
    command: {
        system_id: { type: 'Cstring'; value: string };
    };
    tlvs: {
        sc_interface_version: { type: 'Int8'; value: InterfaceVersion | undefined };
    };
}

export type BindTransceiverRespParams = {
    systemIdValue?: string;
    tlvs?: {
        scInterfaceVersion?: InterfaceVersion | undefined;
    };
};

export interface BindTransceiverRespFunction extends DTOFunction<BindTransceiverRespParams, BindTransceiverResp> {
    ({ systemIdValue }: BindTransceiverRespParams): BindTransceiverResp;
}
