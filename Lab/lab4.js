import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// Inicialização do renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// criação do cenário
const scene = new THREE.Scene();
scene.background = new THREE.Color('black');
const gBox = new THREE.BoxGeometry(3, 3, 3);
const mGreen = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
const mYellow = new THREE.MeshBasicMaterial({ color: 'yellow' });

const object = wrapWireframe(new THREE.Mesh(gBox, mYellow))
object.rotation.x = 0.8;
scene.add(object);

// Criação da câmera e posicionamento
const gui = new GUI();
const dataControls = {
ortho: false,
 }
 gui.add(dataControls, 'ortho');
 
  const perspective = new THREE.PerspectiveCamera(90, 1, .1, 100);
  perspective.position.z = 5;
 
  const ortho = new THREE.OrthographicCamera(-4, 4, 4, -3, 0.1, 10);
  ortho.position.z = 5;
 
  const clock = new THREE.Clock();
  let camera = perspective;

  addEventListener('resize', (event) => {
     const height = renderer.domElement.height;
     const width = renderer.domElement.width;
    
     perspective.aspect = width / height;
     perspective.updateProjectionMatrix();
    
     if (width > height) {
     ortho.top = ortho.bottom + (ortho.right - ortho.left) * height / width;
     } else {
     ortho.right = ortho.left + (ortho.top - ortho.bottom) * width / height;
     }
     ortho.updateProjectionMatrix();
     });
 
// Função de animação
function animate() {
    const delta = clock.getDelta();

 if (dataControls.ortho)
 camera = ortho;
 else
 camera = perspective;

    object.rotation.y += delta;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);



////////////////////////////////////////////
// Funções para auxiliar a criação do objeto

function wrapWireframe(object) {
    const obj = new THREE.Group();

    const materialWireframe = new THREE.MeshBasicMaterial({
        color: 'black',
        wireframeLinewidth: 2,
        wireframe: true
    });
    obj.add(object, new THREE.Mesh(object.geometry, materialWireframe));
    return obj;
}