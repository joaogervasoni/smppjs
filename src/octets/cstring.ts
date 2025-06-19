import { Encode } from '../types';

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
        setLength = false,
    }: {
        buffer: Buffer;
        value: string | Buffer;
        offset: number;
        setLength?: boolean;
        encoding?: Encode;
    }): Buffer {
        const newBuffer = buffer;
        let valueBuffer: Buffer;

        if (typeof value === 'string') {
            valueBuffer = Buffer.from(value, encoding as BufferEncoding);
        } else {
            valueBuffer = value;
        }

        if (setLength) {
            buffer.writeUInt8(valueBuffer.length, offset++);
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

    /**
     * Converto to utf16be (Big Endian)
     */
    static convertToUtf16be(value: Buffer | string): Buffer {
        if (typeof value === 'string') {
            value = Buffer.from(value, 'ucs2');
        }

        const utf16beBuffer = Buffer.alloc(value.length);

        for (let i = 0; i < value.length; i += 2) {
            utf16beBuffer[i] = value[i + 1];
            utf16beBuffer[i + 1] = value[i];
        }

        return utf16beBuffer;
    }
}

export { Cstring };
