// Test gamepad ideas and functions
import * as vr from 'vr/vr.js';

let xr= vr.self.renderer.xr;
let cout= vr.self.console.cout;
let delay= 3000;
let polling;
let count= 0;

polling= ()=>{
  if( xr.isPresenting ){
    count++;
    cout( 'count: '+ count );
    let session= xr.getSession();
    cout( 'keys: '+ session.isSystemKeyboardSupported );
    cout( 'inputs: '+ session.inputSources );
    session.inputSources.forEach( (src)=>{
      cout('hand: '+ src.handedness ); 
      //cout( src?.gamepad );
      cout( src?.profiles );
      cout('-');
    } );
    cout( '***' )
  }

  setTimeout( polling, delay );
}
polling();
