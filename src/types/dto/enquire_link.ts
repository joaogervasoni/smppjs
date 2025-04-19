import { DTO, DTOFunction } from '../index';

export interface EnquireLink extends DTO {
    command: {},
    tlvs: {}
}

export type EnquireLinkParams = {};

export interface EnquireLinkFunction extends DTOFunction<EnquireLinkParams, EnquireLink> {
    ({}: EnquireLinkParams): EnquireLink;
}
