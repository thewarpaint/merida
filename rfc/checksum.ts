// Used to map characters to values used in checksum calculation
// 0 is 0, 1 is 1, ..., space is 37, Ñ is 38
export const RFC_ALPHABET = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ';

// Assumes rfc is already in compact format and all uppercase
export function checksum(rfc: string): string {
  // Drop the checksum character (last one)
  const rfcWithoutChecksum = rfc.substring(0, rfc.length - 1);

  // Add spaces at the beginning of the string to make it 12-chars long
  // Only necessary for corporations
  const paddedRfc = rfcWithoutChecksum.padStart(12);

  const sum = paddedRfc
    .split('')
    .reduce((sumAcc: number, char: string, i: number) => {
      return sumAcc + (
        // The position of the current character in the RFC_ALPHABET lookup table
        RFC_ALPHABET.indexOf(char) *
        // The position of the current character in the string, from right to left, plus one
        (13 - i)
      );
    }, 0);

  // We calculate sum modulo 11, then subtract that from 11
  const checksumPosition = 11 - (sum % 11);

  return RFC_ALPHABET[checksumPosition];
}

console.assert(checksum('GODE561231GR8') === '8');
