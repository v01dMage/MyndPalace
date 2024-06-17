// export a function who
//  receives a width, height, thickness,
//  color, and text

import * as THREE from 'three';
import * as avatar from 'xr/cns.js'

export function conjurePaper( 
  width= .2, height= .25, thickness= .01,
  color= "#ffaa00", textColor= "#0000ee", text= "lorem ipsum"
  ){
  const geo= new THREE.BoxGeometry( width, height, thickness );
  
  const canvas= document.createElement('canvas');
/*
  const ppc= 10; //pixels per centimeter
  //wrap all 6 edges
  const canvasWidth= 2* width* ppc+ 2* thickness* ppc;
  const canvasHeight= 2* thickness* ppc + height* ppc;
  canvas.width= canvasWidth;
  canvas.height= canvasHeight;
*/
  canvas.width= 400;
  canvas.height= 800;
  const ctx= canvas.getContext('2d');

  ctx.fillStyle= color;
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle= textColor;
  //ctx.font= '18px arial';
  //const tp= thickness* ppc;
  ctx.fillText(text, 5,5);
  //ctx.strokeText
  const map= new THREE.Texture( canvas );
  map.needsUpdate= true;
  map.mapping= THREE.EquirectangularReflectionMapping;
  map.colorSpace= THREE.SRGBColorSpace;

  const mat= new THREE.MeshBasicMaterial( {map} );
  const mesh= new THREE.Mesh( geo, mat );
  avatar.self.scenes[0].add( mesh );
  return mesh;
}
