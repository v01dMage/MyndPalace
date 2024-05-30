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
  if ( controller1.userData.isSelecting === true ) {
    tempMatrix.identity().extractRotation( controller1.matrixWorld );

    raycasterLeft.ray.origin.setFromMatrixPosition( controller1.matrixWorld );
    raycasterLeft.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
  }
  if ( controller2.userData.isSelecting === true ) {
    tempMatrix.identity().extractRotation( controller2.matrixWorld );

    raycasterRight.ray.origin.setFromMatrixPosition( controller2.matrixWorld );
    raycasterRight.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
  }
  o.xr= xr;
}