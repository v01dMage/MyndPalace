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
let borderDifference= .05;
//loader promise for texture
// disc in then?

/*
let border= new THREE.Mesh(
  new THREE.?CylinderGeometry(?),
  new THREE.?meshBasicMaterial(?)
);
let disc= new THREE.Mesh(
  new THREE.?CylinderGeometry(?),
  new THREE.? texture
);
*/

vr.self.console.cout( 'movement loaded' );