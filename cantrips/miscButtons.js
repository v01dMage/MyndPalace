// misc button examples and fun

let button;
button= document.createElement('button');
button.innerHTML= 'glbBanana';
button.addEventListener('click', function(){

let ta= document.getElementById('consoleInput');
ta.value=`const { GLTFLoader }= await import( 'three/addons/loaders/GLTFLoader.js' )

const loader = new GLTFLoader();

loader.load( './assets/banana_3d_scanned.glb', function ( gltf ) {

        vr.self.scene.add( gltf.scene );

}, undefined, function ( error ) {

  let errdiv= document.createElement('div');
  errdiv.innerHTML = error;
  document.body.appendChild( errdiv );

} );`;
});
document.body.appendChild(button);
