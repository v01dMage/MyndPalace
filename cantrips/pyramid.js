//Pyramid hand ornament

import * as THREE from 'three';
import * as vr from 'vr/vr.js';

let orb;
let delta= Date.now();

init();
vr.addToRecon( getDelta );
vr.addToUpdate( orbSpin );


function makePoint( parent, x, y, z, color ){
    let mesh= new THREE.Mesh(
      new THREE.SphereGeometry( 0.01 ).translate( x, y, z ),
      new THREE.MeshBasicMaterial( {color} )
    );
    parent.add( mesh );
}

function init(){
   let points= [
     {x: 0, y: 0, z: -.1, color: 0xaaaaff},
     {x: .1, y: 0, z: 0, color: 0xaaaaaa},
     {x: -.1, y: 0, z: 0, color: 0x777777},
     {x: 0, y: .1, z: 0, color: 0xaaaa00},
     {x: 0, y: -.1, z: 0, color: 0x777700}
   ];
   points.forEach( ({x,y,z,color})=>{
     makePoint( vr.self.controllerGrip2, x, y, z, color );
   });

    orb= new THREE.Mesh(
        new THREE.SphereGeometry( 0.03 ).translate( 0, 0, -.1 ),
        new THREE.MeshBasicMaterial({
           color: 0xddffbb,
           wireframe: true
        })
    );
    vr.self.controllerGrip2.add( orb );
    vr.self.scene.remove( vr.self.controllerGrip2 );
}

function orbSpin(o){
  orb.rotateZ( .003 * o.delta )
}

function getDelta(o){
   let now= Date.now();
   o.delta= now - delta;
   delta= now;
                     }
