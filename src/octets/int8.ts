/**
 * Octet size 1
 */
class Int8 {
    /**
     * Write a int8 in a buffer
     */
    static write({ buffer, value, offset }: { buffer: Buffer; value: number; offset: number }): Buffer {
        let newBuffer = buffer;
        newBuffer.writeUInt8(value || 0, offset);

        return newBuffer;
    }

    /**
     * Return size of int8
     */
    static size() {
        return 1;
    }
}

export { Int8 };
