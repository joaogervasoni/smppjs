import { DTO, DTOFunction } from '../index';

export interface SubmitMultiResp extends DTO {
    command: {
        message_id: { type: 'Cstring'; value: string };
        no_unsuccess: { type: 'Int8'; value: number };
        unsuccess_sme: {
            type: 'Array';
            value: [
                {
                    dest_addr_ton: { type: 'Int8'; value: number };
                    dest_addr_npi: { type: 'Int8'; value: number };
                    destination_addr: { type: 'Cstring'; value: string };
                    error_status_code: { type: 'Int32'; value: number };
                },
            ];
        };
    };
}

export type SubmitMultiRespParams = {
    messageId: string;
    noUnsuccess: number;
    unsuccessSme: {
        destAddrTon: number;
        destAddrNpi: number;
        destinationAddr: string;
        errorStatusCode: number;
    }[];
};

export interface SubmitMultiRespFunction extends DTOFunction<SubmitMultiRespParams, SubmitMultiResp> {
    ({ messageId, noUnsuccess, unsuccessSme }: SubmitMultiRespParams): SubmitMultiResp;
}
