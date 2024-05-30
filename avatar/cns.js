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


init();
animate();

function init(){




  controller1 = renderer.xr.getController( 0 );
  self.controller1= controller1;
  //controller1.addEventListener( 'selectstart', onSelectStart );
//  controller1.addEventListener( 'selectend', onSelectEnd );
  controller1.addEventListener( 'connected', function ( event ) {
        this.add( buildPointer( event.data ) );
  } );
  controller1.addEventListener( 'disconnected', function () {
        this.remove( this.children[ 0 ] );
  } );
  scene.add( controller1 );

  controller2 = renderer.xr.getController( 1 );
  self.controller2= controller2;
//  controller2.addEventListener( 'selectstart', onSelectStart );
 // controller2.addEventListener( 'selectend', onSelectEnd );
  controller2.addEventListener( 'connected', function ( event ) {
        this.add( buildPointer( event.data ) );
  } );
  controller2.addEventListener( 'disconnected', function () {
        this.remove( this.children[ 0 ] );
  } );
  scene.add( controller2 );


  const controllerModelFactory = new XRControllerModelFactory();

  controllerGrip1 = renderer.xr.getControllerGrip( 0 );
  self.controllerGrip1= controllerGrip1;
  controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) );
  scene.add( controllerGrip1 );

  controllerGrip2 = renderer.xr.getControllerGrip( 1 );
  self.controllerGrip2= controllerGrip2;
  controllerGrip2.add( controllerModelFactory.createControllerModel( controllerGrip2 ) );
  scene.add( controllerGrip2 );

  //
  window.addEventListener( 'resize', onWindowResize, false );
}


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


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

export function addToRecon(f){
   recon.push(f);
   animate();
}
export function addToUpdate(f){
   update.push(f);
   animate();
}

function updatePipeline(){
  return ()=>{ 
    let o={};
    recon.forEach( f=>f(o) ); 
    update.forEach( f=>f(o) );
    renderer.render( scenes[0], camera );
  };
}

function animate() {
  renderer.setAnimationLoop( updatePipeline() );
}