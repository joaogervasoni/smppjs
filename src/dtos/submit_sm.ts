import { dateToAbsolute } from '../helpers';
import { DateType, SubmitSm, SubmitSmFunction, SubmitSmParams } from '../types';

const MAX_LENGTH: Record<string, number> = {
    service_type: 6,
    source_addr: 21,
    destination_addr: 21,
    short_message: 256,
    /* Dates */
    schedule_delivery_time: 17,
    validity_period: 17,
};

const DATE_TYPE = {
    schedule_delivery_time: DateType.ABSOLUTE_AND_RELATIVE,
    validity_period: DateType.ABSOLUTE_AND_RELATIVE,
};

export const submitSmDTO: SubmitSmFunction = ({
    destinationAddr,
    dataCoding,
    esmClass,
    systemTypeValue,
    sourceAddrTon,
    sourceAddrNpi,
    sourceAddr,
    destAddrTon,
    destAddrNpi,
    protocolId,
    priorityFlag,
    scheduleDeliveryTime,
    validityPeriod,
    registeredFelivery,
    replaceIfPresentFlag,
    smDefaultMsgId,
    shortMessage,
    tlvs,
}: SubmitSmParams): SubmitSm => {
    const dto: SubmitSm = {
        command: {
            service_type: { type: 'Cstring', value: systemTypeValue || '' },
            source_addr_ton: { type: 'Int8', value: sourceAddrTon || 0 },
            source_addr_npi: { type: 'Int8', value: sourceAddrNpi || 0 },
            source_addr: { type: 'Cstring', value: sourceAddr || '' },
            dest_addr_ton: { type: 'Int8', value: destAddrTon || 0 },
            dest_addr_npi: { type: 'Int8', value: destAddrNpi || 0 },
            destination_addr: { type: 'Cstring', value: destinationAddr },
            esm_class: { type: 'Int8', value: esmClass },
            protocol_id: { type: 'Int8', value: protocolId || 0 },
            priority_flag: { type: 'Int8', value: priorityFlag || 0 },
            registered_delivery: { type: 'Int8', value: registeredFelivery || 0 },
            schedule_delivery_time: { type: 'Cstring', value: scheduleDeliveryTime ? dateToAbsolute(scheduleDeliveryTime) : '' },
            validity_period: { type: 'Cstring', value: validityPeriod ? dateToAbsolute(validityPeriod) : '' },
            replace_if_present_flag: { type: 'Int8', value: replaceIfPresentFlag || 0 },
            data_coding: { type: 'Int8', value: dataCoding },
            sm_default_msg_id: { type: 'Int8', value: smDefaultMsgId || 0 },
            short_message: {
                type: 'Cstring',
                value: shortMessage?.message || Buffer.alloc(0, '', shortMessage?.encoding as BufferEncoding),
                encode: shortMessage?.encoding,
                setLength: true,
            },
        },
        tlvs: {
            message_payload: { type: 'Cstring', value: tlvs?.messagePayload || '', encode: 'ascii' }, // Add to pass encode client
        },
    };

    validateDto(dto);
    return dto;
};

/**
 * Validations:
 * - Add length plus one to add 00 validation
 * - Date absolute and relative
 *
 * Ref: Page 49 - SMPP_v5
 * @param dto SubmitSm
 */
// TODO: Create abstract class.
const validateDto = (dto: SubmitSm): void => {
    const dtoRecord: Record<string, { type: string; value: string | number | Buffer }> = dto.command;
    const validator = Object.entries(MAX_LENGTH);
    const dateValidator = Object.entries(DATE_TYPE);

    for (let index = 0; index < validator.length; index += 1) {
        const fieldName = validator[index][0];

        if (dtoRecord[fieldName].value.toString().length + 1 > validator[index][1]) {
            throw new Error(`${validator[index][0]} need to be minor than ${validator[index][1]}`);
        }
    }

    for (let index = 0; index < dateValidator.length; index += 1) {
        const fieldName = dateValidator[index][0];
        const fieldType = dateValidator[index][1];
        const value = dtoRecord[fieldName].value.toString() as string;

        if (value) {
            if (value.endsWith('R', value.length - 1) && fieldType === DateType.ABSOLUTE) {
                throw new Error(`${validator[index][0]} need to be relative ${validator[index][1]}`);
            }
        }
    }
};
