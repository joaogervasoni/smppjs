import { DTO, DTOFunction, InterfaceVersion } from '../index';

export interface BindReceiver extends DTO {
    command: {
        system_id: { type: 'Cstring'; value: string };
        password: { type: 'Cstring'; value: string };
        system_type: { type: 'Cstring'; value: string };
        interface_version: { type: 'Int8'; value: InterfaceVersion };
        addr_ton: { type: 'Int8'; value: number };
        addr_npi: { type: 'Int8'; value: number };
        address_range: { type: 'Cstring'; value: string };
    };
}

export type BindReceiverParams = {
    systemId: string;
    password: string;
    systemType: string;
    interfaceVersion?: InterfaceVersion;
    addrTon?: number;
    addrNpi?: number;
    addressRange?: string;
};

export interface BindReceiverFunction extends DTOFunction<BindReceiverParams, BindReceiver> {
    ({ systemId, password, systemType, interfaceVersion, addrTon, addrNpi, addressRange }: BindReceiverParams): BindReceiver;
}
