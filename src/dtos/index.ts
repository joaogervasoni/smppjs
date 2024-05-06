import { DTO, DTOFunction } from '../types';
import { bindTransceiverDTO, BindTransceiverFunction } from './bind_transceiver';
import { BindTransceiverRespFunction, bindTransceiverRespDTO } from './bind_transceiver_resp';
import { SubmitSmFunction, submitSmDTO } from './submit_sm';

const DTOs: Record<string, DTOFunction<any, DTO>> = {
    bind_transceiver: bindTransceiverDTO,
    bind_transceiver_resp: bindTransceiverRespDTO,
    submit_sm: submitSmDTO
};

const getDTO = <T extends DTOFunction | BindTransceiverFunction | BindTransceiverRespFunction | SubmitSmFunction>(name: string): T => {
    return DTOs[name] as T;
};

export { getDTO };
