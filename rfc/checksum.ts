// Used to map characters to values used in checksum calculation
// 0 is 0, 1 is 1, ..., space is 37, Ñ is 38
export const RFC_ALPHABET = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ';

// Assumes rfc is already in compact format and all uppercase
export function checksum(rfc: string, doDebug: boolean = false): string {
  debug(doDebug, `Passed RFC: ${rfc}`);

  // Drop the checksum character (last one)
  const rfcWithoutChecksum = rfc.substring(0, rfc.length - 1);

  debug(doDebug, `RFC without checksum: ${rfcWithoutChecksum}`);

  // Add spaces at the beginning of the string to make it 12-chars long
  // Only necessary for corporations
  const paddedRfc = rfcWithoutChecksum.padStart(12);

  debug(doDebug, `RFC with padding: ${paddedRfc}`);

  const sum = paddedRfc
    .split('')
    .reduce((acc: number, char: string, i: number) => {
      // The value of the current character in the RFC_ALPHABET lookup table
      const lookupValue = RFC_ALPHABET.indexOf(char);

      // The position of the current character in the string, from right to left, plus one
      const reversePositionPlusOne = (13 - i);

      const accDelta = lookupValue * reversePositionPlusOne;
      const newAcc = acc + accDelta;

      debug(doDebug, `Processing character "${char}" in position: ${i}`);
      debug(doDebug, `  Lookup value: ${lookupValue} times ${reversePositionPlusOne} (13 - ${i}) equals ${accDelta}`);
      debug(doDebug, `  Old sum value ${acc} plus ${accDelta} equals new sum value ${newAcc}`);

      return newAcc;
    }, 0);

  // We calculate sum modulo 11...
  const sumMod11 = sum % 11;

  debug(doDebug, `Sum ${sum} modulo 11 equals ${sumMod11}`);

  // ... then subtract that from 11 to get the position of the checksum character in the alphabet
  const checksumPosition = 11 - sumMod11;

  debug(doDebug, `11 minus sum modulo 11 (${sumMod11}) equals ${checksumPosition}`);

  // We look up the checksum character in the alphabet and return it
  const checksumChar = RFC_ALPHABET[checksumPosition];

  debug(doDebug, `The checksum character is the element of the alphabet ` +
    `in the position ${checksumPosition}: "${checksumChar}"`);

  return checksumChar;
}

function debug(enabled: boolean, ...args: any[]) {
  if (enabled) {
    console.debug.apply(null, args);
  }
}
