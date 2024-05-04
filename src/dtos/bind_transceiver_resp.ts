import { DTO, DTOFunction } from '../types';

interface BindTransceiverResp extends DTO {
    system_id: { type: 'Cstring'; value: string };
}

export interface BindTransceiverRespFunction extends DTOFunction<{ systemIdValue?: string }, BindTransceiverResp> {
    ({ systemIdValue }: { systemIdValue?: string }): BindTransceiverResp;
}

export const bindTransceiverRespDTO: BindTransceiverRespFunction = ({ systemIdValue }: { systemIdValue?: string }): BindTransceiverResp => {
    return {
        system_id: { type: 'Cstring', value: '' },
    };
};

// validateDto()
