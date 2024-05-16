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
    cout( count );
    let session= xr.getSession();
    cout( session.isSystemKeyboardSupported );
    cout( session.inputSources );
    for( const src in session.inputSources ){
      cout( src ); 
      cout( src?.gamepad );
    }
    cout( '***' )
  }

  setTimeout( polling, delay );
}
polling();
