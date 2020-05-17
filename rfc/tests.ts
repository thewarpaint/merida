import {checksum} from './checksum.ts';

// Person RFCs are 13 characters long
console.assert(checksum('GODE561231GR8', true) === '8');
