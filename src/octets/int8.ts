/**
 * Octet size 1
 */
class Int8 {
    /**
     * Write a int8 in a buffer
     */
    static write({ buffer, value, offset }: { buffer: Buffer; value: number; offset: number }): Buffer {
        const newBuffer = buffer;
        newBuffer.writeUInt8(value || 0, offset);

        return newBuffer;
    }

    /**
     * Read a int8 and returns it
     */
    static read({ buffer, offset }: { buffer: Buffer; offset: number }): number {
        return buffer.readUInt8(offset);
    }

    /**
     * Return size of int8
     */
    static size() {
        return 1;
    }
}

export { Int8 };
