//Camera Nexus Start
//
//  import and initialize base xr system

import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { MyMeta3Gamepad } from 'xr/gamepad.js';

let camera, scene, renderer;
let raycasterLeft, raycasterRight;
let recon= [basicRecon];
let update= [basicUpdate];

export const tempMatrix = new THREE.Matrix4();

export const self= {};
let controller1, controller2;
let controllerGrip1, controllerGrip2;