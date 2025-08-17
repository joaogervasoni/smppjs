import { CancelSmResp, CancelSmRespFunction } from '../types';

export const cancelSmRespDTO: CancelSmRespFunction = (): CancelSmResp => {
    return {
        command: {},
        tlvs: {},
    };
};
