const commandsParams: Record<number, Record<string, { type: 'Cstring' | 'Int8'; value: string | number }>> = {
    // Command params to test
    0x00000009: {
        system_id: { type: 'Cstring', value: 'test1' },
        password: { type: 'Cstring', value: '' },
        system_type: { type: 'Cstring', value: '' },
        interface_version: { type: 'Int8', value: 80 },
        addr_ton: { type: 'Int8', value: 0 },
        addr_npi: { type: 'Int8', value: 0 },
        address_range: { type: 'Cstring', value: '' },
    },
};

export { commandsParams };
