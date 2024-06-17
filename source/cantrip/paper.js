// export a function who
//  receives a width, height, thickness,
//  color, and text

import * as THREE from 'three';
import * as avatar from 'xr/cns.js'

export function conjurePaper( 
  width= .2, height= .25, thickness= .01,
  color= 0xeeeeaa, text= `lorem ipsum
dolor sit`
  ){
  const geo= new THREE.BoxGeometry( width, height, thickness );
  //ToDo make a canvas, ctx, text, and texture for map
  const mat= new THREE.MeshBasicMaterial( {color} );
  const mesh= new THREE.Mesh( geo, mat );
  avatar.self.scenes[0].add( mesh );
  return mesh;
}
