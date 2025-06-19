import { DTO, DTOFunction } from '../index';

export type EnquireLink = DTO;

export type EnquireLinkParams = unknown;

export interface EnquireLinkFunction extends DTOFunction<EnquireLinkParams, EnquireLink> {
    (): EnquireLink;
}
