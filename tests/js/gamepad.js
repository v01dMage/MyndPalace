// Test gamepad ideas and functions
import * as vr from 'vr/vr.js';

window.addEventListener('gamepadconnected', (e)=>{
  vr.self.console.cout( 'connected<br>'+ e.gamepad.index );
});
window.addEventListener('gamepaddisconnected', (e)=>{
  vr.self.console.cout( 'disconnected<br>' );
});