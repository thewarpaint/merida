# Mérida

## Getting started

1. [Install deno](https://deno.land/#installation)

1. Import and use the methods in your TS files:

```ts
import {checksum} from './rfc/index.ts';

const checksumDigit = checksum('SPM1410037E8');
```

## Testing

Run the tests:

```sh
deno run ./rfc/tests.ts
```

### RFC

RFC ("Registro Federal de Contribuyentes") is the Mexican tax id number.

- https://www.infomex.org.mx/jspsi/documentos/2005/seguimiento/06101/0610100162005_065.doc
- https://portalsat.plataforma.sat.gob.mx/ConsultaRFC/
- https://github.com/arthurdejong/python-stdnum/blob/master/stdnum/mx/rfc.py

#### Backlog

- [] Add date of birth logic
- [] Add homonymy logic
- [] Add checksum logic
