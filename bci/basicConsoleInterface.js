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
  makeLoadableButton( 'logo circle', `//Logo noopts
color 0xddb00b 
pd
mv 0 1 -.5
fd 10
rt 30
fd 10
rt 30
fd 10
rt 30
fd 10
rt 30
fd 10
rt 30
fd 10
rt 30
fd 10
rt 30
fd 10
rt 30
fd 10
rt 30
fd 10
rt 30
fd 10
rt 30
fd 10
rt 30
fd 10
rt 30
xt 30
fd 10
xt 30
fd 10
xt 30
fd 10
xt 30
fd 10
xt 30
fd 10
xt 30
fd 10
xt 30
fd 10
xt 30
fd 10
xt 30
fd 10
xt 30
fd 10
`);
  makeLoadableButton( 'logoTest', `//Logo noopts
color 0x3355ff
construct a b
pd
mv 0 1 -.1
mv 0 1 -.3
animate y_wave 1.5 0.5 1800
mv -.2 1 -.5
mv .2 1 -.5
end
color 0xffcc55
a_b
color 0xcc33dd
pd
mv 1 1 -.1
mv 1 1 -.3
animate y_wave 1.5 0.5 300
mv .8 1 -.5
mv 1.2 1 -.5
`);
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
