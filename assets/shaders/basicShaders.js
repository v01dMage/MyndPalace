//Basic shaders in THREE.ShaderMaterial format

import { avatar } from 'mp';
//import * as xrConsole from 'xr/console.js';
//import { pout } from 'bci';

const THREE= avatar.js3;

const uniformsData= {
  now: {
    type: 'f',
    value: Date.now()
  }
};

let poll= ()=>{
  pout( uniformsData.now.value );
  setTimeout(poll, 5000);
};
//poll();  

let tStart= Date.now();
avatar.addToRecon(
  (o)=>{
    uniformsData.now.value= (o.now-tStart)/1000.0;
    return o;
  }
);


export const firstShader= new THREE.ShaderMaterial({
  wireframe: true,
  uniforms: uniformsData,
  vertexShader: `uniform float now;
varying vec3 pos;

void main(){
  vec4 result;
  pos = position;
  
  result= vec4(position.x, sin(now)/3.0+ position.y , position.z, 1.0);

  gl_Position = projectionMatrix 
    * modelViewMatrix
    * result;
}
`,
  fragmentShader: `varying vec3 pos;
uniform float now;

void main(){
  if( pos.x < 0.5 ){
    gl_FragColor= vec4( (sin(now)/5.0)+0.5, 0.7, 0.0, 1.0);
  } else {
    gl_FragColor= vec4(0.8, 0.0, 1.0, 1.0);
  }
}
`,
});

export const Cuboid= new THREE.ShaderMaterial({
  wireframe: false,
  uniforms: uniformsData,
  vertexShader: `uniform float now;
varying vec3 pos;
varying float magic;
varying vec3 vNormal;

void main(){
  vec4 result;
  pos = position;
  magic= sin(now)/2.0 +0.5;
  float s= magic * 2.4;
  vNormal= normal;

  result= vec4( position.x + sin(now)/2., position.y+ position.z *cos(now), position.z, 1.0);

  gl_Position = projectionMatrix 
    * modelViewMatrix
    * result;
}
`,
  fragmentShader: `varying vec3 pos;
uniform float now;
varying float magic;
varying vec3 vNormal;
float g;

void main(){
  g= clamp( sin(now)*2.225-1.225, 0., 1. );
  gl_FragColor= vec4( 0.77, g, 0.99 , 1.0);
}
`,
});
