// using multiple scenes,
//

import * as avatar from 'xr/cns.js';
import * as THREE from 'three';


let voyd= new THREE.Scene();
voyd.background = new THREE.Color( 0x77bb88 );

let my= avatar.self;

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

      scenes[0].add( avatar.disc )
    }
  }
}

avatar.addToUpdate( swapRealm );

