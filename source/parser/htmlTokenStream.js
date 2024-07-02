// Takes a string, splits it,
//    and returns an indexed array of
//    (type, text) tokens
//     type: 1)tag 2)endTag 3)text
//     text: tag name or raw text
// WARNING: edge cases unaccounted for

export const location= import.meta.url;

export const loneTags= [
  'meta', 'img', 'br', 'hr', 'input', 'link',
  'area', 'base', 'col', 'embed', 'param', 
  'source', 'track', 'wbr'
];

export function htmlTokenStream( html ){
  let chars= html.split('').filter( c=>
    /[^\n\r]/.test(c)
  );
  let letters= [];
  let word;
  let result= [];
  let state= 0;
  const checkAndPush= (t="text")=>{
    if( letters.length == 0 ) return;
    word= letters.join('').trim();
    letters= [];
    if( t == "tag" ){
      if( loneTags.reduce( (out,lex)=>{ 
        return out || lex == word;
      } , false ) ){
        t= "loneTag";
      } else {
        t= "startTag";
      }
    }
    result.push( {type: t, text: word} );
  };
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
          checkAndPush("tag");
          state= 3;
        }
        break;
      case 2: 
        if( ">" == char ){
          checkAndPush("tag");
          state= 3;
        }
        break;
      case 3:
        if( (/[\s\n\r]/).test(char) ){
          checkAndPush();
          state= 4;
        } else if( "<" == char ){
          checkAndPush();
          state= 5;
        } else {
          letters.push( char );
        }
        break;
      case 4:
        if( "<" == char ){
          checkAndPush();
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
          checkAndPush("endTag");
          state= 3;
        } else { state= 7; }
        break;
      case 7:
        if( ">" == char ){
          checkAndPush("endTag");
          state= 3;
        }
        break;
      default:
        throw 'errorr';
    }
  }
  result= result.reduce( (out, token)=>{
    if( token == undefined ) return out;
    if( token.type == "text" && out[out.length- 1].type == "text" ){
      out[out.length- 1].text+= ' '+token.text;
    } else { out.push( token ); }
    return out;
  }, [] );
  return result;
}
