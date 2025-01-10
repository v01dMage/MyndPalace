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
    p= `../source/parser/${base}/${p}`;
    base= 'logopointer: '+p +'<br>';
    import(p).then( mod=> base+= mod.test );
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