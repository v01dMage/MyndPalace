//practice and test using multiple scenes,
//with 'vr'.self.scenes[0] always being rendered

import * as vr from 'vr/vr.js';
//assumes gamepad
import * as THREE from 'three';

//add controllers and grips,
// background, lights, etc 

let voyd= new THREE.Scene();
voyd.background = new THREE.Color( 0x77bb88 );

let my= vr.self;
my.hands= [ 
  my.controller1, my.controller2,
  my.controllerGrip1, my.controllerGrip2
];

voyd.add( new THREE.HemisphereLight( 0xcccccc, 0x779977, 3 ) );

my.scenes.push( voyd );

let lastSwapped= Date.now();
let gp= my.gamepad;
let scenes= my.scenes;

function swapRealm(o){
  if(Date.now() - lastSwapped> 2000){
    
    if(gp.leftGrip > 0.3 && gp.Y){
      let temp= scenes.shift();
      scenes.push( temp );
      lastSwapped= Date.now();

      let realm= scenes[0];
      my.hands.forEach( hand=>{
        realm.add( hand );
      } );
    }
  }
}

vr.addToUpdate( swapRealm );

