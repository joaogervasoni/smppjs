import { OutbindParams, Outbind, OutbindFunction } from '../types';

export const outbindDTO: OutbindFunction = ({ systemId, password }: OutbindParams): Outbind => {
    return {
        command: {
            system_id: { type: 'Cstring', value: systemId },
            password: { type: 'Cstring', value: password },
        },
    };
};
