import {calculateForPerson, checksum} from './index.ts';

// Company RFCs are 12 characters long
assertChecksum('SPM1410037E8', '8');

// Person RFCs are 13 characters long
assertChecksum('GODE561231GR8', '8');

// Incomplete person RFC tests
assertRfc('LÓPEZ', 'OBRADOR', 'ANDRÉS MANUEL', '1940-01-01', 'LOOA');
assertRfc('PEÑA', 'NIETO', 'ENRIQUE', '1966-07-20', 'PENX');
assertRfc('SAN MARTÍN', 'DÁVALOS', 'DOLORES', '', 'SADD');
assertRfc('SÁNCHEZ DE LA BARQUERA', 'GÓMEZ', 'MARIO', '', 'SAGM');
assertRfc('JIMÉNEZ', 'PONCE DE LEÓN', 'ANTONIO', '', 'JIPA');
assertRfc('DE LA PEÑA', 'RAMÍREZ', 'CARMEN', '', 'PERC');
assertRfc('SÁNCHEZ', 'DE LOS COBOS', 'MARIO', '', 'SACM');
assertRfc('GONZÁLEZ', 'Y DURÁN', 'ROBERTO', '', 'GODR');
assertRfc('DEL VALLE', 'MARTÍNEZ', 'JUAN', '', 'VAMJ');
assertRfc('MARTÍNEZ', '', 'JUAN', '', 'MAJU');
assertRfc('', 'ZAFRA', 'GERARDA', '', 'ZAGE');

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
  const actualRfc = calculateForPerson(fatherSurname, motherSurname, givenNames, dateOfBirth);

  console.assert(actualRfc === expectedRfc,
    `RFC for ${fatherSurname} ${motherSurname} ${givenNames} was expected to be "${expectedRfc}", ` +
    `but "${actualRfc}" was found`);
}
