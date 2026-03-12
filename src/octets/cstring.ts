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
        let valueBuffer: Buffer;

        if (typeof value === 'string') {
            valueBuffer = Buffer.from(value, encoding as BufferEncoding);
        } else {
            valueBuffer = value;
        }

        if (setLength) {
            buffer.writeUInt8(valueBuffer.length, offset);
            offset += 1;
        }

        valueBuffer.copy(buffer, offset);

        if (!setLength) {
            buffer[offset + valueBuffer.length] = 0;
        }

        return buffer;
    }

    /**
     * Return size of cstring
     */
    static size(value: string | number | Buffer): number {
        if (typeof value === 'number') {
            return value.toString().length + 1;
        }

        return value.length + 1;
    }

    /**
     * Read a cstring buffer and returns it in string
     */
    static read({ buffer, offset, encoding = 'ascii', length }: { buffer: Buffer; offset: number; encoding?: Encode; length?: number }): string {
        if (length && length > 0) {
            return buffer.toString(encoding, offset, offset + length);
        }

        const MAX_SCAN = 16;
        let scanLength = 0;

        while (scanLength < MAX_SCAN && offset + scanLength < buffer.length && buffer[offset + scanLength]) {
            scanLength += 1;
        }

        if (scanLength < MAX_SCAN || offset + scanLength >= buffer.length) {
            return buffer.toString(encoding, offset, offset + scanLength);
        }

        const nullIndex = buffer.indexOf(0, offset);
        const endIndex = nullIndex === -1 ? buffer.length : nullIndex;
        return buffer.toString(encoding, offset, endIndex);
    }

    /**
     * Convert from utf16be (Big Endian)
     */
    static convertFromUtf16be(buffer: Buffer, offset: number, length: number): string {
        const raw = buffer.subarray(offset, offset + length);

        const swapped = Buffer.alloc(raw.length);

        for (let i = 0; i < raw.length; i += 2) {
            swapped[i] = raw[i + 1];
            swapped[i + 1] = raw[i];
        }

        return swapped.toString('ucs2', 0, swapped.length);
    }

    /**
     * Convert to utf16be (Big Endian)
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
