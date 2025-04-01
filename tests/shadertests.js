// Load some buttons to play with shaders
import { avatar } from 'mp';
import * as xrConsole from 'xr/console.js';
import { pout } from 'bci';

const THREE= avatar.js3;

const uniformsData= {
  lastTime: {
    type: 'f',
    value: Date.now()
  },
  elapsedTime: {
    type: 'f',
    value: 0.0
  }
};
avatar.addToUpdate(
  (o)=>{
    uniformsData.elapsedTime.value= 
      o.now- uniformsData.lastTime.value;
    uniformsData.lastTime.value= o.now;
    return o
  }
);

const testGeometry= new THREE.BoxGeometry( 1,1,1, 4,4,4 );
const shader= new THREE.ShaderMaterial({
  wireframe: true,
  uniforms: uniformsData,
  vertexShader: `// basic Three vertex shader
uniform float elapsedTime

void main(){
  vec4 result;
  
  result= vec4(position.x, sin(elapsedTime/1000)+ position.y, position.z, 1.0);

  gl_Position = projectionMatrix 
    * modelViewMatrix
    * result;
}
`,
  fragmentShader: `//basic fragment shader
//uniform float kjhg
void main(){
  gl_FragColor= vec4(0.5, 1.0, 0.0, 1.0);
}
`,
});

const mesh= new THREE.Mesh( testGeometry, shader );
mesh.position.set( 0, 1.6, -10);
avatar.self.scene.add(mesh);

const mesh2= new THREE.Mesh( testGeometry, 
  new THREE.MeshBasicMaterial({wireframe:true,color:0x00cc00})
);
mesh2.position.set( 0, 0, -10);
avatar.self.scene.add(mesh2);

pout('shader code run.');
