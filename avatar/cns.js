//Camera Nexus Start
//
//  import and initialize base xr system

import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { gamepad } from 'xr/gamepad.js';//MetaQ3

let camera, scene, scenes, renderer, xr;
let raycasterLeft, raycasterRight;
let recon= [ basicRecon, gamepad.recon ];
let update= [ basicUpdate ];

export const tempMatrix = new THREE.Matrix4();

export const self= {};
self.hands= [];
let controller1, controller2;
let controllerGrip1, controllerGrip2;

