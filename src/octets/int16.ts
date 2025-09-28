/**
 * Octet size 2
 */
class Int16 {
    /**
     * Write a int16 in a buffer
     */
    static write({ buffer, value, offset }: { buffer: Buffer; value: number; offset: number }): Buffer {
        buffer.writeUInt16BE(value || 0, offset);

        return buffer;
    }

    /**
     * Return size of int16
     */
    static size(): number {
        return 2;
    }
}

export { Int16 };
