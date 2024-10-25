//js test-option
//export base transpile switch

export function psiRun(text){
  //first line comment transpile options 
  let re= /^(.*\s*)*[\r\n|\r|\n]?/;
  let opts= text.match( re );

  return opts;
}