//Create a visual representation of
//  the source code

import { conjurePaper } from 'psi/cantrip/paper.js'

const src= document.body.outerHTML;

let page= conjurePaper( src );
page.rotateX( -Math.PI/8 )