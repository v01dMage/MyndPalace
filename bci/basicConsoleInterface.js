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
  if(typeof html == null)
    html= typeof html;
  if(typeof html == undefined)
    html= '<em>undefined</em>';
  if(typeof html == 'object'){
    html= '{}'+html.toString();
  }
  let p= document.createElement('p');
  p.className= 'pout';
  p.innerHTML= html;
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
    let text= webText().value;
    let out= bci.avatar.self.psi(text);
    pout(out);
    return out;
  } );
}

const basicButtons= {
  '<i>Run</i>': basicConsoleRun,
  'hello': 'return "hello";',
  'clear': clear,
  'quickSave': quickSave,
  'restore': restoreQuickSave,
  'XR': importXR,
  'bci': `let list= Object.keys(bci);
list.forEach( piece=>{
  bci.pout(typeof bci[piece]+' : ');
  bci.pout( piece );
  bci.pout( bci[piece] );
});`,
};

function init(){
  makeButtons( basicButtons );
}
init();