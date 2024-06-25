// export a function who
//  takes a token stream array,then
//  layers, places, and measures tokens,
//  for a visual representation,
// then, creates the representation in Three 
//   dimensions, according to specs,
//   returning a Group of meshes.

import * as THREE from 'three';

export function visualizeHtml( tsa, specs ){
  let layers= [];
  let i= 0; //index
  let temp;

  tsa.forEach( token=>{
    if( layers[i] == undefined ){
      layers[i]= [];
    }
    if( token.type == "text" ){
      temp= layers[i].pop();
      if( temp?.type == "text" ){
        token.text+= temp.text+' '
      } else {
        layers[i].push( temp );
      }
      layers[i].push( token )
    } else if( token.type == "tag" ){
      layers[i++].push( token );
    } else { //type == endTag
      do {
        up:
        i--;
        if( i < 0 ){ //shouldn't get here..
          i= 0;
          layers[i].push( token );
          break;
        } else {
        popping:
          temp= layers[i].pop();
          if( temp == undefined ){
            layers.splice(i,1);
            continue up;
          }
          if( temp.text == token.text ){
            layers[i].push( temp );
            layers[i].push( token );
            break;
          } else {
            layers[i+1].shift( temp );
            continue popping;
          }
        }
      } while (true);
    }
  } );
  // Now, with layers arranged
  //   measurements and specs can be made

  let template= {
    fullWidth : 1, height : 0.2,
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
  // Find longest layer, calculate 
  // baseWidth

  layers.forEach( layer=>{
    layer.forEach( block=>{
      // Different types, different rules
      let color= colors[block.type];
      let brick;
      let paint; //make a material from canvas
      let width; //calculate if endtag or min
      let x,y,z;
      let lastCorner; //track for endTag

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