//Main entry to vr lab

import * as vr from 'vr/VRBoilerplate.js'; 
import 'vr/vrConsole.js';

//have fun

let ta= document.getElementById('consoleInput');
ta.value=`const { GLTFLoader }= await import( 'three/addons/loaders/GLTFLoader.js' )

const loader = new GLTFLoader();

loader.load( 'https://drive.google.com/file/d/1-uT5uDm4JnM6D366UYzCTVTmRbCDxgi5/view?usp=drivesdk', function ( gltf ) {

	vr.self.scene.add( gltf.scene );

}, undefined, function ( error ) {

  let errdiv= document.createElement('div');
  errdiv.innerHTML = error;
  document.body.appendChild( errdiv );

} );`;