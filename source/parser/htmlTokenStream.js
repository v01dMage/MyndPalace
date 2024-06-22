// Takes a string, splits it,
//    and returns a list of
//    (index, type, text) tokens
//     index: string start of tag or txt
//     type: 1)tag 2)end-tag 3)text
//     text: tag name or raw text
//

export function htmlTokenStream( html ){
  let letters= html.split('');
  let chars= [];
  let text= [];
  let tag= [];
  let endTag= [];
  let result= [];
  let state= 0;
  for( let index= 0; index < letters.length; index++ ){
    switch( state ){
      case 0: 
        break;
      case 1:
        break;
      case 2: 
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      default:
        throw 'errorr';
    }
  }
  return result;
}