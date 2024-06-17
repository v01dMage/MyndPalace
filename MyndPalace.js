//Main entry to vr lab

import * as avatar from 'xr/cns.js'; 
import 'xr/console.js';
import { cantrips } from 'my/cantrips/miscButtons.js';
import { paintStarfield } from 'psi/cantrip/starfield.js';
import * as THREE from 'three';
import { conjurePaper } from 'psi/cantrip/paper.js'

avatar.self.cantrips= cantrips;

if(localStorage.autoRun){
  avatar.self.console.arun(localStorage.autoRun).then(
    res=>{ avatar.self.console.cout(res); }
  );
} else {
  avatar.self.cantrips.cast('hello');
}



let bg= paintStarfield(2048,2048,2000);
//avatar.self.console.cout( bg );
let starfield= new THREE.Texture( bg );
//avatar.self.console.cout( starfield );
starfield.needsUpdate= true;
starfield.mapping = THREE.EquirectangularReflectionMapping;
starfield.colorSpace = THREE.SRGBColorSpace;
avatar.self.scenes[0].background= starfield;

const testPaper= conjurePaper();
testPaper.position.y= .7 ;
function rotatePaper(i){
  testPaper.rotateY(i.deltaTime/1000);
  testPaper.rotateX(i.deltaTime/100000);
}
avatar.addToUpdate( rotatePaper );
//have fun



