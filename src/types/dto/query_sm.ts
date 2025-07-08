import { DTO, DTOFunction } from '../index';

export interface QuerySm extends DTO {
    command: {
        message_id: { type: 'Cstring'; value: string };
        source_addr_ton: { type: 'Int8'; value: number };
        source_addr_npi: { type: 'Int8'; value: number };
        source_addr: { type: 'Cstring'; value: string };
    };
}

export type QuerySmParams = {
    messageId: string;
    sourceAddrTon?: number;
    sourceAddrNpi?: number;
    sourceAddr?: string;
};

export interface QuerySmFunction extends DTOFunction<QuerySmParams, QuerySm> {
    ({ messageId, sourceAddrTon, sourceAddrNpi, sourceAddr }: QuerySmParams): QuerySm;
}
