//Camera Nexus Start
//
//  import and initialize base xr system

import * as THREE from 'three';
export * as js3 from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';

import { gamepad } from 'xr/gamepad.js';//MetaQ3
export { gamepad } from 'xr/gamepad.js';
//import { speech } from 'xr/speech.js';
//export { speech } from 'xr/speech.js';

let camera, scene, scenes, renderer, xr;
export let voyd;
let raycasterLeft, raycasterRight;
let recon= [ basicRecon, gamepad.recon ];
let lastDeltaTime= Date.now();
let lastAdvanced= lastDeltaTime;
let update= [ basicUpdate, advanceScene ];

export const tempMatrix = new THREE.Matrix4();

export const self= {dna: { index : ['./index.html', document.documentElement.outerHTML] }, dnaStore : store };
let geneCount= 1;
function store(url){
  fetch(url).then( res=>res.text() ).then( txt=>{
    self.dna['gc'+geneCount++]= [url,txt];
  })
}
store('./LICENSE');
store('./README.MD');
store(import.meta.url);
store('./avatar/gamepad.js');

self.hands= [];
let controller1, controller2;
let controllerGrip1, controllerGrip2;
let heading= Math.PI/2;


init();
animate();


function init(){
  scene = new THREE.Scene();
  self.scene= scene;
  self.scenes= [ scene ];
  scenes= self.scenes;
  scene.background = new THREE.Color( 0x66ddaa );

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set( 0, 1, 3 );
  self.camera= camera;
                               
 // scene.add( new THREE.HemisphereLight( 0xa5a5a5, 0x898989, 3 ) );

  /*
  const light = new THREE.DirectionalLight( 0xffffff, 0.9 );
  light.position.set( -15, -15, -55 ).normalize();
  light.castShadow= true;
  scene.add( light );
*/
  const light = new THREE.AmbientLight( 0xffffff );
  scene.add( light );

  raycasterLeft = new THREE.Raycaster();
  self.raycasterLeft= raycasterLeft;
  raycasterRight= new THREE.Raycaster();
  self.raycasterRight= raycasterRight;

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  self.renderer= renderer;
  xr= renderer.xr;
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  xr.enabled = true;
  renderer.shadowMap.enabled = true;
  //document.body.appendChild( renderer.domElement );
  let vrbtn= VRButton.createButton( renderer );
  document.body.appendChild( vrbtn );


  // controllers

  controller1 = xr.getController( 0 );
  self.controller1= controller1;
  
  controller1.addEventListener( 'connected', function ( event ) {
        this.add( buildPointer( event.data ) );
  } );
  controller1.addEventListener( 'disconnected', function () {
        this.remove( this.children[ 0 ] );
  } );
  scene.add( controller1 );

  controller2 = xr.getController( 1 );
  self.controller2= controller2;

  controller2.addEventListener( 'connected', function ( event ) {
        this.add( buildPointer( event.data ) );
  } );
  controller2.addEventListener( 'disconnected', function () {
        this.remove( this.children[ 0 ] );
  } );
  scene.add( controller2 );


  const controllerModelFactory = new XRControllerModelFactory();

  controllerGrip1 = xr.getControllerGrip( 0 );
  self.controllerGrip1= controllerGrip1;
  controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) );
  scene.add( controllerGrip1 );

  controllerGrip2 = xr.getControllerGrip( 1 );
  self.controllerGrip2= controllerGrip2;
  controllerGrip2.add( controllerModelFactory.createControllerModel( controllerGrip2 ) );
  scene.add( controllerGrip2 );

  //
  window.addEventListener( 'resize', onWindowResize, false );



  let radius= .5;
  let height= .1;
  let borderDifference= .5;

  let r= radius+ radius* borderDifference;
  let h= height- height*borderDifference;

  let border= new THREE.Mesh(
    new THREE.CylinderGeometry(r,r,h, 16, 1, false ).translate(0,0,.3),
    new THREE.MeshBasicMaterial( {color: 0x000000, transparent: true, opacity: 0.75} )
  );


  let clover= new THREE.TextureLoader().load('./assets/clover5.jpg');
  let mat= new THREE.MeshBasicMaterial( {map: clover, transparent: true, opacity: 0.5} );

  let disc= new THREE.Mesh(
    new THREE.CylinderGeometry(radius,radius,height, 16 ).translate( 0,0,.4),
    mat
  );
  
  scene.add( disc );
  [ border, camera, 
    controller1, controller2,
    controllerGrip1, controllerGrip2 
  ].forEach( part=> disc.add(part) );
    
  self.disc= disc;

/*
  let pointOfReference = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial( {color: 0xff4477 } )
  );
  pointOfReference.position.set(0,1,-15);
  scene.add( pointOfReference );
*/
  voyd= new THREE.Scene();
  voyd.background = new THREE.Color( 0x77bb88 );
  voyd.add( new THREE.HemisphereLight( 0xcccccc, 0x400040, .8 ) );
  scenes.push( voyd );
}


const speed= function (range){
  if(Math.abs(range) > .9){
    let sign= range > 0? +1 : -1;
    return sign*((Math.abs(range)- .9)*.2+ .02);
  } else {
    return range* 0.02;
  }
};
function basicUpdate(o){
  if( o.xr.isPresenting ){
  //heading and rotate 
    heading+= speed( gamepad.rightXaxis );
    if(heading< -Math.PI) heading+= 2*Math.PI;
    if(heading>  Math.PI) heading-= 2*Math.PI;
    self.disc.rotateY( -speed(gamepad.rightXaxis) );

  // xz worldplane movement
  //forward vector 
    self.disc.position.z+= Math.sin(heading)* speed( gamepad.leftYaxis );
    self.disc.position.x+= Math.cos(heading)* speed( gamepad.leftYaxis );
  //strafe vector 
    self.disc.position.z-= Math.cos(heading)* speed( gamepad.leftXaxis );
    self.disc.position.x+= Math.sin(heading)* speed( gamepad.leftXaxis );
    //
  
  // up down
    self.disc.position.y+= speed( gamepad.leftTrigger );
    self.disc.position.y-= speed( gamepad.leftGrip );
  }
}

function basicRecon(o) {
  o.xr= xr;
  o.now= Date.now();
  o.deltaTime= o.now- lastDeltaTime;
  lastDeltaTime= o.now;

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

function advanceScene(o){
  if( gamepad.Y && o.now- lastAdvanced > 2000){
    let temp= scenes.shift();
    scenes.push( temp );
    lastAdvanced= o.now;
    scenes[0].add( self.disc );
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
       material = new THREE.MeshBasicMaterial( { opacity: 0.2, transparent: true } );
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
