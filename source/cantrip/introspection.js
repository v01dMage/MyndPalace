//Create a visual representation of
//  the source code
import * as avatar from 'xr/cns.js';
import { conjurePaper } from 'psi/cantrip/paper.js'
avatar.self.dnaStore(import.meta.url);

setTimeout( ()=>{
let list="";
for( let gene in avatar.self.dna ){
  list+= avatar.self.dna[gene][0]+'\n\n';
}
let page= conjurePaper( list, { scene :  avatar.voyd });
page.position.y= 1;
page.rotateX( -Math.PI/4 );

}, 13000 );