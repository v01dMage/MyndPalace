//separate console logic
import * as THREE from'three';
import { vr } from 'vr/VRBoilerplate.js';

function onSelectStart(){
    // Highlight runner
    if( runner.userData.isSelecting == true ) {
        runner.material.color.setHex( 0x44aa44 );
     } else {
        runner.material.color.setHex( 0x4444aa );
     }
}

function onSelectEnd(){
    if( runner.userData.isSelecting === true ){
      // capsule purple
       runner.material.color.setHex( 0xcc22cc );
      // cube red
       testLight.material.color.setHex( 0xdd5555 );
       cScreen.remove( cPlane );
       cPlane= createText( d20()+" rigged d4", .02 );
       cPlane.position.z+= .02;
       cScreen.add( cPlane );
}

function pipeline(){}

export const vrConsole={
    init: function (){ 
      // consoleVR
        let cFrame, cScreen, cPlane;
        cFrame = new THREE.Mesh(
            new THREE.BoxGeometry( .1, .1, .01 ),
            new THREE.MeshPhongMaterial( {color: 0x229933} ) );
        vr.controllerGrip1.add( cFrame );

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

        cPlane= createText( d20(), .1 );
        cPlane.position.z+= .02;
        cScreen.add( cPlane );
    }
  };
