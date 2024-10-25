//js test-option
//export base transpile switch

export function psiRun(text){
  //first line comment transpile options 
  let line= text.split('\n')[0].trim();
  let re= /^\/\/(.*)$/;
  let opts= line.match( re );

  return opts;
}