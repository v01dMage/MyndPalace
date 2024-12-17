//test inspect.js
// test inspectHtml
// run in vr:
//    import('./tests/inspect.test.js');

import { inspectHtml } from 'psi/inspect.js';

import * as xrConsole from 'xr/console.js';

inspectHtml( './inspect.test.js' );

import * as avatar from 'xr/cns.js';

xrConsole.ccout('👀');
