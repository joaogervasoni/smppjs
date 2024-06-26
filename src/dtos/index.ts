import { DTO, DTOFunction, BindTransceiverFunction, BindTransceiverRespFunction, SubmitSmFunction } from '../types';
import { bindTransceiverDTO } from './bind_transceiver';
import { bindTransceiverRespDTO } from './bind_transceiver_resp';
import { enquireLinkRespDTO } from './enquire_link_resp';
import { enquireLinkDTO } from './enquire_link';
import { submitSmDTO } from './submit_sm';
import { submitSmRespDTO } from './submit_sm_resp';

const DTOs: Record<string, DTOFunction<any, DTO>> = {
    bind_transceiver: bindTransceiverDTO,
    bind_transceiver_resp: bindTransceiverRespDTO,
    submit_sm: submitSmDTO,
    submit_sm_resp: submitSmRespDTO,
    enquire_link: enquireLinkDTO,
    enquire_link_resp: enquireLinkRespDTO,
};

const getDTO = <T extends DTOFunction | BindTransceiverFunction | BindTransceiverRespFunction | SubmitSmFunction>(name: string): T => {
    return DTOs[name] as T;
};

export { getDTO };
