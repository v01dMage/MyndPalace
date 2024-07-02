//Create a visual representation of
//  the source code
import * as avatar from 'xr/cns.js';
import { conjurePaper } from 'psi/cantrip/paper.js'
avatar.self.dnaStore(import.meta.url);

setTimeout( ()=>{
let list="";
let page;
let xi= 1;
let vs= { scene : avatar.voyd, height: 1 };
for( let gene in avatar.self.dna ){
  list+= avatar.self.dna[gene][0]+'\n\n';
  page= conjurePaper( avatar.self.dna[gene][1], vs );
  page.position.y= 1;
  page.position.x= xi++* .51;
  page.rotateX( -0.785 );
}
page= conjurePaper( list, vs );
page.position.y= 1;
page.rotateX( -Math.PI/4 );

}, 13000 );

import { htmlTokenStream } from 'psi/parser/htmlTokenStream.js';
import { visualizeHtml } from 'psi/parser/htmlTokenVisualizer.js';


const vso= { scene :  avatar.self.scenes[0] }
setTimeout(  ()=>{
  conjurePaper( avatar.self.dna.index[1], vso ).position.y= 1.5;
    avatar.self.console.cout('heya');
  try{
  let ts= htmlTokenStream( avatar.self.dna.index[1] );
  let tss= ts.reduce( (out, to)=>{
    out+= to.type+', '+ to.text+ '<br>';
    return out;
  }, "" );
  avatar.self.console.cout(tss);
  conjurePaper( "🦄💨", vso).position.y= 2;

  const vizgrp= visualizeHtml( ts );
  vizgrp.position.y= 1;
  vizgrp.position.z= -3;
  avatar.self.console.cout( vizgrp );
  avatar.self.scenes[0].add( vizgrp );
} catch(err){
  avatar.self.console.cout( err.toString() );
}
} , 15000);

