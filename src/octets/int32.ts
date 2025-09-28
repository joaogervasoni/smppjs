/**
 * Octet size 4
 */
class Int32 {
    /**
     * Write a int32 in a buffer
     */
    static write({ buffer, value, offset }: { buffer: Buffer; value: number; offset: number }): Buffer {
        buffer.writeUInt32BE(value || 0, offset);

        return buffer;
    }

    /**
     * Read a int32 and returns it
     */
    static read({ buffer, offset }: { buffer: Buffer; offset: number }): number {
        return buffer.readUInt32BE(offset);
    }

    /**
     * Return size of int32
     */
    static size(): number {
        return 4;
    }
}

export { Int32 };
