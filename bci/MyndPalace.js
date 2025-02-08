//Main entry to vr lab

import * as avatar from 'xr/cns.js'; 
import * as xrConsole from 'xr/console.js';
import { psiRun } from 'psi/transpile.js';
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

function repaint(canvas){
  let THREE= avatar.js3;
  let bg= new THREE.Texture( canvas );
  bg.needsUpdate= true;
  bg.mapping = THREE.EquirectangularReflectionMapping;
  bg.colorSpace = THREE.SRGBColorSpace;
  avatar.self.scenes[0].background= bg;
  avatar.self.scene= avatar.self.scenes[0];
}
repaint( paintStarfield( 2000, 1000, 333) );
avatar.self.repaint= repaint;
avatar.self.paintStarfield= paintStarfield;
//have fun

export { avatar };

