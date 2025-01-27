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

function deg2rad( d ){
  return d/360*(2*Math.PI);
}

class Turtle {
  constructor(){
    this.book= {};
    this.building= false;
    this.position= new Xyz();
    this.rotation= new Xyz();
    this.heading= new vec3(0,0,-1,.01);
    this.shapes= ['Sphere','Cylinder'];
    this.pen= { isDown: false, color: 0x33aa55 };
    this.latest= {};
  }

  construct( arr ){
    let name= arr.join('_');
    this.building= name;
    let project= [];
    this.book[name]= project;
    pout( name );
  }

  end( arr ){
    let name= this.building;
    this[ name ]= ()=>{
      run( this.book[ name ] );
    };
    this.building= false;
    pout( this.book );
  }

  color( arr ){
    this.pen.color= Number.parseInt( arr[0], 16 );
  }

  sphere( arr ){
    let o= new THREE.Mesh(
        new THREE.SphereGeometry(.1),
        new THREE.MeshBasicMaterial(
          {color: this.pen.color }
        )
      );
      let p= this.position;
      o.position.set( p.x, p.y, p.z );
      avatar.self.scene.add( o );
      this.latest= o;
  }

  mv( arr ){
    let [x,y,z]= arr.map( Number.parseFloat );
    this.position.x= x;
    this.position.y= y;
    this.position.z= z;
    if( this.pen.isDown ){
      sphere();
    }
  }

  pd(){ 
    this.pen.isDown= true;
  }
  pu(){
    this.pen.isDown= false;
  }
  fd( arr ){
    let d= arr.map( Number.parseFloat ).shift();
    d*= this.heading.m;
    this.position.x+= this.heading.x *d;
    this.position.y+= this.heading.y *d;
    this.position.z+= this.heading.z *d;
    sphere(); //enum 1 after testing 
  }
  bk( arr ){
    fd( arr.map( n=>-1*n ) );
  }
  yt( arr ){
    let rc= 2*Math.PI;
    pout('radian circle size:' + rc);
    let d= arr.map(Number.parseFloat).shift();
    pout('d: '+d);
    this.heading.y+= deg2rad( d );
    if(this.heading.y > rc)
      this.heading.y-= rc;
    if(this.heading.y < -1*rc)
      this.heading.y+= rc;
  }
  rt( arr ){
    yt( arr );
  }
  lt( arr ){
    yt( arr.map( n=>-1*n ) );
  }

  animate( arr ){
    let method= arr.shift();
    let upfn= this[ method ](arr);
    avatar.addToUpdate( upfn );
  }

  y_wave( arr ){
    let [top,bottom,ms]= arr.map( Number.parseFloat );
    let d= top- bottom;
    let obj= this.latest;
    return (o)=>{
      let {x,y,z}= obj.position;
      y= (1+Math.sin( o.now/ms ))/2*d+ bottom;
      obj.position.set( x, y, z );
    };
  }

}

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

class vec3 {
  constructor( x= 0, y= 0, z=0, m=0 ){
    this.x= x;
    this.y= y;
    this.z= z;
    this.m= m;
  }
}

export async function run( t ){
  let logo= new Turtle();
  t.forEach( expression=>{ 
    if( !logo.building ){
      let parts= expression.split(' ');
      let cmd= parts.shift();
      logo[cmd]( parts );
    } else {
      if( expression == 'end' ) logo.end();
      else logo.book[ logo.building ].push( expression );
      pout( '+' );
    }
  });
}


