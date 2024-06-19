//Create a visual representation of
//  the source code

import { conjurePaper } from 'psi/cantrip/paper.js'

const src= document.body.documentElement.outerHTML;

let page= conjurePaper( src );
page.position.y= 1;
page.rotateX( -Math.PI/8 );
