//Main entry to vr lab

import * as avatar from 'xr/cns.js'; 
import 'xr/console.js';
import { cantrips } from 'my/cantrips/miscButtons.js';
import default from 'psi/cantrip/starfield.js';

avatar.self.cantrips= cantrips;

if(localStorage.autoRun){
  avatar.self.console.arun(localStorage.autoRun).then(
    res=>{ avatar.self.console.cout(res); }
  );
} else {
  avatar.self.cantrips.cast('hello');
}

avatar.self.scenes[0].background= new THREE.Texture( paintStarfield(4196,4196,2000) );

//have fun



