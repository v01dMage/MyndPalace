//js test-option
//export base transpile switch

export function psiRun(text){
let opts;
try{
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
  opts= line.match( re );
} catch(e){ opts= e;}

  return opts;
}