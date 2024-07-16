//basic console interface 
const webOutput= document.getElementById('webOutput');
const webText= document.getElementById('webText');
const webButtons= document.getElementById('webButtons');

function getText(){
  return webText.value;
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