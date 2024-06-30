// export a function who
//  takes a token stream array,then
//  layers, places, and measures tokens,
//  for a visual representation,
// then, creates the representation in Three 
//   dimensions, according to specs,
//   returning a Group of meshes.

export const location= import.meta.url;
import * as THREE from 'three';

export function visualizeHtml( tsa, specs ){
  let template= {
    baseWidth : 0.2, height : 0.2, thickness : 0.2, space : 0.01,
    colors : {tag: "#f94", endTag: "#44f", text: "#4f4" },
    font : "bold 30px Arial", fontColor : "#333",
    scalar : 4196, scene : undefined,
  };
  if( typeof specs == "object" ){
   Object.keys(template).forEach( detail=>{
    if( typeof specs[detail] != "undefined"){
      template[detail]= specs[detail];
    }
  });}
  let { baseWidth, height, thickness, space, colors, font, fontColor, scalar, scene }= template;
// proceed with function..

  let i= 0;
  let temp;
  let x= 0;
  let y= 0;
  let z= 0;
  let width;
  let halfWidth= baseWidth/2;

  tsa.forEach( token=>{
    token.index= i++;
    if( token.type == "text" ){
      token.y= y;
      token.x= x;
      x+= baseWidth+ space;
      token.z= z;
      token.width= baseWidth;
    } else if( token.type == "tag" ){
      token.x= x;
      x+= baseWidth+ space;
      token.y= y;
      y+= -height;
      x-= halfWidth;
      token.z= z;
      z+= thickness;
      token.width= baseWidth;
    } else { //type == endTag
      for( let j= i- 2; j> 0; j--){
        if( tsa[j].text == token.text ){
          token.y= tsa[j].y;
          y= tsa[j].y;
          token.z= tsa[j].z;
          z= tsa[j].z;
          token.x= tsa[j].x+ baseWidth;
          x+= halfWidth+ space;
          token.width= x- space- token.x;
          j= 0;
        }
      }
    }
  });

  
  let result= new THREE.Group();
  
  tsa.forEach( token=>{
    let color= colors[token.type];
    let brick;
    let paint= makeMat( token.text, { color, font, fontColor } );

    //Build the brick
    brick= new THREE.Mesh(
      new THREE.BoxGeometry( token.width, height, thickness ).translate( token.x, token.y, token.z ),
      paint
    );
    result.add( brick );
  } );

  return result;
}

function makeMat( text, style ){
  let canvas= document.createElement('canvas');
  canvas.width= 256;
  canvas.height= 256;
  const ctx= canvas.getContext('2d');

  ctx.fillStyle= style.color;
  ctx.fillRect(0,0,canvas.width, canvas.height);

  ctx.fillStyle= style.fontColor;
  ctx.font = style.font;
  ctx.fillText( text, 16, 64 );

  let map= new THREE.Texture( canvas );
  map.needsUpdate= true;
  map.colorSpace= THREE.SRGBColorSpace;

  const mat= new THREE.MeshBasicMaterial( {map} );
  return mat;
}