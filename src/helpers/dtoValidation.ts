import { DTO, DateType } from '../types';

/**
 * Validations:
 * - Add length plus one to add 00 validation
 * - Date absolute and relative
 *
 * Ref: Page 49 - SMPP_v5
 * @param dto DTO
 */
export const dtoValidation = ({ dto, MAX_LENGTH, DATE_TYPE }: { dto: DTO; MAX_LENGTH: Record<string, number>; DATE_TYPE: Record<string, DateType> }): void => {
    const dtoRecord: Record<string, { type: string; value: string | number | Buffer }> = dto.command;
    const validator = Object.entries(MAX_LENGTH);
    const dateValidator = Object.entries(DATE_TYPE);

    for (let index = 0; index < validator.length; index += 1) {
        const fieldName = validator[index][0];

        if (dtoRecord[fieldName].value && dtoRecord[fieldName].value.toString().length + 1 > validator[index][1]) {
            throw new Error(`${validator[index][0]} need to be minor than ${validator[index][1]}`);
        }
    }

    for (let index = 0; index < dateValidator.length; index += 1) {
        const fieldName = dateValidator[index][0];
        const fieldType = dateValidator[index][1];

        if (dtoRecord[fieldName].value) {
            const value = dtoRecord[fieldName].value.toString() as string;

            if (value) {
                if (value.endsWith('R', value.length - 1) && fieldType === DateType.ABSOLUTE) {
                    throw new Error(`${validator[index][0]} need to be relative ${validator[index][1]}`);
                }
            }
        }
    }
};
