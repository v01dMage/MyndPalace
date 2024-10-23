//export base transpile switch

export function psiRun(text){
  //first line comment transpile options 
  let re= /^(.*)[\r\n|\r|\n]/;
  let opts= text.match( re );

  return opts;
}