//make base scene and export functions 
//load controllers
//base Recon userData.isSelecting

import * as THREE from 'three';

 import { BoxLineGeometry } from 'three/addons/geometries/BoxLineGeometry.js';
 import { VRButton } from 'three/addons/webxr/VRButton.js';
 import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';


 let camera, scene, renderer;
 let raycasterLeft, raycasterRight;
 let recon= [basicRecon];
 let update= [basicUpdate];

 let controller1, controller2;
 let controllerGrip1, controllerGrip2;

 export const tempMatrix = new THREE.Matrix4();

 export const self= {};


init();
animate();


function init() {
  scene = new THREE.Scene();
  self.scene= scene;
  scene.background = new THREE.Color( 0x66ddaa );

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set( 0, 1, 3 );

  room = new THREE.LineSegments(
           new BoxLineGeometry( 50, 5, 50, 5, 4, 3 ).translate( 0, 2.5, 0 ),
           new THREE.LineBasicMaterial( { color: 0xbc44bc } )
         );
  scene.add( room ); 
                               
  scene.add( new THREE.HemisphereLight( 0xa5a5a5, 0x898989, 3 ) );

  const light = new THREE.DirectionalLight( 0xffffff, 3 );
  light.position.set( 1, 1, 1 ).normalize();
  scene.add( light );


  raycasterLeft = new THREE.Raycaster();
  self.raycasterLeft= raycasterLeft;
  raycasterRight= new THREE.Raycaster();
  self.raycasterRight= raycasterRight;

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  self.renderer= renderer;
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.xr.enabled = true;

  document.body.appendChild( renderer.domElement );
  document.body.appendChild( VRButton.createButton( renderer ) );


  // controllers

  function onSelectStart() {
    this.userData.isSelecting = true;
  }

  function onSelectEnd() {
    this.userData.isSelecting = false;
  }

  controller1 = renderer.xr.getController( 0 );
  self.controller1= controller1;
  controller1.addEventListener( 'selectstart', onSelectStart );
  controller1.addEventListener( 'selectend', onSelectEnd );
  controller1.addEventListener( 'connected', function ( event ) {
        this.add( buildController( event.data ) );
  } );
  controller1.addEventListener( 'disconnected', function () {
        this.remove( this.children[ 0 ] );
  } );
  scene.add( controller1 );

  controller2 = renderer.xr.getController( 1 );
  self.controller2= controller2;
  controller2.addEventListener( 'selectstart', onSelectStart );
  controller2.addEventListener( 'selectend', onSelectEnd );
  controller2.addEventListener( 'connected', function ( event ) {
        this.add( buildController( event.data ) );
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

function buildController( data ) {
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
    render();
  };
}

function animate() {
  renderer.setAnimationLoop( updatePipeline() );
}

function basicRecon() {
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
}

function basicUpdate(){}

function render(){
  renderer.render( scene, camera );
}

