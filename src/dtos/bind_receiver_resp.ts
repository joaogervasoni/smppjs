import { BindReceiverRespFunction, BindReceiverResp, BindReceiverRespParams } from '../types';

export const bindReceiverRespDTO: BindReceiverRespFunction = ({ systemIdValue }: BindReceiverRespParams): BindReceiverResp => {
    return {
        command: {
            system_id: { type: 'Cstring', value: systemIdValue || '' },
        },
        tlvs: {},
    };
};
