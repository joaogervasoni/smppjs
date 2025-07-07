import { BindReceiverRespFunction, BindReceiverResp, BindReceiverRespParams } from '../types';

export const bindReceiverRespDTO: BindReceiverRespFunction = ({ systemIdValue, tlvs }: BindReceiverRespParams): BindReceiverResp => {
    return {
        command: {
            system_id: { type: 'Cstring', value: systemIdValue || '' },
        },
        tlvs: {
            sc_interface_version: { type: 'Int8', value: tlvs?.scInterfaceVersion || undefined },
        },
    };
};
