// Test gamepad ideas and functions
import * as vr from 'vr/vr.js';

let xr= vr self.renderer.xr;
let cout= vr.self.console.cout;
let delay= 3000;

function polling(){
  if( xr.isPresenting ){
    let session= xr.getSession();
    cout( session.inputSources );
    cout( '***' )
  }

  setTimeout( polling, delay );
}
polling();