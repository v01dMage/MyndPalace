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
    colors : {startTag: "#ee8", loneTag: "#fa4", endTag: "#88f", text: "#4f4" },
    font : "bold 30px Arial", fontColor : "#212",
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

  let x= 0;
  let y= 0;
  let z= 0;
  let width;
  let halfWidth= baseWidth/2;
  let result= new THREE.Group();

  tsa.forEach( (token, index, arr)=>{
    if( token.type == "loneTag" ){
      token.y= y;
      token.x= x;
      x+= baseWidth+ space;
      token.z= z;
      token.width= baseWidth;
    } else if( token.type == "text" ){
      token.y= y;
      token.x= x+ halfWidth;
      x+= baseWidth+ baseWidth+ space;
      token.z= z;
      token.width= 2* baseWidth;
    } else if( token.type == "startTag" ){
      token.x= x;
      x+= baseWidth+ space;
      token.y= y;
      y+= -height;
      x-= halfWidth;
      token.z= z;
      z+= thickness;
      token.width= baseWidth;
    } else { //type == endTag
      for( let j= index- 1; j >= 0; j--){
        const prior= arr[j];
        if( prior.text == token.text ){
          token.y= prior.y;
          y= prior.y;
          token.z= prior.z;
          z= prior.z;
          x+= halfWidth+ space;
          token.width= x- space- baseWidth- prior.x;
          token.x= token.width/2+ prior.x+ halfWidth;
          j= 0;
        }
      }
      if( token.width == undefined ){
        token.y= y;
        token.x= x;
        x+= baseWidth+ space;
        token.z= z;
        token.width= baseWidth;
      }
    }

    let color= colors[token.type];
    let paint= makeMat( token.text, { color, font, fontColor } );
    let brick= new THREE.Mesh(
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
