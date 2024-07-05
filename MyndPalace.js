//Main entry to vr lab

import * as avatar from 'xr/cns.js'; 
import 'xr/console.js';
import { cantrips } from 'xr/consoleButtons.js';
import { paintStarfield } from 'psi/starfield.js';
import * as THREE from 'three';
import { conjurePaper } from 'psi/paper.js';
import 'psi/introspection.js';
avatar.self.dnaStore(import.meta.url);

avatar.self.cantrips= cantrips;

if(localStorage.autoRun){
  avatar.self.console.arun(localStorage.autoRun).then(
    res=>{ avatar.self.console.cout(res); }
  );
} else {
  avatar.self.cantrips.cast('hello');
}

let repaint= ()=>{
  let bg= paintStarfield(8000,4000,3000);
  let starfield= new THREE.Texture( bg );
  starfield.needsUpdate= true;
  starfield.mapping = THREE.EquirectangularReflectionMapping;
  starfield.colorSpace = THREE.SRGBColorSpace;
  avatar.self.scene.background= starfield;
}
let cycle= ()=>{
  setTimeout( repaint, 30000 );
  setTimeout( cycle, 30000 );
}
cycle();

//have fun



