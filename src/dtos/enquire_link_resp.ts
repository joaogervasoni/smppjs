import { EnquireLinkResp, EnquireLinkRespFunction, EnquireLinkRespParams } from '../types';

export const enquireLinkRespDTO: EnquireLinkRespFunction = ({}: EnquireLinkRespParams): EnquireLinkResp => {
    return {
        command: {},
        tlvs: {},
    };
};
