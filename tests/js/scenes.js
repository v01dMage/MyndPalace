//practice and test using multiple scenes,
//with 'vr'.self.scenes[0] always being rendered

import * as vr from 'vr/vr.js';
import * as THREE from 'three';

//add controllers and grips,
// background, lights, etc 
try{
let voyd= new THREE.Scene();
voyd.background = new THREE.Color( 0xeeffee );

voyd.add( vr.self.controller1 );
voyd.add( vr.self.controller2 );
voyd.add( vr.self.controllerGrip1 );
voyd.add( vr.self.controllerGrip2 );

voyd.add( new THREE.HemisphereLight( 0xcccccc, 0x779977, 3 ) );

vr.self.scenes.push( voyd );

let lastSwapped= Date.now();
let gp= vr.self.gamepad;
/*
function swapRealm(o){
  if(Date.now() - lastSwapped> 2000){
    
    if(gp.leftGrip > 0.3 && gp.Y){
      vr.self.scenes.push(
        vr.self.scenes.unshift();
      );
      lastSwapped= Date.now();
    }
  }
}
*/
//vr.addToUpdate( swapRealm );

} catch(err){
   vr.self.console.cout(err);
}