export type DTO<T = Record<string, { type: 'Cstring' | 'Int8'; value: string | number | Buffer }>> = T;
export interface DTOFunction<T = any, Y = DTO> {
    (...args: T[]): Y;
}
