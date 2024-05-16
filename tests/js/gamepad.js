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
        cout('buttons: ' );
        let btns= src.gamepad.buttons;
        btns.forEach( btn=>{
          cout('pressed: '+ btn.pressed );
          cout('value: '+ btn.value );
        });
      }
      cout('--');
    } );
    cout( '***' )
  }

  setTimeout( polling, delay );
}
//polling();

//add pipeline recon and update inner console 
function gamepadRecon(o){
  let ins= vr.self.renderer.xr.getSession().inputSources;
  o.axes= [];
  ins.forEach( src=>{
    if(src.gamepad){
      o.axes.push( src.gamepad.axes[2] );
      o.axes.push( src.gamepad.axes[3] );
    }
  } );
  return o;
}

vr.addToRecon( gamepadRecon );

const showDelay= 300;
function showAxes(o){
  if( showDelay-- < 0 ){
    showDelay= 300;
    let out= o.axes.join(', ');
    vr.self.console.cout(`return ${out}`);
}

vr.addToUpdate( showAxes );