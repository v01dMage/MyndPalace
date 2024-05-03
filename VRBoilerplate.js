//make scene and export functions 

import * as THREE from 'three';

 import { BoxLineGeometry } from 'three/addons/geometries/BoxLineGeometry.js';
 import { VRButton } from 'three/addons/webxr/VRButton.js';
 import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
 //import { createText } from 'three/addons/webxr/Text2D.js';


 let camera, scene, renderer;
 let raycaster;//Left, raycasterRight;
 let recon= [];
 let update= [];
 //let pipeline= [ recon, update, render ];
 let controller1, controller2;
 let controllerGrip1, controllerGrip2;

 let room, marker, floor, baseReferenceSpace;

 let INTERSECTION;
 export const tempMatrix = new THREE.Matrix4();

 export const self= {};


init();
addToRecon( basicRecon );
addToUpdate( basicUpdate );


function init() {
  self.scene= scene = new THREE.Scene();
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

  marker = new THREE.Mesh(
            new THREE.CircleGeometry( 0.25, 32 ).rotateX( - Math.PI / 2 ),
            new THREE.MeshBasicMaterial( { color: 0xbcbcbc } )
          );
  scene.add( marker );

  floor = new THREE.Mesh(
            new THREE.PlaneGeometry( 94.8, 94.8, 2, 2 ).rotateX( - Math.PI / 2 ),
            new THREE.MeshBasicMaterial( { color: 0x22bc55, transparent: true, opacity: 0.25 } )
          );
  scene.add( floor );

  raycaster = new THREE.Raycaster();
  self.raycaster= raycaster;

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  renderer.xr.addEventListener( 'sessionstart', 
          () => baseReferenceSpace = renderer.xr.getReferenceSpace() 
          );
  renderer.xr.enabled = true;

  document.body.appendChild( renderer.domElement );
  document.body.appendChild( VRButton.createButton( renderer ) );


  // controllers

  function onSelectStart() {
    this.userData.isSelecting = true;
  }

  function onSelectEnd() {
    this.userData.isSelecting = false;

    if ( INTERSECTION ) {
       const offsetPosition = { 
          x: - INTERSECTION.x, y: - INTERSECTION.y, z: - INTERSECTION.z, w: 1 
       };
       const offsetRotation = new THREE.Quaternion();
       const transform = new XRRigidTransform( offsetPosition, offsetRotation );
       const teleportSpaceOffset = baseReferenceSpace.getOffsetReferenceSpace( transform );

       renderer.xr.setReferenceSpace( teleportSpaceOffset );
    }
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
  INTERSECTION = undefined;

  if ( controller1.userData.isSelecting === true ) {
    tempMatrix.identity().extractRotation( controller1.matrixWorld );

    raycaster.ray.origin.setFromMatrixPosition( controller1.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );

    const intersects= raycaster.intersectObjects( [ floor ] );

    if ( intersects.length > 0 ) {
       INTERSECTION = intersects[ 0 ].point;
    }
  } else if ( controller2.userData.isSelecting === true ) {
    tempMatrix.identity().extractRotation( controller2.matrixWorld );

    raycaster.ray.origin.setFromMatrixPosition( controller2.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );

    const intersects= raycaster.intersectObjects( [ floor ] ); 

    if ( intersects.length > 0 ) {
       INTERSECTION = intersects[ 0 ].point;
    }
  }
}

function basicUpdate(o){
  if ( INTERSECTION ) marker.position.copy( INTERSECTION );

  marker.visible = INTERSECTION !== undefined;
}

function render(){
  renderer.render( scene, camera );
}

