import { BindTransmitterResp, BindTransmitterRespFunction, BindTransmitterRespParams } from '../types';

export const bindTransmitterRespDTO: BindTransmitterRespFunction = ({ systemIdValue, tlvs }: BindTransmitterRespParams): BindTransmitterResp => {
    return {
        command: {
            system_id: { type: 'Cstring', value: systemIdValue || '' },
        },
        tlvs: {
            sc_interface_version: { type: 'Int8', value: tlvs?.scInterfaceVersion || 0 },
        },
    };
};
