// misc button examples and fun

export let cantrips= {
  'hello' : ` avatar.self.console.cout('hello');
return 'hello';`,
  'glbBanana' : `const { GLTFLoader }= await import( 'three/addons/loaders/GLTFLoader.js' )

const loader = new GLTFLoader();

loader.load( './assets/banana_3d_scanned.glb', function ( gltf ) {
        gltf.scene.position.y= 0.3;
        avatar.self.scenes[0].add( gltf.scene );

}, undefined, function ( error ) {

  let errdiv= document.createElement('div');
  errdiv.innerHTML = error;
  document.body.appendChild( errdiv );

} );`,
  'canvas': `let canvas= document.createElement('canvas');
canvas.width= 1024;
canvas.height= 1024;
let ctx= canvas.getContext("2d");


let dataString= canvas.toDataURL();
let link= document.createElement('a');
link.setAttribute('download', '');
link.setAttribute('href', dataString );
link.innerHTML= 'download img';
document.body.appendChild(link);

avatar.self.console.cout(typeof link);
`,
  'buzz' : `avatar.gamepad.pulse('left', .99, 1000);

return '>°<';
  `,
  'focus' : `avatar.self.consoleInput.focus();
return '?';
`,
  makeButton, makeButtons, cast
  };
makeButtons(cantrips);

function cast(c){
try{
  if( typeof cantrips[c] != 'string' ){
    avatar.self.console.ccout('error: not a cantrip');
  }else {
    avatar.self.console.arun( cantrips[c] ).then(
       res=>{ avatar.self.console.ccout(res); }
    );
  }
}catch(err){
  avatar.self.console.cout(err);
}
}

function makeButton(name, text){
  let button= document.createElement('button');
  button.innerHTML= name;
  button.addEventListener('click', ()=>{
    let ta= document.getElementById('consoleInput');
    ta.value= text;
  });
  document.body.appendChild(button);
}

function makeButtons(o){
  Object.keys(o).forEach( name=>{
   if(typeof o[name] == 'string')
    makeButton( name, o[name] );
  } );
}
