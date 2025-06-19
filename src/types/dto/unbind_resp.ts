import { DTO, DTOFunction } from '../index';

export type UnbindResp = DTO;

export type UnbindRespParams = unknown;

export interface UnbindRespFunction extends DTOFunction<UnbindRespParams, UnbindResp> {
    (): UnbindResp;
}
