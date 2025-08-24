import { SubmitMultiRespFunction, SubmitMultiResp, SubmitMultiRespParams } from '../types';

type UnsuccessSmeElement = {
    dest_addr_ton: { type: 'Int8'; value: number };
    dest_addr_npi: { type: 'Int8'; value: number };
    destination_addr: { type: 'Cstring'; value: string };
    error_status_code: { type: 'Int32'; value: number };
};

export const submitMultiRespDTO: SubmitMultiRespFunction = ({ messageId, noUnsuccess, unsuccessSme }: SubmitMultiRespParams): SubmitMultiResp => {
    return {
        command: {
            message_id: { type: 'Cstring', value: messageId || '' },
            no_unsuccess: { type: 'Int8', value: noUnsuccess || 0 },
            unsuccess_sme: { type: 'Array', value: createUnsuccessSme(unsuccessSme) },
        },
        tlvs: {},
    };
};

const createUnsuccessSme = (unsuccessSme: SubmitMultiRespParams['unsuccessSme']): SubmitMultiResp['command']['unsuccess_sme']['value'] => {
    const result: UnsuccessSmeElement[] = [];

    result.push({
        dest_addr_ton: { type: 'Int8', value: unsuccessSme?.[0]?.destAddrTon || 0 },
        dest_addr_npi: { type: 'Int8', value: unsuccessSme?.[0]?.destAddrNpi || 0 },
        destination_addr: { type: 'Cstring', value: unsuccessSme?.[0]?.destinationAddr || '' },
        error_status_code: { type: 'Int32', value: unsuccessSme?.[0]?.errorStatusCode || 0 },
    });

    return result as SubmitMultiResp['command']['unsuccess_sme']['value'];
};
