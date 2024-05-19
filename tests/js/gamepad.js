// Test gamepad ideas and functions
// controller setup seems to be:
//    0 trigger #
//    1 grip #
//    3 stickpress tf
//    4 A/X tf
//    5 B/Y tf
//    axes2 x #
//    axes3 y #

import * as vr from 'vr/vr.js';

let xr= vr.self.renderer.xr;
let cout= vr.self.console.cout;

const gamepad= { 
  leftXaxis: 0,
  leftYaxis: 0,
  leftAxisButton: false,
  rightXaxis: 0,
  rightYaxis: 0,
  rightAxisButton: false,
  leftTrigger: 0,
  rightTrigger: 0,
  leftGrip: 0,
  rightGrip: 0,
  A: false,
  B: false,
  X: false,
  Y: false,
 };
vr.self.gamepad= gamepad;

let delay= 3000;
let polling;
let count= 0;
let didPulse;

polling= ()=>{
  let innerOut= '';
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
        innerOut+= '*'+ src.handedness+
        btns.reduce( (reduction, btn, index)=>{
          if(btn.pressed || btn.value != 0) {
    reduction+= index+ ': '+ btn.value.toPrecision(2)+ ', ';
          }
          cout('pressed: '+ btn.pressed );
          cout('value: '+ btn.value );
          return reduction;
        }, '' );
        if( btns[5].pressed ){
          didPulse= src.gamepad.hapticActuators[0].pulse(0.5, 100);
        }
      }
      cout('--');
      cout(`${gamepad.leftXaxis}x ${gamepad.leftYaxis}y`);
      cout(`${gamepad.rightXaxis}x ${gamepad.rightYaxis}y`);
    } );
    cout( '***' )
  }

  vr.self.console.ccout( innerOut );
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
      let h= src.handedness;
      gamepad[h+'Xaxis']= src.gamepad.axes[2];
      gamepad[h+'Yaxis']= src.gamepad.axes[3];
    }
  } );}
  } catch(err) {
      cout(`<b>${err}</b>`);
  }
}

vr.addToRecon( gamepadRecon );
