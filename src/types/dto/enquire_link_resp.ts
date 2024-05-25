import { DTO, DTOFunction } from '../index';

export interface EnquireLinkResp extends DTO {}

export type EnquireLinkRespParams = {};

export interface EnquireLinkRespFunction extends DTOFunction<EnquireLinkRespParams, EnquireLinkResp> {
    ({}: EnquireLinkRespParams): EnquireLinkResp;
}
