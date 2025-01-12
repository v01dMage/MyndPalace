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
var position= {x:0, y:0, z:0 };
var rotation= {x:0, y:0, z:0 };

export var logo{ run, pd, fd };

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

  let old= Object.assign( {}, position );
  pout( "pos: "+ old.toString() );
  pout( "distance: "+ d )
}