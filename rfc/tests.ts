import {checksum} from './checksum.ts';

// Company RFCs are 12 characters long
assertChecksum('SPM1410037E8', '8');

// Person RFCs are 13 characters long
assertChecksum('GODE561231GR8', '8');

function assertChecksum(rfc: string, expectedChecksum: string) {
  const actualChecksum = checksum(rfc);

  console.assert(actualChecksum === expectedChecksum,
    `Checksum for ${rfc} was expected to be "${expectedChecksum}", but "${actualChecksum}" was found`);
}
