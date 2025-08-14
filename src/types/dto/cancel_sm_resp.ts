import { DTO, DTOFunction } from '../index';

export type CancelSmResp = DTO;

export type CancelSmRespParams = unknown;

export interface CancelSmRespFunction extends DTOFunction<CancelSmRespParams, CancelSmResp> {
    (): CancelSmResp;
}
