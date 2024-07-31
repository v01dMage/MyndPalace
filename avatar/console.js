import * as THREE from'three';
import { createText } from 'three/addons/webxr/Text2D.js';
import * as avatar from 'xr/cns.js';
import { cantrips } from 'xr/consoleButtons.js';
export { cantrips } from 'xr/consoleButtons.js';
avatar.self.dnaStore(import.meta.url);

let cFrame, cScreen, cPlane;
let spellbook, leftPage, rightPage;
let binder, slot1, slot2, slot3, slot4, slot5;
let runner, testLight;

init();

export function ccout(text){
  cScreen.remove( cPlane );
  cPlane= createText( text, .02 );
  cPlane.position.z+= .02;
  cScreen.add( cPlane );
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

       let out= await arun();
       ccout( out );
    }
}

function consoleRecon(o){
  //Open SpellBook on X
  if ( avatar.gamepad.X ){
    // toggle spellbook
    
  }
}

function consoleUpdate(o){
  if( avatar.gamepad.B ){ arun().then(res=>{
    ccout( res );
  }); }
  if ( avatar.gamepad.rightTrigger > 0 ) {

    const intersects= avatar.self.raycasterRight.intersectObjects( [ runner ] ); 

    if ( intersects.length > 0 ) {
       runner.userData.isSelecting= true;
    } else {
       runner.userData.isSelecting= false;
    } 
  }
}

export function getText(){
  let text= document.getElementById( 'webText' );
  return text.value;
}


const xrConsole= { arun, getText, ccout };
export async function arun(text){
       if(typeof text != 'string') text= getText();
       let out;
       try{
          out= await (( Function(`return async function (avatar,xrConsole){${text}}`) )())(avatar, xrConsole);
       } catch(err){
          out= err;
       }
    return out;
}

async function init(){ 
   cFrame = new THREE.Mesh(
            new THREE.BoxGeometry( .1, .1, .01 ),
            new THREE.MeshPhongMaterial( {color: 0x229933} ) );
   avatar.self.controllerGrip1.add( cFrame );

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

  //group spellbook
   
 
//keep for example until spellbook is clickable 
   runner = new THREE.Mesh( 
            new THREE.CapsuleGeometry( .1, .2, 3, 5).
              rotateX(1). rotateY(-.5).
              translate( -.1, .05, .25),
            	new THREE.MeshBasicMaterial( {color: 0x330099, wireframe: true} ) 
          );
		avatar.self.controllerGrip1.add( runner );

		testLight = new THREE.Mesh( 
               new THREE.BoxGeometry( .1, .1, .1 ).translate( -.1, .05, .25 ),
               new THREE.MeshBasicMaterial( {color: 0x777777} ) );
		runner.add( testLight );
  
   
   avatar.self.controller2.addEventListener( 'selectstart', onSelectStart );
   avatar.self.controller2.addEventListener( 'selectend', onSelectEnd );

   avatar.addToRecon( consoleRecon );
   avatar.addToUpdate( consoleUpdate );
   
}
