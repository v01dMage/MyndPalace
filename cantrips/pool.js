import * as THREE from 'three';
import { Water } from 'three/addons/objects/Water2.js';
import * as vr from 'vr/vr.js';

let water;

init();

function init(){
  
  waterGeometry= new THREE.PlaneGeometry( 5, 10 );

  water= new Water( waterGeometry, {
    color: 0xffffaa,
    scale: 0.5,
    flowDirection: new THREE.Vector2( .5, 1 ),
    textureWidth: 1024,
    textureHeight: 1024
  } );

  water.position.y= .1;
  water.rotation.x= Math.PI * -0.5;
  vr.self.scene.add( water );

  setTimeout( wind, 15000 );
}

function wind(){
  water.material.uniforms[ 'flowDirection' ].value.x= Math.random()*2 -1;
  water.material.uniforms[ 'flowDirection' ].value.y= Math.random()*2 -1;
  water.material.uniforms[ 'flowDirection' ].value.normalize();

  setTimeout( wind, 15000 );
}
