import { DTO, DTOFunction, InterfaceVersion, SystemType } from '../index';

export interface BindTransmitter extends DTO {
    command: {
        system_id: { type: 'Cstring'; value: string };
        password: { type: 'Cstring'; value: string };
        system_type: { type: 'Cstring'; value: SystemType | (string & {}) };
        interface_version: { type: 'Int8'; value: InterfaceVersion };
        addr_ton: { type: 'Int8'; value: number };
        addr_npi: { type: 'Int8'; value: number };
        address_range: { type: 'Cstring'; value: string };
    };
}

export type BindTransmitterParams = {
    systemId: string;
    password: string;
    systemType?: SystemType | (string & {});
    interfaceVersion?: InterfaceVersion;
    addrTon?: number;
    addrNpi?: number;
    addressRange?: string;
};

export interface BindTransmitterFunction extends DTOFunction<BindTransmitterParams, BindTransmitter> {
    ({ systemId, password, interfaceVersion, systemType, addressRange }: BindTransmitterParams): BindTransmitter;
}
