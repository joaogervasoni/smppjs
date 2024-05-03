class Cstring {
    static write({ buffer, value, offset }: { buffer: Buffer; value: string; offset: number }): Buffer {
        let newBuffer = buffer;
        let valueBuffer = Buffer.from(value, 'ascii');

        valueBuffer.copy(buffer, offset);
        newBuffer[offset + valueBuffer.length] = 0;

        return newBuffer;
    }

    static size(value: string | number) {
        if (typeof value === 'number') {
            return value.toString().length + 1;
        }

        return value.length + 1;
    }

    static read({ buffer, offset }: { buffer: Buffer; offset: number }) {
        let length = 0;

        while (buffer[offset + length]) {
            length++;
        }

        return buffer.toString('ascii', offset, offset + length);
    }
}

export { Cstring };
