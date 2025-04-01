// Load some buttons to play with shaders
import { avatar } from 'mp';
import * as xrConsole from 'xr/console.js';
import { pout } from 'bci';

const THREE= avatar.js3;

const uniformsData= {};

const testGeometry= new THREE.BoxGeometry( 1,1,1, 4,4,4 );
const shader= new THREE.ShaderMaterial({
  wireframe: true,
  uniforms: uniformsData,
  vertexShader: `// basic Three vertex shader
//uniform float blahblah

void main(){
  vec4 result;
  
  result= vec4(position.x, position.y, position.z, 1.0);

  gl_Position = projectionMatrix 
    * modelViewMatrix
    * result;
}
`,
  fragmentShader: `//basic fragment shader
//uniform float blahblah 
void main(){
  gl_FragColor= vec4(.5, 1, 0);
}
`,
});

const mesh= new THREE.Mesh( testGeometry, shader );
mesh.position.set( 0, 1.6, -10);
avatar.self.scene.add(mesh);

const mesh2= new THREE.Mesh( testGeometry, 
  new THREE.MeshBasicMaterial({wireframe:true});
);
mesh2.position.set( 0, 0, -10);
avatar.self.scene.add(mesh2);

pout('shader code run.');