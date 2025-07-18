//basic console interface 
const webOutput= document.getElementById('webOutput');
const webText= ()=>document.getElementById('webText');
const webButtons= document.getElementById('webButtons');

function getText(){
  return webText().value;
}

function clear(){
    webOutput.innerHTML="";
}

export async function pout(html){
  let [b4, fin]= ['',''];
  if(typeof html == null)
    html= typeof html;
  if(typeof html == undefined)
    html= 'undefined';
    [b4, fin]= ['<em>','</em>'];
  if(typeof html == 'object'){
    html= html.toString();
    [b4, fin]= ['<b>{ ',' }</b>'];
  }
  if(typeof html == 'function'){
    [b4, fin]= ['<code>','</code>'];
  }
  let p= document.createElement('p');
  p.className= 'pout';
  let formatted= html.toString()
    .replace(/&/g, '&amp')
    .replace(/</g, '&lt')
    .replace(/>/g, '&gt')
    .replace(/\n/g,'<br>')
    .replace(/\s\s/g, '&nbsp&nbsp');
  p.innerHTML= b4+ formatted +fin;
  webOutput.appendChild( p );
}

function makeLoadableButton(name, text){
  let button= document.createElement('button');
  button.innerHTML= name;
  button.addEventListener('click', ()=>{
    webText().value= text;
  });
  webButtons.appendChild(button);
}

function makeRunnableButton(name, fn){
  let button= document.createElement('button');
  button.innerHTML= name;
  button.className= "runnable";
  button.addEventListener('click', fn );
  webButtons.appendChild(button);
}

function makeButtons(o){
  Object.keys(o).forEach( name=>{
    if(typeof o[name] == 'string')
      makeLoadableButton( name, o[name] );
    else makeRunnableButton( name, o[name] );
  } );
}

let bci= { makeLoadableButton,
  makeRunnableButton,
  getText, pout, clear,
  brun: basicConsoleRun, 
};
async function basicConsoleRun(){
  let f= getText();
  let out;
  try{
    out= await (( Function(`return async function (bci){${f}}`) )())(bci);
  } catch(err){
     out= err;
     if(err.message){ out= err.message; }
  }
  if(out) pout(out);
}

async function quickSave(){
  localStorage.quickSave= getText(); 
  pout('save run');
}

async function restoreQuickSave(){
  webText().value= localStorage.quickSave; 
  pout('restore run');
}

async function importXR(){
  import('../bci/MyndPalace.js').then(
    mod=>{ bci.avatar= mod.avatar }
  );
  pout('Loading bci.avatar...');
  makeRunnableButton('psi', ()=>{ 
    bci.avatar.self.psi( webText().value );
  } );
  makeLoadableButton( 'sierpunkski', `function sierpunkski(d,n){
  let hd= d/2;
  let points= [ 
    [-hd , 0,  1], 
    [hd , 0,  1], 
    [0, 0, 1+ d], 
    [0, d, 1+hd] ];
  let rand= function (){
    return Math.floor(Math.random()* points.length);
  };
  let lastPoint= [hd,hd,hd];
  let halfway= function(){
    let r= points[rand()];
    let o= [(r[0]+lastPoint[0])/2,
      (r[1]+lastPoint[1])/2,
      (r[2]+lastPoint[2])/2];
    lastPoint= o;
    return o;
  };
  let out= \`//Logo noopts
color 0xffaa00
ts 10
setWire true
\`;
  for(let i= 0; i< n; i++){
    let [x,y,z]= halfway();
    out+= \`mv \${x} \${y} \${z}
\`;
  }
  return out;
}

bci.avatar.self.psi( sierpunkski(6, 6000));
`);
  makeLoadableButton( 'logo grass', `//Logo noopts
mat MeshStandardMaterial
color random 
ts 300
construct grass
mat MeshStandardMaterial
color random
pd
xt 83
fd 2
ts 200
repeat
fd 6
loop 5
light 0x55ff77 40 1.9 2
end
color random 
fd 1
animate y_wave 1.5 0.5 300
light 0xccff33 5 1.5 2
animate y_wave 1.5 0.5 300
color random 
repeat
fd 5
nu grass
rt 30
loop 11
`);
  makeLoadableButton('logo art',`//Logo art
construct arm
mat MeshStandardMaterial
lt 90
repeat
lt 6
fd 3
loop 12
light 0xffffff 40 14
repeat
rt 9
fd 3
loop 12
end
setShape fd sphere
ts 5000
ts 167
repeat
mv 0 10 -5
light 0xffffff 40 14
color random
repeat
nu arm
rt 30
fd 7
loop 12
setShape fd capsule
ts 66
loop 2
`);
  makeLoadableButton( 'logoTest', `//Logo noopts
ts 150 
color random
construct hoop
color random 
lt 90
repeat
xt 15
fd 2
loop 24
rt 90
end
repeat
repeat
repeat
fd 1
loop 5
fd 2
rt 15
hoop
fd 2
hoop 
rt 15
fd 2
rt 15
loop 8
lt 180
loop 2
xt 90
color 0xffbb33
fd 1
animate y_wave 3 2 2000
`);
  makeLoadableButton('wip_clearScene',`let bas= bci.avatar.self;
bas.scene= new bci.avatar.js3.Scene();
bas.scenes[0]= bas.scene;
bas.repaint( bas.paintStarfield(1000,500,3333) );
return 'done*'
  `);
  makeRunnableButton('discQuaternion',dq);
  makeRunnableButton('vrWrapPsi', wpsi);
  makeLoadableButton('import tree', `import('../tests/logotree.js');
let gotoPlaces= function (tp){
  tp.forEach( ([t,p])=>{
    setTimeout( ()=>{
      bci.avatar.self.disc.position.set(
        p.x, p.y, p.z
      );
      bci.avatar.self.disc.rotation.y= p.h;
    }, t*1000 );
  } );
};
gotoPlaces([
  [1, {x: 0, y: 0, z: 0, h: -1.7}],
  [15, {x: 3, y: -25, z: -15, h: -1.6}],
  [45, {x: 0, y: -25, z: -40, h: -1.7}],
  [60, {x: -3, y: -25, z: -80, h: 1.8}],
  [70, {x: -3, y: -5, z: -70, h: 1.9}],
  [90, {x: -10, y: 10, z: -90, h: 2.2}],
]);
`);
  makeLoadableButton('shader tests',`import('../tests/shadertests.js');
  bci.pout('loading <i>shadertests.js</i>')
`);
}

function dq(){
  pout( bci.avatar.self.disc.quaternion.toArray() );
}
function wpsi(){
  let base= webText().value;
  let out= 'avatar.self.psi(`'+ base +'`);';
  webText().value= out;
  pout( 'psi wrapped for vr' );
}

const basicButtons= {
  '<i>Run</i>': basicConsoleRun,
  'hello': 'return "hello";',
  'clear': clear,
  'quickSave': quickSave,
  'restore': restoreQuickSave,
  'wipe': ()=>webText().value='',
  'XR': importXR,
  'bci': `let list= Object.keys(bci);
list.forEach( piece=>{
  bci.pout(typeof bci[piece]+' : '+ piece);
  bci.pout( bci[piece] );
});`,
};

function init(){
  makeButtons( basicButtons );
}
init();
