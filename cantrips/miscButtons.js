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
  'ctrlrEvent': `let eventGrabber= function(event){
  let { t: type, data, target }= event;
  vr.self.console.cout(Object.keys(t).join('<br>'));
  vr.self.console.cout(Object.keys(data).join('<br>'));
  vr.self.console.cout(Object.keys(target).join('<br>'));
};
//vr.self.controller2.addEventListener('selectstart', eventGrabber);
vr.self.controller2.addEventListener('selectend', eventGrabber);
//vr.self.controller2.addEventListener('connected', eventGrabber);`,
  };
makeButtons(buttons);


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
    makeButton( name, o[name] );
  } );
}
