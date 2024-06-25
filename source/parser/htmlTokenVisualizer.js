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


}