// Load some buttons to play with shaders
import { avatar } from 'mp';
import * as xrConsole from 'xr/console.js';
import { pout } from 'bci';
import { firstShader } from 'inv/shaders/basicShaders.js';

const THREE= avatar.js3;

const testGeometry= new THREE.BoxGeometry( 1,1,1, 4,4,4 );

const mesh= new THREE.Mesh( testGeometry, firstShader );
mesh.position.set( 0, 1.6, -10);
avatar.self.scene.add(mesh);

const mesh2= new THREE.Mesh( testGeometry, 
  new THREE.MeshBasicMaterial({wireframe:true,color:0x00cc00})
);
mesh2.position.set( 0, 0, -10);
avatar.self.scene.add(mesh2);

pout('shader imported and code run.');
