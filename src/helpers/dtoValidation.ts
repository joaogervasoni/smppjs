import { DTO, DTOCommand, DateType } from '../types';

// TODO: Add to future DTO class abstract.
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
    const dtoRecord: Record<string, DTOCommand> = dto.command;
    const dtoRecordEntries = Object.entries(dtoRecord);
    const requiredFields = [...(REQUIRED || [])];

    const validateRequiredFields = (fieldName: string, value: unknown): void => {
        if (value !== undefined && value !== null) {
            const fieldIndex = requiredFields.indexOf(fieldName);

            if (fieldIndex !== -1) {
                requiredFields.splice(fieldIndex, 1);
            }
        }
    };

    const validateMaxLength = (fieldName: string, value: unknown, MAX_LENGTH: Record<string, number>): void => {
        const maxLength = MAX_LENGTH[fieldName];

        if (value && value.toString().length + 1 > maxLength) {
            throw new Error(`${fieldName} need to be minor than ${maxLength}`);
        }
    };

    const validateDateType = (fieldName: string, value: unknown, DATE_TYPE: Record<string, DateType>): void => {
        const dateType = DATE_TYPE[fieldName];

        if (value) {
            const stringValue = value.toString() as string;

            if (stringValue) {
                if (stringValue.endsWith('R', stringValue.length - 1) && dateType === DateType.ABSOLUTE) {
                    throw new Error(`${fieldName} need to be relative ${dateType}`);
                }
            }
        }
    };

    for (let index = 0; index < dtoRecordEntries.length; index += 1) {
        const dto = dtoRecordEntries[index];
        const fieldName = dto[0];
        const value = dto[1].value;
        const type = dto[1].type;

        if (type === 'Array' && value) {
            const subDtoRecordEntries = Object.entries(value as Record<string, DTOCommand>[]);

            for (let index = 0; index < subDtoRecordEntries.length; index += 1) {
                const subElement = subDtoRecordEntries[index];

                if (MAX_LENGTH) {
                    validateMaxLength(subElement[0], subElement[1].value, MAX_LENGTH);
                }

                if (DATE_TYPE) {
                    validateDateType(subElement[0], subElement[1].value, DATE_TYPE);
                }

                if (REQUIRED) {
                    validateRequiredFields(subElement[0], subElement[1].value);
                }
            }
        }

        if (MAX_LENGTH) {
            validateMaxLength(fieldName, value, MAX_LENGTH);
        }

        if (DATE_TYPE) {
            validateDateType(fieldName, value, DATE_TYPE);
        }

        if (REQUIRED) {
            validateRequiredFields(fieldName, value);
        }
    }

    if (requiredFields.length > 0) {
        throw new Error(`Missing required fields: ${requiredFields.join(', ')}`);
    }
};
