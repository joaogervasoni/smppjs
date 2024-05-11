const dateToAbsolute = (date: Date): string => {
    const formattedDate = date.toISOString().replace(/\D/g, '').slice(2);
    return formattedDate + '+';
};

export { dateToAbsolute };
