//Gamepad
//

export const gamepad= { 
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
  haptics: { left: undefined, right: undefined},
  pulse: pulse,
 };


export function gamepadRecon(o){
  if( o.xr.isPresenting ){
  let ins= o.xr.getSession().inputSources;
  ins.forEach( src=>{
    if(src.gamepad){
      let h= src.handedness;
      let l= h == 'left';
      let btns= src.gamepad.buttons;
      gamepad[h+'Xaxis']= src.gamepad.axes[2];
      gamepad[h+'Yaxis']= src.gamepad.axes[3];
      gamepad[h+'Trigger']= btns[0].value;
      gamepad[h+'Grip']= btns[1].value;
      gamepad[h+'AxisButton']= btns[3].pressed;
      gamepad[l?'X':'A']= btns[4].pressed;
      gamepad[l?'Y':'B']= btns[5].pressed;
      gamepad.haptics[h]= src.gamepad.hapticActuators[0];
    }
  } );}
}

export function pulse(hand, strength, ms){
  let pulsed= gamepad.haptics[hand].pulse( strength, ms );
}
