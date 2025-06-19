import { DTO, DTOFunction } from '../index';

export type Unbind = DTO;

export type UnbindParams = unknown;

export interface UnbindFunction extends DTOFunction<UnbindParams, Unbind> {
    (): Unbind;
}
