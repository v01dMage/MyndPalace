//Main entry to vr lab

import * as avatar from 'xr/cns.js'; 
import 'xr/console.js';
import { cantrips } from 'my/cantrips/miscButtons.js';
import { paintStarfield } from 'psi/cantrip/starfield.js';
import * as THREE from 'three';
import { conjurePaper } from 'psi/cantrip/paper.js'
import 'psi/cantrip/introspection.js'

avatar.self.dnaStore(import.meta.url);
avatar.self.dnaStore('./README.MD');
avatar.self.dnaStore('./LICENSE');

avatar.self.cantrips= cantrips;

if(localStorage.autoRun){
  avatar.self.console.arun(localStorage.autoRun).then(
    res=>{ avatar.self.console.cout(res); }
  );
} else {
  avatar.self.cantrips.cast('hello');
}

let bg= paintStarfield(2048,2048,2000);
let starfield= new THREE.Texture( bg );
starfield.needsUpdate= true;
starfield.mapping = THREE.EquirectangularReflectionMapping;
starfield.colorSpace = THREE.SRGBColorSpace;
avatar.self.scenes[0].background= starfield;

function dnaout(){
for( let gene in avatar.self.dna ){
 if( gene != 'index' ){
  avatar.self.console.cout(
    avatar.self.dna[gene][0]+'<br>-----<br>'+
    avatar.self.dna[gene][1].substring(0,10)+
    '<br>.....<br>'
  );
 }
}}
dnaout();
setTimeout( dnaout, 10000 );

//have fun



