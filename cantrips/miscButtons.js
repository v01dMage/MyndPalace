// misc button examples and fun

let buttons= {
  'glbBanana' : `const { GLTFLoader }= await import( 'three/addons/loaders/GLTFLoader.js' )

const loader = new GLTFLoader();

loader.load( './assets/banana_3d_scanned.glb', function ( gltf ) {
        gltf.scene.position.y= 0.3;
        vr.self.scene.add( gltf.scene );

}, undefined, function ( error ) {

  let errdiv= document.createElement('div');
  errdiv.innerHTML = error;
  document.body.appendChild( errdiv );

} );`,
  'current' : `let ta= document.getElementById('consoleInput');
localStorage.current= ta.value;
return ':)';`,

  };
makeButtons(buttons);


function makeButton(name, text){
  let button, fun;
  fun= Function(`let ta= document.getElementById('consoleInput');
ta.value= \`${text}\``);
  button= document.createElement('button');
  button.innerHTML= name;
  button.addEventListener('click', fun);
  document.body.appendChild(button);
}

function makeButtons(o){
  Object.keys(o).forEach( name=>{
    makeButton( name, o.name );
  } );
}