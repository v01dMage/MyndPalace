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

function Capsule( a, b, h, r, c ){
  let d= Math.sqrt(
    (b.x-a.x)**2 +
    (b.y-a.y)**2 +
    (b.z-a.z)**2
  );
  let capsule= new THREE.CapsuleGeometry( r, d, 3, 5);
  let o= new THREE.Mesh(
    capsule, new THREE.MeshBasicMaterial(
      { color: c }
    )
  );
  o.rotateX(h.yd); o.rotateZ(h.xz);
  o.position.set( b.x, b.y, b.z );
  avatar.self.scene.add( o );
  return o;
}

function wait(ms){
  return new Promise( (resolve)=>{
    setTimeout( resolve, ms );
  });
}

//let priority= 1; //5; //adjust with ap
function log( msg, p ){
  //if( p < priority ){
    pout( msg );
  //}
}

class Turtle {
  constructor(t){
    log('new turtle started');
    let base= t? t:{
      timestep: 50,
      book: {},
      position: new Xyz(),
      rotation: new Xyz(),
      heading: new Heading( -Math.PI/2, 0, .1),
      shapes: ['Sphere','Cylinder'],
      pen: { isDown: true, color: 0x33aa55, size: 0.05},
    };
    this.timestep= base.timestep;
    this.book= Object.assign({}, base.book);
    this.building= [];
    this.loops= [];
    this.queue= [];
    this.position= new Xyz(base.position);
    this.rotation= new Xyz(base.rotation);
    let bh= base.heading;
    this.heading= new Heading( bh.xz, bh.yd, bh.m );
    this.shapes= base.shapes;
    this.pen= Object.assign({}, base.pen);
    this.latest= {};
    Object.keys(this.book).forEach( c=>{
      log('importing '+c);
      log( this.book[c] );
      this[c]= ()=>{
        this.irun( this.book[ c ] );
      };
    });
  }

  ts( arr ){
    this.timestep= Number.parseInt( arr[0] );
  }

  nu( arr ){ run( [arr[0]], this); }

  get hasMore(){
    return this.queue?.length > 0;
  }
  
  async irun( t ){
    let expression;
    this.queue= [...t, ...this.queue];
    log('** '+this.queue);
    while( this.hasMore ){
      expression= this.queue.shift();
      if( !expression ) continue;
      if( this.building.length == 0 ){
        let parts= expression.split(' ');
        let cmd= parts.shift();
        log( cmd +" : "+ parts );
        this[cmd]( parts );
        await wait( this.timestep ); 
     } else {
       let project= this.building[0];
       let first= expression.split(' ')[0];
       if( project == 'loop' ){
         if( first == 'repeat' ){
           this.repeat();
         } else if( first == 'loop' ){
           this.loop( expression );
         } else {
           this.loops[0].push( expression );
           log('+ '+ expression);
         }
       } else {
         if( first == 'end' ){ this.end();}
         else {
           this.book[ project ].push( expression );
         }
       }
     }
    }
  }

  construct( arr ){
    let name= arr.join('_');
    this.building.unshift( name );
    let project= [];
    this.book[name]= project;
    log( name );
  }

  repeat( arr ){
    this.building.unshift('loop');
    this.loops.unshift([]);
    log('repeat:layer '+this.loops.length);
  }
  loop( s ){
    let [,n,...q]= s.split(' ');
    n= Number.parseInt( n );
    let code= this.loops.shift().join('\n')+'\n';
    code= code.repeat( n );
    log('loop '+n+'\n'+code);
    this.building.shift();
    this.irun( code.split('\n') );
  }

  end( arr ){
    let name= this.building.shift();
    this[ name ]= ()=>{
      this.irun( [...this.book[ name ] ]);
    };
    log( name + 'constructed' );
    log( this.book[ name ] );
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
      log( color );
      arr[0]= color;
    }
    this.pen.color= Number.parseInt( arr[0], 16 );
  }
  

  sphere(){
    this.latest= Sphere( this.position, this.pen.size, this.pen.color );
  }
  capsule( p1 ){
    this.latest= Capsule(  p1, this.position, this.heading, this.pen.size, this.pen.color);
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
    let start= Object.assign({},this.position);
    let d= arr.map( Number.parseFloat ).shift();
    d*= this.heading.m;
    let [z,x]= rad2coords( this.heading.xz );
    let [y, yp]= rad2coords( this.heading.yd );
    z*= yp; x*= yp;
    this.position.x+= x *d;
    this.position.z+= z *d;
    this.position.y+= y *d;
    if( this.pen.isDown ) this.capsule( start );
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
  sz( arr ){
    this.pen.size= Number.parseFloat( arr[0] );
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

export async function run( t, o ){
  log('*'+t);
  let logo= new Turtle(o);
  logo.irun( t );
}


