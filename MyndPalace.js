//Main entry to vr lab

import * as avatar from 'xr/cns.js'; 
import 'xr/console.js';
import { cantrips } from 'my/cantrips/miscButtons.js';
import { paintStarfield } from 'psi/cantrip/starfield.js';
import * as THREE from 'three';
import { conjurePaper } from 'psi/cantrip/paper.js'
import 'psi/cantrip/introspection.js'

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


fetch(import.meta.url).then( res=>{
  res.text().then( txt=>{} );
  avatar.self.console.cout( txt );
  const p2= conjurePaper( txt );
  p2.position.x= .5;
  p2.position.y= 1;
});

//have fun



