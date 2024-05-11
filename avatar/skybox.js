//Skybox
import * as vr from 'vr/vr.js';
import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load(
    './assets/stone_pines.jpg',
    () => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      vr.self.scene.background = texture;
    });
