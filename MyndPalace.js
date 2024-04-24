//Main entry to vr lab

import * as vr from 'vr/VRBoilerplate.js'; 
import 'vr/vrConsole.js';

//have fun

let ta= document.getElementById('consoleInput');
ta.value=`import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader();

loader.load( './assets/banana_3d_scanned.glb', function ( gltf ) {

	vr.scene.add( gltf.scene );

}, undefined, function ( error ) {

  let errdiv= document.createElement('div');
  errdiv.innerHTML = error;
  document.body.appendChild( errdiv );

} );`;