// Load some buttons to play with shaders
import { avatar } from 'mp';
import * as xrConsole from 'xr/console.js';
import { pout } from 'bci';

const THREE= avatar.js3;

const uniformsData= {
  now: {
    type: 'f',
    value: 0.0
  }
};

let poll= ()=>{
  pout( uniformsData.now.value );
  setTimeout(poll, 5000);
};
poll();  

avatar.addToRecon(
  (o)=>{
    uniformsData.now.value= o.now/1000.0;
    return o;
  }
);

const testGeometry= new THREE.BoxGeometry( 1,1,1, 4,4,4 );
const shader= new THREE.ShaderMaterial({
  wireframe: true,
  uniforms: uniformsData,
  vertexShader: `// basic Three vertex shader
uniform float now;
varying vec3 pos;

void main(){
  vec4 result;
  pos = position;
  
  result= vec4(position.x, position.y/2.0 , position.z, 1.0);

  gl_Position = projectionMatrix 
    * modelViewMatrix
    * result;
}
`,
  fragmentShader: `//basic fragment shader
varying vec3 pos;
uniform float now;

void main(){
  if( pos.x < 0.0 ){
    gl_FragColor= vec4( (sin(now)/2.0)+0.5, 1.0, 0.0, 1.0);
  } else {
    gl_FragColor= vec4(0.9, 1.0, 0.0, 1.0);
  }
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
