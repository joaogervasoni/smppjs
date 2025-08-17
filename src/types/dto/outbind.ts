import { DTO, DTOFunction } from '../index';

export interface Outbind extends DTO {
    command: {
        system_id: { type: 'Cstring'; value: string };
        password: { type: 'Cstring'; value: string };
    };
}

export type OutbindParams = {
    systemId: string;
    password: string;
};

export interface OutbindFunction extends DTOFunction<OutbindParams, Outbind> {
    ({ systemId, password }: OutbindParams): Outbind;
}
