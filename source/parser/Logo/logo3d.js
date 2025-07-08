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
import { Cuboid, Fern } from 'inv/shaders/basicShaders.js';
const THREE= avatar.js3;

const cache= {Sphere:{},Mats:{}};

function deg2rad( d ){
  return d/360*(2*Math.PI);
}

function rad2coords( r ){
  return [ Math.sin(r), Math.cos(r) ];
}

const rc= 2*Math.PI;

function Sphere( pos, size, c, mat, wire ){
  let geo= cache.Sphere['_'+size]? cache.Sphere['_'+size] :
            cache.Sphere['_'+size]= new THREE.SphereGeometry( size );
  let matC= cache.Mats['_'+c]? cache.Mats['_'+c] :
            cache.Mats['_'+c]= new THREE[mat]( {color: c, wireframe: wire} );
  let o= new THREE.Mesh( geo, matC );
  o.recieveShadow= true;
  o.position.set( pos.x, pos.y, pos.z );
  avatar.self.scene.add( o );
  return o;
}

function Cube( t ){
  let s= t.pen.size;
  let o= new THREE.Mesh(
    new THREE.BoxGeometry( s,s,s ),
   // new THREE[t.material]( {color: t.pen.color} )
    Cuboid
  );
  o.recieveShadow= true;
  let {x,y,z}= t.position;
  o.position.set( x,y,z );
  avatar.self.scene.add(o);
  return o;
}

