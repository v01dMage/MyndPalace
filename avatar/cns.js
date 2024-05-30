//Camera Nexus Start
//
//  import and initialize base xr system

import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { gamepad } from 'xr/gamepad.js';//MetaQ3

let camera, scene, scenes, renderer, xr;
let raycasterLeft, raycasterRight;
let recon= [ basicRecon, gamepad.recon ];
let update= [ basicUpdate ];

export const tempMatrix = new THREE.Matrix4();

export const self= {};
self.hands= [];
let controller1, controller2;
let controllerGrip1, controllerGrip2;





function basicRecon(o) {
  o.xr= xr;

  if ( gamepad.leftTrigger > 0 ) {
    tempMatrix.identity().extractRotation( controller1.matrixWorld );

    raycasterLeft.ray.origin.setFromMatrixPosition( controller1.matrixWorld );
    raycasterLeft.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
  }
  if ( gamepad.rightTrigger > 0 ) {
    tempMatrix.identity().extractRotation( controller2.matrixWorld );

    raycasterRight.ray.origin.setFromMatrixPosition( controller2.matrixWorld );
    raycasterRight.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
  }
  
}

function buildPointer( data ) {
  let geometry, material;

  switch ( data.targetRayMode ) {
    case 'tracked-pointer':
       geometry = new THREE.BufferGeometry();
       geometry.setAttribute( 'position', 
              new THREE.Float32BufferAttribute( [ 0, 0, 0, 0, 0, - 2 ], 3 ) 
       );
       geometry.setAttribute( 'color', 
              new THREE.Float32BufferAttribute( [ 0.5, 0.2, 0.5, 0, 0, 0 ], 3 ) 
       );
       material = new THREE.LineBasicMaterial( { 
              vertexColors: true, blending: THREE.AdditiveBlending 
       } );
      return new THREE.Line( geometry, material );

    case 'gaze':
       geometry = new THREE.RingGeometry( 0.02, 0.04, 32 ).translate( 0, 0, - 1 );
       material = new THREE.MeshBasicMaterial( { opacity: 0.5, transparent: true } );
      return new THREE.Mesh( geometry, material );
  }
}