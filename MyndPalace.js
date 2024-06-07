//Main entry to vr lab

import * as avatar from 'xr/cns.js'; 

import 'xr/console.js';
import { cantrips } from 'my/cantrips/miscButtons.js';
avatar.self.cantrips= cantrips;

import 'xr/scenes.js'; 
import 'xr/skybox.js'; 

if(localStorage.autoRun)
  avatar.self.console.arun(localStorage.autoRun);

avatar.self.cantrips.cast('hello');
//have fun



