//Main entry to vr lab

import * as avatar from 'xr/cns.js'; 

import 'xr/console.js';
import 'my/cantrips/miscButtons.js';

import 'xr/scenes.js'; 
import 'xr/skybox.js'; 

if(localStorage.autoRun)
  avatar.self.console.arun(localStorage.autoRun);

//have fun



