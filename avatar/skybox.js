//Skybox
import * as avatar from 'xr/cns.js';
import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load(
    './assets/download.png',
    () => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      avatar.self.scenes[0].background = texture;
    });