function Capsule( a, b, h, r, c, t, mat ){
  let d= Math.sqrt(
    (b.x-a.x)**2 +
    (b.y-a.y)**2 +
    (b.z-a.z)**2
  );
  let hp= Math.PI/2;
  let capsule= new THREE.CapsuleGeometry( r, d, 3, 5);
  //capsule.applyQuaternion( t.quaternion )
  capsule.translate( 0, d/2 ,0 );
  capsule.rotateX( hp- h.yd );
  capsule.rotateY( hp- h.xz );
  //capsule.translate( 0, d/2 ,0 );
  let m= typeof mat == 'object' ?
    mat :
    new THREE[mat](
      { color: c }
    );
  let o= new THREE.Mesh( capsule, m ); 
  o.recieveShadow= true;
  //o.applyQuaternion( t.quaternion );
  o.position.set( a.x, a.y, a.z );
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
    //log('new turtle started');
    let base= t? t:{
      timestep: 50,
      book: {},
      position: new Xyz(),
      rotation: new Xyz(),
      heading: new Heading( -Math.PI/2, 0, .1),
      shapes: { fd: 'capsule' , mv: 'sphere' }, 
      pen: { isDown: true, color: 0x33aa55, size: 0.05},
      quaternion: new THREE.Quaternion( 0,0,0,1 ),
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
    this.shapes= Object.assign({},base.shapes);
    this.material= "MeshBasicMaterial";
    this.wire= false;
    this.pen= Object.assign({}, base.pen);
    this.latest= {};
    Object.keys(this.book).forEach( c=>{
      //log('importing '+c);
      //log( this.book[c] );
      this[c]= async ()=>{
        this.queue= [ ...this.book[ c ], ...this.queue];
      };
    });
    this.quaternion= new THREE.Quaternion();
    this.quaternion.copy( base.quaternion );
    this.turtle= new THREE.Mesh(
      new THREE.CapsuleGeometry( 0.06, 0.02, 3, 5 ),
      new THREE.MeshBasicMaterial(
        { color: 0x33ff44, wireframe: true }
      )
    );
    this.turtle.position.set(
      this.position.x,
      this.position.y,
      this.position.z
    );
    this.turtle.quaternion.copy(
      this.quaternion
    );
    avatar.self.scene.add( this.turtle );
  }

  async ts( arr ){
    this.timestep= Number.parseInt( arr[0] );
  }

  async nu( arr ){ run( [arr[0]], this); }

  get hasMore(){
    return this.queue?.length > 0;
  }
  
  async irun( t ){
    let expression;
    this.queue= t;
    //log('** '+this.queue);
    while( this.hasMore ){
      expression= this.queue.shift();
      if( !expression ) continue;
      if( this.building.length == 0 ){
        let parts= expression.split(' ');
        let cmd= parts.shift();
        //log( cmd +" : "+ parts );
        await this[cmd]( parts ); 
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
           //log('+ '+ expression);
         }
       } else {
         if( first == 'end' ){ this.end();}
         else {
           this.book[ project ].push( expression );
         }
       }
     }
    }
    this.turtle.visible= false;
  }

  async construct( arr ){
    let name= arr.join('_');
    this.building.unshift( name );
    let project= [];
    this.book[name]= project;
    //log( name );
  }

  async repeat( arr ){
    this.building.unshift('loop');
    this.loops.unshift([]);
    //log('repeat:layer '+this.loops.length);
  }
  async loop( s ){
    let [,n,...q]= s.split(' ');
    n= Number.parseInt( n );
    let code= this.loops.shift().join('\n')+'\n';
    code= code.repeat( n );
    //log('loop '+n+'\n'+code);
    this.building.shift();
    this.queue= [...code.split('\n'),...this.queue];
  }

  async end( arr ){
    let name= this.building.shift();
    this[ name ]= async ()=>{
      this.queue= [...this.book[ name ], ...this.queue ];
    };
    //log( name + 'constructed' );
    //log( this.book[ name ] );
  }

  async color( arr ){
    if( arr[0] == 'random' ){
      let opts= "0123456789abcdef";
      let r= ()=>{
        return Math.floor(Math.random()*16)
      };
      let color= '0x';
      while( color.length != 8 ){
        color+= opts[r()];
      }
      //log( color );
      arr[0]= color;
    }
    this.pen.color= Number.parseInt( arr[0], 16 );
  }

  async setWire( tf ){
    this.wire= Boolean( tf );
  }

  sphere(){
    this.latest= Sphere( this.position, this.pen.size, this.pen.color, this.material, this.wire );
  }
  cube(){
    this.latest= Cube( this );
  }
  capsule( p1 ){
    this.latest= Capsule(  p1, this.position, this.heading, this.pen.size, this.pen.color, this.turtle, this.material );
  }
  fern( p1 ){
    this.latest= Capsule(  p1, this.position, this.heading, this.pen.size, this.pen.color, this.turtle, Fern );
  }

  async light( arr ){
    await wait( this.timestep/2 );
    // Drop a point light 
    let [ hex, ...n]= arr;
    let color= Number.parseInt( hex, 16 );
    let [ intensity, distance, decay ]= n.map( Number.parseFloat );
    const l= new THREE.PointLight(
      color, intensity, distance, decay
    );
    l.castShadow= true;
    l.position.set( this.position.x, this.position.y, this.position.z );
    avatar.self.scene.add( l );
    this.latest= l;
  }

  async mv( arr ){
    await wait( this.timestep );
    let [x,y,z]= arr.map( Number.parseFloat );
    this.position.x= x;
    this.position.y= y;
    this.position.z= z;
    if( this.pen.isDown ){
      this[this.shapes.mv]( this.latest.position );
    }
    this.turtle.position.set(x,y,z);
  }

  async pd(){ 
    this.pen.isDown= true;
  }
  async pu(){
    this.pen.isDown= false;
  }
  async fd( arr ){
    await wait( this.timestep );
    let start= Object.assign({},this.position);
    let d= arr.map( Number.parseFloat ).shift();
    d*= this.heading.m;
    let [z,x]= rad2coords( this.heading.xz );
    let [y, yp]= rad2coords( this.heading.yd );
    z*= yp; x*= yp;
    this.position.x+= x *d;
    this.position.z+= z *d;
    this.position.y+= y *d;
    this.turtle.position.set(
      this.position.x,
      this.position.y,
      this.position.z
    );
    if( this.pen.isDown ) this[this.shapes.fd]( start );
  }
  async bk( arr ){
    return this.fd( arr.map( n=>-1*n ) );
  }
  async xt( arr ){
    await wait( this.timestep );
    let d= arr.map(Number.parseFloat).shift();
    this.heading.yd+= deg2rad( d );
    //let v= new THREE.Vector3( 1,0,0).normalize();
    this.turtle.rotateX( -deg2rad( d ));
    this.quaternion.copy( this.turtle.quaternion );
  }
  async yt( arr ){
    await wait( this.timestep );
    let d= arr.map(Number.parseFloat).shift();
    this.heading.xz+= deg2rad( d );
    let v= new THREE.Vector3( 0,1,0).normalize();
    this.turtle.rotateY( deg2rad( d ));
    this.quaternion.copy( this.turtle.quaternion );
  }
  async rt( arr ){
    return this.yt( arr );
  }
  async lt( arr ){
    return this.yt( arr.map( n=>-1*n ) );
  }
  async sz( arr ){
    this.pen.size= Number.parseFloat( arr[0] );
  }
  async mat( arr ){
    this.material= arr[0];
  }
  async setShape( arr ){
    this.shapes[ arr[0] ]= arr[1]; 
  }

  async animate( arr ){
    let method= arr.shift();
    let upfn= this[ method ](arr);
    //log( upfn );
    avatar.addToUpdate( upfn );
  }

  rotate( arr ){
    let axis= 'rotate'+arr.shift();
    //log( axis );
    let [rads, ms]= arr.map( Number.parseFloat );
    //log(rads+',  '+ms)
    let rotateFn= this.latest[axis];
    //log(rotateFn);
    let obj= this.latest;
    return (o)=>{
      obj[axis]( rads/ms* o.deltaTime );
    };
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
  //log('*'+t);
  let logo= new Turtle(o);
  logo.irun( t );
}


