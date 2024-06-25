// Takes a string, splits it,
//    and returns a list of
//    (index, type, text) tokens
//     index: string start of tag or txt
//     type: 1)tag 2)end-tag 3)text
//     text: tag name or raw text
//

export function htmlTokenStream( html ){
  let chars= html.split('');
  let letters= [];
  let text= [];
  let tag= [];
  let endTag= [];
  let result;
  let state= 0;
  for( let index= 0; index < chars.length; index++ ){
    let char= chars(index)
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
          tag.push( letters.join('') );
          letters= [];
          state= 3;
        }
        break;
      case 2: 
        if( ">" == char ){
          tag.push( letters.join('') );
          letters= [];
          state= 3;
        }
        break;
      case 3:
        if( (/\s/).test(char) ){
          text.push( letters.join('') );
          letters= [];
          state= 4;
        } else if( "<" == char ){
          text.push( letters.join('') );
          letters= [];
          state= 5;
        } else {
          letters.push( char );
        }
        break;
      case 4:
        if( "<" == char ){
          text.push( letters.join('') );
          letters= [];
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
          endTag.push( letters.join('') );
          letters= [];
          state= 3;
        } else { state= 7; }
        break;
      case 7:
        if( ">" == char ){
          endTag.push( letters.join('') );
          letters= [];
          state= 3;
        }
        break;
      default:
        throw 'errorr';
    }
  }
  result= [ tag, endTag, text ];
  return result;
}