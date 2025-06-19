import { Unbind, UnbindFunction } from '../types';

export const unbindDTO: UnbindFunction = (): Unbind => {
    return {
        command: {},
    };
};
