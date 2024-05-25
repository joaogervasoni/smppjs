import { DTO, DTOFunction, InterfaceVersion } from '../index';

export interface BindTransceiver extends DTO {
    system_id: { type: 'Cstring'; value: string };
    password: { type: 'Cstring'; value: string };
    system_type: { type: 'Cstring'; value: string };
    interface_version: { type: 'Int8'; value: InterfaceVersion };
    addr_ton: { type: 'Int8'; value: number };
    addr_npi: { type: 'Int8'; value: number };
    address_range: { type: 'Cstring'; value: string };
}


export type BindTransceiverParams = {
    systemId: string;
    password: string;
    interfaceVersion?: InterfaceVersion;
    systemType?: string;
    addressRange?: string;
};

export interface BindTransceiverFunction
    extends DTOFunction<
        { systemId: string; password: string; interfaceVersion: InterfaceVersion; systemType?: string; addressRange?: string },
        BindTransceiver
    > {
    ({
        systemId,
        password,
        interfaceVersion,
        systemType,
        addressRange,
    }: BindTransceiverParams): BindTransceiver;
}
