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
    systemIdValue: string;
    passwordValue: string;
    interfaceVersionValue: InterfaceVersion;
    systemTypeValue?: string;
    addressRangeValue?: string;
};

export interface BindTransceiverFunction
    extends DTOFunction<
        { systemIdValue: string; passwordValue: string; interfaceVersionValue: InterfaceVersion; systemTypeValue?: string; addressRangeValue?: string },
        BindTransceiver
    > {
    ({
        systemIdValue,
        passwordValue,
        interfaceVersionValue,
        systemTypeValue,
        addressRangeValue,
    }: BindTransceiverParams): BindTransceiver;
}
