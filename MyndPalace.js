//Main entry to vr lab

import * as avatar from 'xr/cns.js'; 

import 'xr/console.js';
import { cantrips } from 'my/cantrips/miscButtons.js';
import 'xr/scenes.js'; 

avatar.self.cantrips= cantrips;

if(localStorage.autoRun){
  avatar.self.console.arun(localStorage.autoRun).then(
    res=>{ avatar.self.console.cout(res); }
  );
}
init();

function init(){
avatar.self.cantrips.cast('hello');}
//have fun



