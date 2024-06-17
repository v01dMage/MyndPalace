// export a function who
//  receives a width, height, thickness,
//  color, and text

import * as THREE from 'three';
import * as avatar from 'xr/cns.js'

export function conjurePaper( 
  width= .2, height= .25, thickness= .01,
  color= "#eeeeaa", textColor= "#aaeeee", text= `lorem ipsum
dolor sit`
  ){
  const geo= new THREE.BoxGeometry( width, height, thickness );
  
  const canvas= document.createElement('canvas');
  const ppc= 10; //pixels per centimeter
  //wrap all 6 edges
  const canvasWidth= 2* width* ppc+ 2* thickness* ppc;
  const canvasHeight= 2* thickness* ppc + height* ppc;
  canvas.width= canvasWidth;
  canvas.height= canvasHeight;
  const ctx= canvas.getContext('2d');

  ctx.fillStyle= color;
  ctx.fillRect(0,0,canvasWidth, canvasHeight);
  ctx.fillStyle= textColor;
  //ctx.font
  const tp= thickness* ppc;
  ctx.fillText(text, tp+10,tp+10);
  //ctx.strokeText
  const map= new THREE.Texture( canvas );
  map.needsUpdate= true;
  map.colorSpace= THREE.SRGBColorSpace;

  const mat= new THREE.MeshBasicMaterial( {map} );
  const mesh= new THREE.Mesh( geo, mat );
  avatar.self.scenes[0].add( mesh );
  return mesh;
}
