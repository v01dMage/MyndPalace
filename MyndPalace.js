//Main entry to vr lab

import { vr, init, animate } from 'vr/VRBoilerplate.js'; 
import { vrConsole } from 'vr/vrConsole.js';
//vrConsole.init( vr.controller1 );

export function enter(){
  init();
  animate();
}
