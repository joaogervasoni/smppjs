import { DeliverSmResp, DeliverSmRespFunction, DeliverSmRespParams } from '../types';
import { dtoValidation } from '../helpers';

const MAX_LENGTH: Record<string, number> = {
    message_id: 65,
};

export const deliverSmRespDTO: DeliverSmRespFunction = ({ messageId }: DeliverSmRespParams): DeliverSmResp => {
    const dto: DeliverSmResp = {
        command: {
            message_id: { type: 'Cstring', value: messageId || '' },
        },
    };

    dtoValidation({ dto, MAX_LENGTH });
    return dto;
};
