//js test-option
//export base transpile switch

import { pout } from 'bci';

export async function psiRun(text){
  //first line comment transpile options 
  let rest;
  let line= text.split('\n');
  if( typeof line != 'object' ){
    line= '//split failed to make object ';
  }else{
    [ line, ...rest ]= line;
    if( typeof line != 'string' ){
      line= '//line failed string check';
    }
  }
  let re= /^\/\/(.*)$/;
  let opts= line.match( re );
  opts= opts[0].split(' ');
  let base= opts.shift().substring(2);

  try{
    // source/parser/${base}/pointer.txt
    let p= await fetch(`source/parser/${base}/pointer.txt`).then(res=>res.text());
    p= `parser/${base}/${p}`;
    //base= 'pointer: '+p +'<br>';
    const { run }= await import(p);
    let ran= await run( rest );
    //base+= ran.test +'<br>';
    //base+= ran.run +'<br>';
    //base+= ran.t +'<br>';
  } catch(err){
    pout( err );
  }

  //pout( '* '+ base );

  //return true;
}