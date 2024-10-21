//export base transpile switch

export function psiRun(text){
  //first line comment transpile options 
  let opts= text.match( /^\/\/.*\n/ );
  
  return opts;
}