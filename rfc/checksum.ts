// Used to map characters to values used in checksum calculation
// 0 is 0, 1 is 1, ..., space is 37, Ñ is 38
export const RFC_ALPHABET = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ';

export const VOWELS = 'AEIOU';

const VOWEL_ACCENTS_MAP: {[key: string]: string} = {
  'Á': 'A',
  'É': 'E',
  'Í': 'I',
  'Ó': 'O',
  'Ú': 'U',
  'Ü': 'U',
};

const RFC_BLOCKLIST = [
  'BUEI', 'BUEY', 'CACA', 'CACO', 'CAGA', 'CAGO', 'CAKA', 'CAKO', 'COGE',
  'COJA', 'COJE', 'COJI', 'COJO', 'CULO', 'FETO', 'GUEY', 'JOTO', 'KACA',
  'KACO', 'KAGA', 'KAGO', 'KAKA', 'KOGE', 'KOJO', 'KULO', 'MAME', 'MAMO',
  'MEAR', 'MEAS', 'MEON', 'MION', 'MOCO', 'MULA', 'PEDA', 'PEDO', 'PENE',
  'PUTA', 'PUTO', 'QULO', 'RATA', 'RUIN',
];

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

// Assumes all strings are uppercase
// Date of birth must be in yyyy-mm-dd format
// See https://en.wikipedia.org/wiki/Spanish_naming_customs
export function calculateForPerson(
    fatherSurname: string,
    motherSurname: string,
    givenNames: string,
    dateOfBirth: string,
    doDebug: boolean = false,
  ): string {
  let rfc = '';

  const normalizedFatherSurname = normalize(fatherSurname);

  debug(doDebug, `Normalized father's surname: "${normalizedFatherSurname}"`);

  // Get first letter and the next vowel from fatherSurname
  const firstLetterFromFatherSurname = normalizedFatherSurname[0];

  debug(doDebug, `Adding first letter from father's surname: "${firstLetterFromFatherSurname}"`);

  rfc += firstLetterFromFatherSurname;

  let nextVowelFromFatherSurname = '';

  // Skip first letter which is already part of the RFC
  for (let i = 1; i < normalizedFatherSurname.length; i++) {
    if (VOWELS.indexOf(normalizedFatherSurname[i]) !== -1) {
      nextVowelFromFatherSurname = normalizedFatherSurname[i];

      break;
    }
  }

  debug(doDebug, `Adding next vowel from father's surname: "${nextVowelFromFatherSurname}"`);

  rfc += nextVowelFromFatherSurname;

  const normalizedMotherSurname = normalize(motherSurname);

  debug(doDebug, `Normalized mother's surname: "${normalizedMotherSurname}"`);

  const firstLetterFromMotherSurname = normalizedMotherSurname[0];

  debug(doDebug, `Adding first letter from mother's surname: "${firstLetterFromMotherSurname}"`);

  rfc += firstLetterFromMotherSurname;

  const normalizedGivenNames = normalize(givenNames);

  debug(doDebug, `Normalized given names: "${normalizedGivenNames}"`);

  const firstLetterFromGivenNames = normalizedGivenNames[0];

  debug(doDebug, `Adding first letter from given names: "${firstLetterFromGivenNames}"`);

  rfc += firstLetterFromGivenNames;

  debug(doDebug, `First four letters of rfc are: "${rfc}"`);

  // By now rfc must be 4-characters long, we need to check the blocklist entries
  if (RFC_BLOCKLIST.indexOf(rfc) !== -1) {
    rfc = rfc.substring(0, 3) + 'X';

    debug(doDebug, `rfc found in the "inconvenient words" blocklist, changing last letter to X: "${rfc}"`);
  }

  return rfc;
}

// Assumes dirtyString is uppercase
function normalize(unnormalizedString: string = ''): string {
  let normalizedString: string = '';

  for (let i = 0; i < unnormalizedString.length; i++) {
    const currentChar = unnormalizedString[i];

    if (VOWEL_ACCENTS_MAP[currentChar]) {
      normalizedString += VOWEL_ACCENTS_MAP[currentChar];
    } else {
      normalizedString += currentChar;
    }
  }

  return normalizedString;
}

function debug(enabled: boolean, ...args: any[]): void {
  if (enabled) {
    console.debug.apply(null, args);
  }
}
