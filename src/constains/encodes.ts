import { Encode } from '../types';

/**
 * SMPP data_coding values to Buffer encoding mapping
 *
 * TODO: Some encodes are as fallback, new encodes will be implemented in the future.
 *
 * ref: Documentation SMPP_v5 - 4.7.7 data_coding
 */
const encodesName: Record<number, Encode> = {
    0: 'ascii', // GSM 7-bit Default Alphabet (GSM 03.38)
    1: 'ascii', // IA5 (CCITT T.50)/ASCII (ANSI X3.4)
    2: 'binary', // Octet unspecified (8-bit binary)
    3: 'latin1', // Latin 1 (ISO-8859-1)
    4: 'binary', // Octet unspecified (8-bit binary)
    5: 'ascii', // JIS (X 0208-1990) - fallback to ASCII
    6: 'latin1', // Cyrillic (ISO-8859-5) - fallback to latin1
    7: 'latin1', // Latin/Hebrew (ISO-8859-8) - fallback to latin1
    8: 'ucs2', // UCS2 (ISO/IEC-10646) - Unicode
    9: 'latin1', // Pictogram Encoding - fallback to latin1
    10: 'ascii', // ISO-2022-JP (Music Codes) - fallback to ASCII
    13: 'ascii', // Extended Kanji JIS (X 0212-1990) - fallback to ASCII
    14: 'latin1', // KS C 5601 (Korean) - fallback to latin1

    // Flash SMS values, same encoding as base value but with 240 value.
    240: 'ascii', // Flash + GSM 7-bit
    241: 'ascii', // Flash + IA5/ASCII
    242: 'binary', // Flash + Octet unspecified
    243: 'latin1', // Flash + Latin 1
    244: 'binary', // Flash + Octet unspecified
    245: 'ascii', // Flash + JIS
    246: 'latin1', // Flash + Cyrillic
    247: 'latin1', // Flash + Latin/Hebrew
    248: 'ucs2', // Flash + UCS2
    249: 'latin1', // Flash + Pictogram
    250: 'ascii', // Flash + ISO-2022-JP
    253: 'ascii', // Flash + Extended Kanji JIS
    254: 'latin1', // Flash + KS C 5601
};

export { encodesName };
