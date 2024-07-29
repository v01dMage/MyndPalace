//speech in js
let cache= {};

function speak(text){
  let utterance= cache[text] ? cache[text] :
    cache[text]= new SpeechSynthesisUtterance( text );
  window.speechSynthesis.speak( utterance );
}

export const speech= { speak };