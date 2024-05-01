/**
 * Octet size 1
 */
class Int8 {
    static write({ buffer, value, offset }: { buffer: Buffer; value: number; offset: number }): Buffer {
        let newBuffer = buffer;
        newBuffer.writeUInt8(value || 0, offset);

        return newBuffer;
    }

    static size() {
        return 1;
    }
}

export { Int8 };
