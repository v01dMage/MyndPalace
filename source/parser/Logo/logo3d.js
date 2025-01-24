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
  constructor(){
    this.book= {};
    this.building= false;
    this.position= new Xyz();
    this.rotation= new Xyz();
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
    let name= logo.building;
    this[ name ]= ()=>{
      run( this.book[ name ] );
    };
    this.building= false;
    pout( this.book );
  }

  color( arr ){
    this.pen.color= Number.parseInt( arr[0], 16 );
  }

  mv( arr ){
    let [x,y,z]= arr.map( Number.parseFloat );
    this.position.x= x;
    this.position.y= y;
    this.position.z= z;
    if( this.pen.isDown ){
      let sphere= new THREE.Mesh(
        new THREE.SphereGeometry(.1),
        new THREE.MeshBasicMaterial(
          {color: this.pen.color }
        )
      );
      let p= this.position;
      sphere.position.set( p.x, p.y, p.z );
      avatar.self.scene.add( sphere );
      this.latest= sphere;
    }
  }

  pd(){ 
    this.pen.isDown= true;
  }
  pu(){
    this.pen.isDown= false;
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


