//Main entry to vr lab

import { init, animate } from 'vr/VRBoilerplate.js'; // vr{}
import { vrConsole } from 'vr/vrConsole.js';
//vrConsole.init( vr.controller1 );

export function enter(){
  init();
  animate();
}
