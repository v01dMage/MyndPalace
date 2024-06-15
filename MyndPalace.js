//Main entry to vr lab

import * as avatar from 'xr/cns.js'; 
import 'xr/console.js';
import { cantrips } from 'my/cantrips/miscButtons.js';
import paintStarfield from 'psi/cantrip/starfield.js';

avatar.self.cantrips= cantrips;

if(localStorage.autoRun){
  avatar.self.console.arun(localStorage.autoRun).then(
    res=>{ avatar.self.console.cout(res); }
  );
} else {
  avatar.self.cantrips.cast('hello');
}


let starfield= new THREE.Texture( paintStarfield(4196,4196,2000) );
starfield.needsUpdate= true;
starfield.mapping = THREE.EquirectangularReflectionMapping;
starfield.colorSpace = THREE.SRGBColorSpace;
avatar.self.scenes[0].background= starfield;

//have fun



