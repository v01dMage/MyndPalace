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

const specs= {
  thickness : 0.003,
  color : "#afa", fontColor : "#113",
  font : "bold italic 80px Arial"
};
const testPaper= conjurePaper(`Ok,
   Testing Testing
  1
      2
           3
   How many lines are
     filling up the C! 
  Better not B A letter D
  cause D is for dork,
  like this poetryy

two bits
🦄`, specs );
testPaper.position.y= .7 ;

function rotatePaper(i){
  testPaper.rotateY(i.deltaTime/5000);
  //testPaper.rotateX(i.deltaTime/5000);
}
avatar.addToUpdate( rotatePaper );

//have fun



