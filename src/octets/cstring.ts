/**
 * Octet size 'x' + 1
 * Value x = string chars
 */
class Cstring {
    /**
     * Write a cstring in a buffer
     */
    static write({
        buffer,
        value,
        offset,
        encoding = 'ascii',
    }: {
        buffer: Buffer;
        value: string | Buffer;
        offset: number;
        encoding?: 'ascii' | 'latin1' | 'usc2';
    }): Buffer {
        let newBuffer = buffer;
        let valueBuffer: Buffer;

        if (encoding) {
			buffer.writeUInt8(value.length, offset++);
        }

        if (typeof value === 'string') {
            valueBuffer = Buffer.from(value, encoding as BufferEncoding);
        } else {
            valueBuffer = value;
        }

        valueBuffer.copy(buffer, offset);
        newBuffer[offset + valueBuffer.length] = 0;

        return newBuffer;
    }

    /**
     * Return size of cstring
     */
    static size(value: string | number | Buffer) {
        if (typeof value === 'number') {
            return value.toString().length + 1;
        }

        return value.length + 1;
    }

    /**
     * Read a cstring buffer and returns it in string
     */
    static read({ buffer, offset }: { buffer: Buffer; offset: number }) {
        let length = 0;

        while (buffer[offset + length]) {
            length++;
        }

        return buffer.toString('ascii', offset, offset + length);
    }
}

export { Cstring };
