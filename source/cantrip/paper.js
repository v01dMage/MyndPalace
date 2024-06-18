// export a function who
//  receives a width, height, thickness,
//  color, and text

import * as THREE from 'three';
import * as avatar from 'xr/cns.js'

export function conjurePaper( text= "lorem ipsum", specs ){
  let template= {
    width : 0.2, height : 0.25,
    thickness : 0.01, color : "#fa3",
    font : "bold 30px Arial", fontColor : "#333"
  };
  if( typeof specs == "object" ){
   Object.keys(template).forEach( detail=>{
    if( typeof specs[detail] != "undefined"){
      template[detail]= specs[detail];
    /*  avatar.self.console.cout(
        detail+' '+template[detail]+' : '+specs[detail]
      );*/
    }
  });}
  let { width, height, thickness, color, font, fontColor }= template;
// proceed with function..
  
  let lineHeight= font.split(" ").reduce(
    ( res, txt )=>{
        if(res) return res;
        return parseInt(txt);
    }, NaN 
  ); //Should return NaN or first parseable int

  
  const geo= new THREE.BoxGeometry( width, height, thickness );
  
  const canvas= document.createElement('canvas');
  const scalar= 4196;
  canvas.width= Math.floor(width* scalar);
  canvas.height= Math.floor(height* scalar);
  const ctx= canvas.getContext('2d');

  ctx.fillStyle= color;
  ctx.fillRect(0,0,canvas.width, canvas.height);

  ctx.fillStyle= fontColor;
  ctx.font = font;
  //Break text into printable lines, and fill
  let lh= lineHeight || 14;
  text.split("\n").forEach( (line, index)=>{
    ctx.fillText( line, lh, 3*lh+ index* 1.3*lh );
  } );

  const map= new THREE.Texture( canvas );
  map.needsUpdate= true;
  map.colorSpace= THREE.SRGBColorSpace;

  const mat= new THREE.MeshBasicMaterial( {map} );
  const mesh= new THREE.Mesh( geo, mat );
  avatar.self.scenes[0].add( mesh );
  return mesh;
}
