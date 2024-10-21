//Main entry to vr lab

import * as avatar from 'xr/cns.js'; 
import * as xrConsole from 'xr/console.js';
import psiRun from 'psi/transpile.js';
avatar.self.psi= psiRun;
import { paintStarfield } from 'psi/starfield.js';
import 'psi/introspection.js';
avatar.self.dnaStore(import.meta.url);


if(localStorage.autoRun){
  xrConsole.arun(localStorage.autoRun).then(
    res=>{ xrConsole.ccout(res); }
  );
} else {
  xrConsole.cantrips.cast('hello');
}

let repaint= (canvas)=>{
  let THREE= avatar.js3;
  let bg= new THREE.Texture( canvas );
  bg.needsUpdate= true;
  bg.mapping = THREE.EquirectangularReflectionMapping;
  bg.colorSpace = THREE.SRGBColorSpace;
  avatar.self.scene.background= bg;
}
repaint( paintStarfield(800,400,3000) );

//have fun

export { avatar };

