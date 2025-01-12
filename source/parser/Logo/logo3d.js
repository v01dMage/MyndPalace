// logo3d.js
// language specifications and 
//  transpiler functions

// traditional: fd, bk, rt, lt, pu, pd, 
//              color 0xrgb
//
// 3d: line: capsule, +
//     point: sphere, +
//     rigid: point cube and line cylinder ?
//     spin x,y,x hmmm
//     xt, yt, zt +/-° (rt === yt)
//    

import { pout } from 'bci';

export const test= 'test success';

var isDown= false;

class Xyz( o ){
  x : o.x || 0,
  y : o.y || 0,
  z : o.z || 0,
  toString(){
    return `x:${x}, y:${y}, z:${z}`;
  }
}

var position= new Xyz();
var rotation= new Xyz( position );

export var logo= { run, pd, fd };

export async function run( t ){
  t.forEach( expression=>{ 
    let parts= expression.split(' ');
    let cmd= parts.shift();
    logo[cmd]( parts );
  });
}

function pd(){
  //pen down
  isDown= true;
  pout( "isDown: "+ isDown );
}

function fd( d ){
  // forward d-distance
  // calculate new position from 
  //    rotation and distance 
  // create capsule geometry between 

  let old= new Xyz( position );
  pout( "pos: "+ old );
  pout( "distance: "+ d );
}