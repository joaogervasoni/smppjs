import { BindTransmitterResp, BindTransmitterRespFunction, BindTransmitterRespParams } from '../types';

export const bindTransmitterRespDTO: BindTransmitterRespFunction = ({ systemIdValue }: BindTransmitterRespParams): BindTransmitterResp => {
    return {
        command: {
            system_id: { type: 'Cstring', value: systemIdValue || '' },
        },
        tlvs: {},
    };
};
