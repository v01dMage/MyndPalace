//Load controller events
//for Teleports. export 'floor' maker.

import * as THREE from 'three';
import * as vr from 'vr/vr.js';
import { BoxLineGeometry } from 'three/addons/geometries/BoxLineGeometry.js';

let grid, marker, floor, baseReferenceSpace;
let INTERSECTION;

init();

function onSelectStart(){}
function onSelectEnd(){
    if ( INTERSECTION ) {
       const offsetPosition = { 
          x: - INTERSECTION.x, y: - INTERSECTION.y, z: - INTERSECTION.z, w: 1 
       };
       const offsetRotation = new THREE.Quaternion();
       const transform = new XRRigidTransform( offsetPosition, offsetRotation );
       const teleportSpaceOffset = baseReferenceSpace.getOffsetReferenceSpace( transform );

       vr.self.renderer.xr.setReferenceSpace( teleportSpaceOffset );
    }
}

function init(){
    vr.self.renderer.xr.addEventListener( 'sessionstart', 
          () => baseReferenceSpace = vr.self.renderer.xr.getReferenceSpace() 
          );

    marker= new THREE.Mesh(
            new THREE.CircleGeometry( 0.5, 8 ).rotateX( - Math.PI / 2 ),
            new THREE.MeshBasicMaterial( { color: 0xbbccff } )
          );
    vr.self.scene.add( marker );

    floor = new THREE.Mesh(
            new THREE.PlaneGeometry( 30, 30, 2, 2 ).rotateX( - Math.PI / 2 ),
            new THREE.MeshBasicMaterial( { color: 0x22dd55, transparent: true, opacity: 0.5 } )
          );
    vr.self.scene.add( floor );

    grid = new THREE.LineSegments(
           new BoxLineGeometry( 50, .05, 50, 50, 1, 50 ).translate( 0, -0.06, 0 ),
           new THREE.LineBasicMaterial( { color: 0xbc44bc } )
         );
  vr.self.scene.add( grid ); 

    //vr.self.controller1.addEventListener( 'selectstart', onSelectStart );
    vr.self.controller1.addEventListener( 'selectend', onSelectEnd );

    vr.addToRecon( recon );
    vr.addToUpdate( update );
    
}

function recon(){
    INTERSECTION= undefined;

    if( vr.self.controller1.userData.isSelecting === true ){
        const intersects= vr.self.raycasterLeft.intersectObjects( [ floor ] ); 

        if ( intersects.length > 0 ) {
           INTERSECTION = intersects[ 0 ].point;
        }
    }
}

function update(){
    if ( INTERSECTION ) marker.position.copy( INTERSECTION );

    marker.visible= INTERSECTION !== undefined;
                                                       }
