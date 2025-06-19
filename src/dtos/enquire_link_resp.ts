import { EnquireLinkResp, EnquireLinkRespFunction } from '../types';

export const enquireLinkRespDTO: EnquireLinkRespFunction = (): EnquireLinkResp => {
    return {
        command: {},
        tlvs: {},
    };
};
