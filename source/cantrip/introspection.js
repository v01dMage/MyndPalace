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

import { htmlTokenStream } from 'psi/parser/htmlTokenStream.js'
import { visualizeHtml } from 'psi/parser/htmlTokenVisualizer.js'

const vso= { scene :  avatar.self.scenes[0] }
setTimeout(  ()=>{
  conjurePaper( avatar.self.dna.index[1], vso ).position.y= 1.5;
    avatar.self.console.cout('heya');
  try{
  let ts= htmlTokenStream( avatar.self.dna.index[1] );
  avatar.self.console.cout(ts);
  let tss= ts.reduce( (out, ta)=>{
    out+= ta.join(', ')+ '\n';
    return out;
  }, "" );
  conjurePaper( typeof ts, vso).position.y= 2;
}catch(err){
  avatar.self.console.cout(err.toString());
}

  //avatar.voyd.add( visualizeHtml( ts ) );
} , 15000);

