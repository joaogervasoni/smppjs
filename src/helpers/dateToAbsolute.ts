/**
 * Format to absolute date base YYMMDDhhmmsstnn+
 *
 * Ref: Page 132 - Section 4.7.23.4 - SMPP_v5
 * NOTE: If you need precision or use 00+ for legacy smpp, pass the string in the date field DTO, and the code will not pass here.
 * @param date Date - Date to formate
 * @returns String formated to date absolute
 */
const dateToAbsolute = (date: Date | string): string => {
    if (typeof date === 'string') return date;
    const formattedDate = date.toISOString().replace(/\D/g, '').slice(2);
    return formattedDate + '+';
};

export { dateToAbsolute };
