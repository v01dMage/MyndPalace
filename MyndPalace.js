//Main entry to vr lab

import * as avatar from 'xr/cns.js'; 
/*
import 'xr/console.js';
import 'my/cantrips/miscButtons.js';

import 'xr/scenes.js'; 
import 'xr/skybox.js'; 

if(localStorage.currentlyTesting)
  import(localStorage.currentlyTesting);
*/

let t= document.createElement('div');
t.innerHTML= 'here again '+ avatar.gamepad.leftYAxis;
document.body.appendChild(t);

//have fun



