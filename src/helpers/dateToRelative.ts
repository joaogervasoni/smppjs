/**
 * Format to relative date base YYMMDDhhmmssCCCR
 *
 * Pass the future date to this function, and will be returned the time to achieve this date.
 *
 * Ref: Page 133 - Section 4.7.23.5 - SMPP_v5
 *
 * NOTE: If you need precision or use 000B for legacy smpp, pass the string in the date field DTO, and the code will not pass here.
 * @param date Date - Date to formate
 * @returns String formated to date relative
 */
const dateToRelative = (futureDate: Date): string => {
    const now = new Date();

    if (futureDate <= now) return '000000000000R';

    let years = futureDate.getUTCFullYear() - now.getUTCFullYear();
    let months = futureDate.getUTCMonth() - now.getUTCMonth();
    let days = futureDate.getUTCDate() - now.getUTCDate();
    let hours = futureDate.getUTCHours() - now.getUTCHours();
    let minutes = futureDate.getUTCMinutes() - now.getUTCMinutes();
    let seconds = futureDate.getUTCSeconds() - now.getUTCSeconds();
    let milliseconds = futureDate.getUTCMilliseconds() - now.getUTCMilliseconds();

    if (milliseconds < 0) {
        milliseconds += 1000;
        seconds--;
    }

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }

    if (minutes < 0) {
        minutes += 60;
        hours--;
    }

    if (hours < 0) {
        hours += 24;
        days--;
    }

    if (days < 0) {
        const prevMonth = new Date(now.getUTCFullYear(), now.getUTCMonth(), 0);
        days += prevMonth.getUTCDate();
        months--;
    }

    if (months < 0) {
        months += 12;
        years--;
    }

    const pad = (n: number, len = 2) => n.toString().padStart(len, '0');
    const pad3 = (n: number) => n.toString().padStart(3, '0');

    return pad(years) + pad(months) + pad(days) + pad(hours) + pad(minutes) + pad(seconds) + pad3(Math.floor(milliseconds / 10)) + 'R';
};

export { dateToRelative };
