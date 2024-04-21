//Main entry to vr lab

import { vr, init, animate } from 'vr/VRBoilerplate.js'; 
import { vrConsole } from 'vr/vrConsole.js';

export function enter(){
  init();
  vrConsole.init();
  animate();
}
