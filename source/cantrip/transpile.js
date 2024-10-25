//js test-option
//export base transpile switch

export function psiRun(text){
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
  //if( opts ) opts= opts[0]
  return opts;
}