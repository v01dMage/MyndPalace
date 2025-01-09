//js test-option
//export base transpile switch

const webOutput= document.getElementById('webOutput');
const webText= ()=>document.getElementById('webText');
const webButtons= document.getElementById('webButtons');

function getText(){
  return webText().value;
}

function clear(){
    webOutput.innerHTML="";
}

async function pout(html){
  if(typeof html == null)
    html= typeof html;
  if(typeof html == undefined)
    html= '<em>undefined</em>';
  if(typeof html == 'object'){
    let s= html.toString();
    if( s==="[object Promise]" ){
      html= await html;
      s= html.toString();
    }
    let l= html.length;
    let k= Object.keys(html).join('<br>');

    html= k+'<br>'+s+'<br>length: '+l;
  }
  let p= document.createElement('p');
  p.className= 'pout';
  p.innerHTML= html;
  webOutput.appendChild( p );
}

export async function psiRun(text){
  //first line comment transpile options 
  let line= text.split('\n');
  if( typeof line != 'object' ){
    line= '//split failed to make object ';
  }else{
    line= line[0];
    if( typeof line != 'string' ){
      line= '//line failed string check';
    }
  }
  let re= /^\/\/(.*)$/;
  let opts= line.match( re );
  opts= opts[0].split(' ');
  let base= opts.shift().substring(2);

  if(base == "Logo"){
    // source/parser/${base}/pointer.txt
    let p= await fetch(`source/parser/${base}/pointer.txt`).then(res=>res.text());
    p= `../source/parser/${base}/${p}`;
    base= 'logopointer: '+p;
  } else {
   //default js
    base= 'base';
  }

  let out= `run ${base}
  with options:
     ${ opts.join(', ') }`;

  pout( '* '+ out );

  return out;
}