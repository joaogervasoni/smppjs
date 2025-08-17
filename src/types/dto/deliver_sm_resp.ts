import { DTO, DTOFunction } from '../index';

export interface DeliverSmResp extends DTO {
    command: {
        message_id: { type: 'Cstring'; value: string };
    };
}

export type DeliverSmRespParams = {
    messageId?: string;
};

export interface DeliverSmRespFunction extends DTOFunction<DeliverSmRespParams, DeliverSmResp> {
    ({ messageId }: DeliverSmRespParams): DeliverSmResp;
}
