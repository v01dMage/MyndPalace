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

let repaint= (canvas)=>{
  let bg= new THREE.Texture( canvas );
  bg.needsUpdate= true;
  bg.mapping = THREE.EquirectangularReflectionMapping;
  bg.colorSpace = THREE.SRGBColorSpace;
  avatar.self.scene.background= bg;
}
repaint( paintStarfield(800,400,3000) );

//have fun



