/**
 * Parsed UDH concatenation metadata
 */
export interface ParsedUdhConcat {
    udhLength: number;
    concatIei: number;
    referenceNumber: number;
    totalParts: number;
    partNumber: number;
}

/**
 * Parse concatenated message UDH from short_message buffer
 * Supports IEI 0x00 (8-bit ref) and 0x08 (16-bit ref)
 * @param shortMessageRaw - Raw short_message buffer containing UDH
 * @returns Parsed UDH metadata or null if no concatenation IE found
 */
export function parseConcatenatedUdh(shortMessageRaw: Buffer): ParsedUdhConcat | null {
    if (shortMessageRaw.length < 1) {
        return null;
    }

    const udhLength = shortMessageRaw[0] + 1;

    if (udhLength <= 1 || udhLength > shortMessageRaw.length) {
        return null;
    }

    let offset = 1;

    while (offset + 1 < udhLength) {
        const iei = shortMessageRaw[offset];
        const iedl = shortMessageRaw[offset + 1];
        const ieDataStart = offset + 2;
        const ieDataEnd = ieDataStart + iedl;

        if (ieDataEnd > udhLength) {
            return null;
        }

        if (iei === 0x00 && iedl === 3) {
            return {
                udhLength,
                concatIei: iei,
                referenceNumber: shortMessageRaw[ieDataStart],
                totalParts: shortMessageRaw[ieDataStart + 1],
                partNumber: shortMessageRaw[ieDataStart + 2],
            };
        }

        if (iei === 0x08 && iedl === 4) {
            return {
                udhLength,
                concatIei: iei,
                referenceNumber: shortMessageRaw.readUInt16BE(ieDataStart),
                totalParts: shortMessageRaw[ieDataStart + 2],
                partNumber: shortMessageRaw[ieDataStart + 3],
            };
        }

        offset = ieDataEnd;
    }

    return null;
}
