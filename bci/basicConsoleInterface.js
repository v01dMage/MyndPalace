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

function cout(html){
  if(typeof html == null)
    html= typeof html;
  if(typeof html == undefined)
    html= '<em>undefined</em>';
  if(typeof html == 'object'){
    html= Object.keys(html).join('<br>');
    if(html=='') html= 'blank object';
  }
  let div= document.createElement('div');
  div.style= 'display: inline; border: none;';
  div.innerHTML= html;
  webOutput.appendChild( div );
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