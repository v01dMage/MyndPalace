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
    session.inputSources.forEach( (src)=>{
      cout( src ); 
      cout( src?.gamepad );
      cout('-');
    }
    cout( '***' )
  }

  setTimeout( polling, delay );
}
polling();
