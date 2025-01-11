//js test-option
//export base transpile switch

import { pout } from 'bci';

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
    p= `parser/${base}/${p}`;
    base= 'logopointer: '+p +'<br>';
    const { run }= await import(p);
    let ran= run( line.length );
    base+= ran.test +'<br>';
    base+= ran.run +'<br>';
    base+= ran.t +'<br>';
  } else {
   //default js
    base= 'base';
  }

  let out= `run ${base}
  <br>with options:<br>
     ${ opts.join(', ') }`;

  pout( '* '+ out );

  return out;
}