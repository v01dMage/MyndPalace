//Walking and rotate controls
// maybe perspective shift

import * as vr from 'vr/vr.js';
import * as THREE from 'three';

//Attach camera to a floating disc,
//  and use the gamepad for movement 
// WARN: incompatible with teleport?

// 2 cylinder discs, 1 thinner and wider
// other with clover5 jpg

let radius= .5;
let height= .1;
let borderDifference= .05;
//loader promise for texture
// disc in then?

let r= radius+ radius* borderDifference;
let h= height- height*borderDifference;
let border= new THREE.Mesh(
  new THREE.CylinderGeometry(r,r,h, 16, 1, true ),
  new THREE.MeshBasicMaterial( {color: 0x000000} )
);
ve.self.scenes[0].add( border );

/*
let disc= new THREE.Mesh(
  new THREE.?CylinderGeometry(?),
  new THREE.? texture
);
*/

vr.self.console.cout( 'movement loaded' );