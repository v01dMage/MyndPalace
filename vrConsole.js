//separate console logic
import * as THREE from'three';

// init( c ) where c is a controller 
  export const vrConsole={
    init: function ( c ){ // c= controllerGrip1
      // consoleVR
        let cFrame, cScreen, cPlane;
        cFrame = new THREE.Mesh(
            new THREE.BoxGeometry( .1, .1, .01 ),
            new THREE.MeshPhongMaterial( {color: 0x229933} ) );
        c.add( cFrame );

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
