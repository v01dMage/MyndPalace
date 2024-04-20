//Main entry to vr lab

import { init, snimate } from 'vr/VRBoilerplate.js';

let t= document.createElement('div');
t.innerHTML= init + animate;
document.body.appendChild(t);

export function enter(){
  //init();
  //animate();
}
