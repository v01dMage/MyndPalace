//Create a visual representation of
//  the source code
import * as avatar from 'xr/cns.js';
import * as xrConsole from 'xr/console.js';
import { conjurePaper } from 'psi/paper.js'
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

import { htmlTokenStream } from 'parser/htmlTokenStream.js';
import { visualizeHtml } from 'parser/htmlTokenVisualizer.js';


const vso= { scene :  avatar.voyd }
setTimeout(  ()=>{
  conjurePaper( avatar.self.dna.index[1], vso ).position.y= 1.5;
  xrConsole.ccout('heya');

  let ts= htmlTokenStream( avatar.self.dna.index[1] );
  const vizgrp= visualizeHtml( ts );
  vizgrp.position.y= 1;
  vizgrp.position.z= -3;
  avatar.voyd.add( vizgrp );

  //const live= visualizeHtml(htmlTokenStream( document.body.outerHTML ));
  //avatar.self.scene.add( live ); 
} , 15000);

