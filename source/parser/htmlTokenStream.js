// Takes a string, splits it,
//    and returns an indexed array of
//    (type, text) tokens
//     type: 1)tag 2)endTag 3)text
//     text: tag name or raw text
// WARNING: edge cases unaccounted for

export const location= import.meta.url;

export function htmlTokenStream( html ){
  let chars= html.split('').filter(
    c => c != '\n'
  );
  let letters= [];
  let word;
  let result= [];
  let state= 0;
  for( let index= 0; index < chars.length; index++ ){
    let char= chars[index];
    switch( state ){
      case 0: 
        if( char == "<" ){
          state= 1;
        }
        break;
      case 1:
        if( (/\w/).test(char) ){
          letters.push(char);
        } else if( (/\s/).test(char) ){
          state= 2;
        } else if( ">" == char ){
          word= letters.join('');
          letters= [];
          result.push( {type:'tag',text:word} );
          state= 3;
        }
        break;
      case 2: 
        if( ">" == char ){
          word= letters.join('');
          letters= [];
          result.push( {type:'tag', text:word} );
          state= 3;
        }
        break;
      case 3:
        if( (/[\s\n\r]/).test(char) ){
          word= letters.join('');
          letters= [];
          result.push( {type:'text', text:word} );
          state= 4;
        } else if( "<" == char ){
          word= letters.join('');
          letters= [];
          result.push( {type:'text', text:word} );
          state= 5;
        } else {
          letters.push( char );
        }
        break;
      case 4:
        if( "<" == char ){
          word= letters.join('');
          letters= [];
          result.push( {type:'text', text:word} );
          state= 5;
        } else if( !(/\s/).test(char) ){
          letters.push( char );
        }
        break;
      case 5:
        if( "/" == char) state= 6;
        else {
          state= 1;
          index--;
        }
        break;
      case 6:
        if( (/\w/).test(char) ){
          letters.push( char );
        } else if( ">" == char ){
          word= letters.join('');
          letters= [];
          result.push( {type:'endTag', text:word} );
          state= 3;
        } else { state= 7; }
        break;
      case 7:
        if( ">" == char ){
          word= letters.join('');
          letters= [];
          result.push( {type:'endTag', text:word} );
          state= 3;
        }
        break;
      default:
        throw 'errorr';
    }
  }
  result.filter( token=> token != undefined );
  return result;
}