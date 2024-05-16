import * as THREE from'three';
import { createText } from 'three/addons/webxr/Text2D.js';
import * as vr from 'vr/vr.js';

let cFrame, cScreen, cPlane;
let runner, testLight;
let testText;

init();

vr.self.console= {
  clear, cout, getText, arun
};

function clear(){
    vr.self.consoleOut.innerHTML="";
}

function cout(html){
  if(typeof html == null)
    html= typeof html;
  if(typeof html == undefined)
    html= '<em>undefined</em>';
  if(typeof html == 'object'){
    html= Object.keys(html).join('<br>');
    if(html=='') html= 'blank object';
  }
  let div= document.createElement('div');
  div.innerHTML= html;
  vr.self.consoleOut.appendChild( div );
}

function onSelectStart(){
    // Highlight runner
    if( runner.userData.isSelecting == true ) {
        runner.material.color.setHex( 0x44aa44 );
     } else {
        runner.material.color.setHex( 0x4444aa );
     }
}

async function onSelectEnd(){
    if( runner.userData.isSelecting === true ){
      // capsule purple
       runner.material.color.setHex( 0xcc22cc );
      // cube red
       testLight.material.color.setHex( 0xdd5555 );
       cScreen.remove( cPlane );
       let out= await arun();
       cPlane= createText( out, .02 );
       cPlane.position.z+= .02;
       cScreen.add( cPlane );
    }
}

function consoleRecon(o){}

function consoleUpdate(o){
  if ( vr.self.controller2.userData.isSelecting === true ) {

    const intersects= vr.self.raycasterRight.intersectObjects( [ runner ] ); 

    if ( intersects.length > 0 ) {
       runner.userData.isSelecting= true;
    } else {
       runner.userData.isSelecting= false;
    } 
  }
}

function getText(){
  let text= document.getElementById( 'consoleInput' );
  return text.value;
}

async function arun(text){
       if(typeof text != 'string') text= getText();
       let out;
       try{
          out= await (( Function(`return async function (vr, THREE){${text}}`) )())(vr, THREE);
       } catch(err){
          out= err;
       }
    return out;
}

async function init(){ 

   let ta= document.createElement('textarea');
   ta.setAttribute( 'rows', '24' );
   ta.setAttribute( 'cols', '80' );
   ta.id= 'consoleInput';
   ta.style= 'background: black; border: 2px solid green; color: #4c6';
   ta.value= localStorage.current;
   document.body.appendChild( ta );

   let consoleOut= document.createElement('div');
   consoleOut.id= 'consoleOut';
   document.body.appendChild( consoleOut );
   vr.self.consoleOut= consoleOut;

   let runButton= document.createElement('button');
   runButton.innerHTML= 'run';
   runButton.addEventListener('click', arun);
   document.body.appendChild(runButton);

  let quickSave= document.createElement('button');
  quickSave.innerHTML= 'quickSave';
  quickSave.addEventListener('click', ()=>{
    let ta= document.getElementById('consoleInput');
    localStorage.current= ta.value;
  });
  document.body.appendChild( quickSave );

   testText= createText( 'Fail', .05 );
  testText.rotateX(- .7 );
  testText.rotateY( 1.4);
  testText.position.z= .28;
  testText.position.y=  .27;
  testText.position.x= -.18;
  vr.self.controllerGrip1.add( testText );
testText= createText( 'Line #2', .05 );
  testText.rotateX(- .7 );
  testText.rotateY( 1.4);
  testText.position.z= .28;
  testText.position.y=  .33;
  testText.position.x= -.18;
  vr.self.controllerGrip1.add( testText );

   cFrame = new THREE.Mesh(
            new THREE.BoxGeometry( .1, .1, .01 ),
            new THREE.MeshPhongMaterial( {color: 0x229933} ) );
   vr.self.controllerGrip1.add( cFrame );

   cScreen= new THREE.Mesh(
            new THREE.BoxGeometry( .08, .06, .001).translate( 0, .01, .01),
            new THREE.MeshBasicMaterial( {
                color: 0x110011,
                wireframe: false
            })
   );
   cFrame.add( cScreen );
   cFrame.rotateX( -1.67 );
   cFrame.position.y+= .04;
   cFrame.position.z+= .11;

   cPlane= createText( 'salt', .1 );
   cPlane.position.z+= .02;
   cScreen.add( cPlane );

   runner = new THREE.Mesh( 
            new THREE.CapsuleGeometry( .1, .2, 3, 5).
              rotateX(1). rotateY(-.5).
              translate( -.1, .05, .25),
            	new THREE.MeshBasicMaterial( {color: 0x330099, wireframe: true} ) 
          );
		vr.self.controllerGrip1.add( runner );

		testLight = new THREE.Mesh( 
               new THREE.BoxGeometry( .1, .1, .1 ).translate( -.1, .05, .25 ),
               new THREE.MeshBasicMaterial( {color: 0x777777} ) );
		runner.add( testLight );
  
   //vr.self.controller1.addEventListener( 'selectstart', onSelectStart );
   //vr.self.controller1.addEventListener( 'selectend', onSelectEnd );
   vr.self.controller2.addEventListener( 'selectstart', onSelectStart );
   vr.self.controller2.addEventListener( 'selectend', onSelectEnd );

   vr.addToRecon( consoleRecon );
   vr.addToUpdate( consoleUpdate );
   vr.self.consoleOut.innerHTML= 'test<br>output';
}
