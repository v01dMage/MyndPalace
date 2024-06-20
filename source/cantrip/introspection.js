//Create a visual representation of
//  the source code
import * as avatar from 'xr/cns.js';
import { conjurePaper } from 'psi/cantrip/paper.js'
avatar.self.dnaStore(import.meta.url);

let page= conjurePaper( avatar.self.dna.length );
page.position.y= 1;
page.rotateX( -Math.PI/4 );
