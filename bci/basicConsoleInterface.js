//basic console interface 
const webOutput= document.getElementById('webOutput');
const webText= document.getElementById('webText');
const webButtons= document.getElementById('webButtons');

function getText(){
  return webText.value;
}

function clear(){
    webOutput.innerHTML="";
}

function pout(html){
  if(typeof html == null)
    html= typeof html;
  if(typeof html == undefined)
    html= '<em>undefined</em>';
  if(typeof html == 'object'){
    html= Object.keys(html).join('<br>');
    if(html=='') html= 'blank object';
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
    webText.value= text;
  });
  webButtons.appendChild(button);
}

function makeRunnableButton(name, fn){
  //.
}

function makeButtons(o){
  Object.keys(o).forEach( name=>{
   if(typeof o[name] == 'string')
    makeLoadableButton( name, o[name] );
  } );
}