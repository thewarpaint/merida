import {checksum} from './checksum.ts';

// Company RFCs are 12 characters long
console.assert(checksum('SPM1410037E8') === '8');

// Person RFCs are 13 characters long
console.assert(checksum('GODE561231GR8') === '8');
