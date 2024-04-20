//Main entry to vr lab

import { testFn } from 'vr/VRBoilerplate.js';

let t= document.createElement('div');
t.innerHTML= testFn()+testFn;
document.body.appendChild(t);

export function enter(){
  //init();
  //animate();
}
