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

function rad2coords( r ){
  return [ Math.sin(r), Math.cos(r) ];
}

const rc= 2*Math.PI;

function Sphere( pos, size, c ){
  let o= new THREE.Mesh(
          new THREE.SphereGeometry( size ),
          new THREE.MeshBasicMaterial(
            {color: c }
        )
      );
      o.position.set( pos.x, pos.y, pos.z );
      avatar.self.scene.add( o );
      return o;
}

class Turtle {
  constructor(t){
    let base= t? t:{
      book: {},
      position: new Xyz(),
      rotation: new Xyz(),
      heading: new Heading( -Math.PI/2, 0, .1),
      shapes: ['Sphere','Cylinder'],
      pen: { isDown: false, color: 0x33aa55, size: 0.05},
    };
    this.book= base.book;
    this.building= [];
    this.loops= [];
    this.position= base.position;
    this.rotation= base.rotation;
    this.heading= base.heading;
    this.shapes= base.shapes;
    this.pen= base.pen;
    this.latest= {};
  }

  nu( arr ){
    let t= new Turtle(this);
    t[arr[0]]();
    pout('...');
  }
  
  async run( t ){
   t.forEach( async expression=>{ 
    if( this.building.length == 0 ){
      let parts= expression.split(' ');
      let cmd= parts.shift();
      await this[cmd]( parts );
    } else {
      let first= expression.split(' ')[0];
      if( first == 'end' ){ this.end();
      } else if( first == 'loop' ){
        this.loop( expression );
      } else {
        let project= this.building[0];
        if( project == 'loop' ) project= this.loops[0];
        else project= this.book[ project ];
        project.push( expression );
      }
    }
   });
  }

  construct( arr ){
    let name= arr.join('_');
    this.building.unshift( name );
    let project= [];
    this.book[name]= project;
    pout( name );
  }

  repeat( arr ){
    this.building.unshift('loop');
    this.loops.unshift([]);
  }
  loop( s ){
    let [,n,...q]= s.split(' ');
    n= Number.parseInt( n );
    let code= this.loops.shift().join('\n')+'\n';
    code= code.repeat( n );
    this.building.shift();
    this.run( code.split('\n') );
  }

  end( arr ){
    let name= this.building.shift();
    this[ name ]= ()=>{
      this.run( this.book[ name ] );
    };
  }

  color( arr ){
    if( arr[0] == 'random' ){
      let opts= "0123456789abcdef";
      let r= ()=>{
        return Math.floor(Math.random()*16)
      };
      let color= '0x';
      while( color.length != 8 ){
        color+= opts[r()];
      }
      pout( color );
      arr[0]= color;
    }
    this.pen.color= Number.parseInt( arr[0], 16 );
  }
  

  sphere( arr ){
    this.latest= Sphere( this.position, this.pen.size, this.pen.color );
  }

  mv( arr ){
    let [x,y,z]= arr.map( Number.parseFloat );
    this.position.x= x;
    this.position.y= y;
    this.position.z= z;
    if( this.pen.isDown ){
      this.sphere();
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
    let [z,x]= rad2coords( this.heading.xz );
    let [y, yp]= rad2coords( this.heading.yd );
    z*= yp; x*= yp;
    this.position.x+= x *d;
    this.position.z+= z *d;
    this.position.y+= y *d;
    this.sphere(); //enum 1 after testing 
  }
  bk( arr ){
    this.fd( arr.map( n=>-1*n ) );
  }
  xt( arr ){
    let d= arr.map(Number.parseFloat).shift();
    this.heading.yd+= deg2rad( d );
  }
  yt( arr ){
    let d= arr.map(Number.parseFloat).shift();
    this.heading.xz+= deg2rad( d );
  }
  rt( arr ){
    this.yt( arr );
  }
  lt( arr ){
    this.yt( arr.map( n=>-1*n ) );
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

class Heading { //rad rad mag
  constructor( xz= 0, yd= 0,  m=0 ){
    this.xz= xz;
    this.yd= yd;
    this.m= m;
  }
}

export async function run( t ){
  let logo= new Turtle();
  logo.run( t );
}


