//js test-option
//export base transpile switch

import { pout } from 'bci';

export async function psiRun(text){
  //first line comment transpile options 
  let [ line, ...rest ]= text.split('\n');
  
  let re= /^\/\/(.*)$/;
  let opts= line.match( re );
  opts= opts[0].split(' ');
  let base= opts.shift().substring(2);

  try{

    let p= await fetch(`source/parser/${base}/pointer.txt`).then(res=>res.text());
    p= `parser/${base}/${p}`;
    const { run }= await import(p);
    run( rest );

  } catch(err){
    pout( err );
  }
}