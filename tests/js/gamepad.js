// Test gamepad ideas and functions
import * as vr from 'vr/vr.js';

let xr= vr.self.renderer.xr;
let cout= vr.self.console.cout;

const gamepad= { axes: { l: {x:0,y:0}, r: {x:0,y:0} }, buttons: {l: {t:0,g:0,x: false, y: false}, r: {t:0,g:0,a: false, b: false} } };
vr.self.gamepad= gamepad;

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
      cout('hand: '+ src.hand ); 
      cout('handedness: '+ src.handedness );
      cout( 'gamepad: '+ src?.gamepad );
      cout( 'profiles: _'+ src?.profiles +'_');
      cout( 'gripSpace: '+ src?.gripSpace );
      cout( 'targetRayMode: '+ src.targetRayMode );
      cout( 'targetRaySpace: '+ src.targetRaySpace );
      cout('-');
      if(src.gamepad){
        cout('axes: ' );
        let out="";
        let ax= src.gamepad.axes;
        ax.forEach( axis=>out+=axis+', ' );
        cout( out );
        cout( src.handedness );
        cout('buttons: ' );
        let btns= src.gamepad.buttons;
        btns.forEach( btn=>{
          cout('pressed: '+ btn.pressed );
          cout('value: '+ btn.value );
        });
      }
      cout('--');
      cout(`${gamepad.axes.l.x}x ${gamepad.axes.l.y}y`);
      cout(`${gamepad.axes.r.x}x ${gamepad.axes.r.y}y`);
    } );
    cout( '***' )
  }

  setTimeout( polling, delay );
}
polling();




//add pipeline recon and update inner console 
let gamepadRecon= (o)=>{
  try{
  if( xr.isPresenting ){
  let ins= xr.getSession().inputSources;
  ins.forEach( src=>{
    if(src.gamepad){
      let h= (src.handedness == 'left')? 'l':'r';
      gamepad[h].x= src.gamepad.axes[2];
      gamepad[h].y= src.gamepad.axes[3];
    }
  } );}
  } catch(err) {
      cout(`<b>${err}</b>`);
  }
}

vr.addToRecon( gamepadRecon );
