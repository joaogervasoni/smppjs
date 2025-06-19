import { DTO, DTOFunction } from '../index';

export type EnquireLinkResp = DTO;

export type EnquireLinkRespParams = unknown;

export interface EnquireLinkRespFunction extends DTOFunction<EnquireLinkRespParams, EnquireLinkResp> {
    (): EnquireLinkResp;
}
