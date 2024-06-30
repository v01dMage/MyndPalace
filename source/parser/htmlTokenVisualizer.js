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
  let layers= [];
  let i= 0; //index
  let temp;

  tsa.forEach( token=>{
    if( token == undefined ){ return; }
    if( layers[i] == undefined ){
      layers[i]= [];
    }
    if( token.type == "text" ){
      temp= layers[i].pop();
      if( temp && temp.type == "text" ){
        token.text= temp.text+' '+token.text;
      } else {
        layers[i].push( temp );
      }
      if( token.text != ' ' )
        layers[i].push( token );
    } else if( token.type == "tag" ){
      layers[i].push( token ); i++;
    } else { //type == endTag
      let unplaced= true; 
      placing: do {
        i--;
        if( i < 0 ){ //shouldn't get here..
          i= 0;
          layers[i].push( token );
          unplaced= false;
          break;
        } else {
      popping: while( unplaced ){
          temp= layers[i].pop();
          if( temp == undefined ){
            layers.splice(i,1);
            continue placing;
          }
          if( temp.text == token.text ){
            layers[i].push( temp );
            layers[i].push( token );
            unplaced= false;
            break;
          } else {
            layers[i+1].shift( temp );
            continue popping;
          }
        }}
      } while (unplaced);
    }
  } );
  // Now, with layers arranged
  //   measurements and specs can be made

  let template= {
    fullWidth : 10, height : 0.2,
    thickness : 0.2, colors : {tag: "#f94", endTag: "#44f", text: "#4f4" },
    font : "bold 30px Arial", fontColor : "#333",
    scalar : 4196, scene : undefined,
  };
  if( typeof specs == "object" ){
   Object.keys(template).forEach( detail=>{
    if( typeof specs[detail] != "undefined"){
      template[detail]= specs[detail];
    }
  });}
  let { fullWidth, height, thickness, colors, font, fontColor, scalar, scene }= template;
// proceed with function..
  let result= new THREE.Group();
  //  calculate baseWidth
  const baseWidth= fullWidth/( ( tsa.length* 1.2 )- .2- layers.length/ 2 );
  const ir= baseWidth; //index ratio
  
  let lastCorner; //track for endTag
  layers.forEach( (layer, li)=>{
    lastCorner= 0;
    layer.forEach( (block, bi)=>{
      if( block == undefined) return;
      // Different types, different rules
      let color= colors[block.type];
      let brick;
      let paint= makeMat( block.text, { color, font, fontColor } );
      
      let width; //calculate if endtag or min
      let x,y,z;
      
      if( block.type == "endTag" ){
        width= bi*ir- lastCorner;
        x= lastCorner;
        lastCorner= bi*ir+li*.5*ir;
      } else { 
        width= baseWidth; 
        x= bi*ir+ li*.5*ir;
        lastCorner= bi*ir+ baseWidth;
      }
      z= li* thickness;
      y= li* -height;
      //

      //Build the brick
      brick= new THREE.Mesh(
        new THREE.BoxGeometry(width, height, thickness ).translate( x, y, z ),
          paint
        );
      result.add( brick );
    } );
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