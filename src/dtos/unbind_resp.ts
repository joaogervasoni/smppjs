import { UnbindResp, UnbindRespFunction } from '../types';

export const unbindRespDTO: UnbindRespFunction = (): UnbindResp => {
    return {
        command: {},
        tlvs: {},
    };
};
