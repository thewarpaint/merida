import {calculateForPerson, checksum} from './checksum.ts';

// Company RFCs are 12 characters long
assertChecksum('SPM1410037E8', '8');

// Person RFCs are 13 characters long
assertChecksum('GODE561231GR8', '8');

// Incomplete person RFC tests
assertRfc('LÓPEZ', 'OBRADOR', 'ANDRÉS MANUEL', '1940-01-01', 'LOOA');
assertRfc('PEÑA', 'NIETO', 'ENRIQUE', '1966-07-20', 'PENX');

function assertChecksum(rfc: string, expectedChecksum: string) {
  const actualChecksum = checksum(rfc);

  console.assert(actualChecksum === expectedChecksum,
    `Checksum for ${rfc} was expected to be "${expectedChecksum}", but "${actualChecksum}" was found`);
}

function assertRfc(
  fatherSurname: string,
  motherSurname: string,
  givenNames: string,
  dateOfBirth: string,
  expectedRfc: string,
): void {
  const actualRfc = calculateForPerson(fatherSurname, motherSurname, givenNames, dateOfBirth, true);

  console.assert(actualRfc === expectedRfc,
    `RFC for ${fatherSurname} ${motherSurname} ${givenNames} was expected to be "${expectedRfc}", ` +
    `but "${actualRfc}" was found`);
}
