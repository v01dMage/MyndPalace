//Create a visual representation of
//  the source code
import * as avatar from 'xr/cns.js';
import { conjurePaper } from 'psi/cantrip/paper.js'

//const src= document.documentElement.outerHTML;

let page= conjurePaper( avatar.self.dna );
page.position.y= 1;
page.rotateX( -Math.PI/4 );
