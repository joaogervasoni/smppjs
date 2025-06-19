/**
 * Octet size 2
 */
class Int16 {
    /**
     * Write a int16 in a buffer
     */
    static write({ buffer, value, offset }: { buffer: Buffer; value: number; offset: number }): Buffer {
        const newBuffer = buffer;
        newBuffer.writeUInt16BE(value || 0, offset);

        return newBuffer;
    }

    /**
     * Return size of int16
     */
    static size() {
        return 2;
    }
}

export { Int16 };
