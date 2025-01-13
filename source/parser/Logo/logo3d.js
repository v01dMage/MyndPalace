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
import { avatar } from 'mp';
const THREE= avatar.js3;

class Turtle {
  const pen= { isDown: false, color: 0x33aa55 };
  constructor(){
    this.position= new Xyz();
    this.rotation= new Xyz();
    this.shapes= ['Sphere','Cylinder'];
  }
  
}

var isDown= false;

class Xyz {
  constructor( o={x:0,y:0,z:0} ){
    this.x = o.x;
    this.y = o.y;
    this.z = o.z;
  }
  
  toString() {
    return `x:${this.x}, y:${this.y}, z:${this.z}`;
  }
}

var position= new Xyz();
var rotation= new Xyz( position );

export var logo= { run, mv, pd, pu, fd };

export async function run( t ){
  t.forEach( expression=>{ 
    let parts= expression.split(' ');
    let cmd= parts.shift();
    logo[cmd]( parts );
  });
}

function mv( arr ){
  let [x,y,z]= arr;
  position.x= x;
  position.y= y;
  position.z= z;
}

function pd(){
  //pen down
  if( !isDown ){
    isDown= true;
    pout( "isDown: "+ isDown );
    //make sphere at position 
    let sphere= new THREE.Mesh(
      new THREE.SphereGeometry(),
      new THREE.MeshBasicMaterial(
        {color: 0x55cc77}
      )
    );
    let p= position;
    sphere.position.set( p.x, p.y, p.z );
    avatar.self.scene.add( sphere );
  }
}

function pu(){
  //pen up
  if( isDown ){
    isDown= false;
    pout( "isDown: "+ isDown );
  }
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