import { DTO, DateType } from '../types';

/**
 * Validations:
 * - Add length plus one to add 00 validation
 * - Date absolute and relative
 *
 * Ref: Page 49 - SMPP_v5
 * @param dto DTO
 */
export const dtoValidation = ({
    dto,
    MAX_LENGTH,
    DATE_TYPE,
    REQUIRED,
}: {
    dto: DTO;
    MAX_LENGTH?: Record<string, number>;
    DATE_TYPE?: Record<string, DateType>;
    REQUIRED?: string[];
}): void => {
    const dtoRecord: Record<string, { type: string; value: string | number | Buffer }> = dto.command;

    if (REQUIRED) {
        for (let index = 0; index < REQUIRED.length; index += 1) {
            const fieldName = REQUIRED[index];
            const value = dtoRecord[fieldName].value;

            if (value === undefined || value === null) {
                throw new Error(`${fieldName} is required`);
            }
        }
    }

    if (MAX_LENGTH) {
        const validator = Object.entries(MAX_LENGTH);

        for (let index = 0; index < validator.length; index += 1) {
            const fieldName = validator[index][0];

            if (dtoRecord[fieldName].value && dtoRecord[fieldName].value.toString().length + 1 > validator[index][1]) {
                throw new Error(`${validator[index][0]} need to be minor than ${validator[index][1]}`);
            }
        }
    }

    if (DATE_TYPE) {
        const dateValidator = Object.entries(DATE_TYPE);

        for (let index = 0; index < dateValidator.length; index += 1) {
            const fieldName = dateValidator[index][0];
            const fieldType = dateValidator[index][1];

            if (dtoRecord[fieldName].value) {
                const value = dtoRecord[fieldName].value.toString() as string;

                if (value) {
                    if (value.endsWith('R', value.length - 1) && fieldType === DateType.ABSOLUTE) {
                        throw new Error(`${dateValidator[index][0]} need to be relative ${dateValidator[index][1]}`);
                    }
                }
            }
        }
    }
};
