//Skybox
import * as vr from 'vr/vr.js';
import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load(
    './assets/download.png',
    () => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      vr.self.scenes[1].background = texture;
    });
