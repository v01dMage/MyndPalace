// examples and fun

import * as avatar from 'xr/cns.js';
avatar.self.dnaStore(import.meta.url);

export let cantrips= {
  'hello' : ` avatar.self.console.ccout('hello');
return 'hello';`,
  'glbBanana' : `const { GLTFLoader }= await import( 'three/addons/loaders/GLTFLoader.js' )

const loader = new GLTFLoader();

loader.load( './assets/banana_3d_scanned.glb', function ( gltf ) {
        gltf.scene.position.y= 0.3;
        avatar.self.scenes[0].add( gltf.scene );

}, undefined, function ( error ) {
  avatar.self.console.ccout( error );
} );`,
  'bgcanvas': `let canvas= document.createElement('canvas');
canvas.width= 1024;
canvas.height= 1024;
let ctx= canvas.getContext("2d");

//insert art

let dataString= canvas.toDataURL();
let link= document.createElement('a');
link.setAttribute('download', '');
link.setAttribute('href', dataString );
link.innerHTML= 'download img';
document.body.appendChild(link);
//bci.pout?

let bg= new THREE.Texture(canvas);
bg.needsUpdate= true;
bg.mapping= THREE.EquirectangularReflectionMapping;
bg.colorSpace= THREE.SRGBColorSpace;
avatar.self.scenes[0].background= bg;

avatar.self.console.ccout(typeof link);
`,
  'buzz' : `avatar.gamepad.pulse('left', .99, 1000);

return '>°<';
  `,
  'skybox' : `const loader = new THREE.TextureLoader();
const texture = loader.load(
    './assets/download.png',
    () => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      avatar.self.scenes[0].background = texture;
    });
`,
  makeButton, makeButtons, cast
  };
makeButtons(cantrips);

async function cast(c){
try{
  if( typeof avatar.self.cantrips[c] != 'string' ){
    avatar.self.console.ccout('error: not a cantrip');
  }else {
   let res= await avatar.self.console.arun( avatar.self.cantrips[c] );
   avatar.self.console.ccout(res);
  }
}catch(err){
  avatar.self.console.ccout(err);
}
}

function makeButton(name, text){
  //xr button
}

function makeButtons(o){
  Object.keys(o).forEach( name=>{
   if(typeof o[name] == 'string')
    makeButton( name, o[name] );
  } );
}