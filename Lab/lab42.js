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

const cameras = [{
    cam: new THREE.PerspectiveCamera(90, 1, .1, 100),
    viewport: {
    x: 0, y: 0, width: 10, height: 10,
    },
    }, {
    cam: new THREE.OrthographicCamera(-4, 5, 5, -5, .1, 100),
    viewport: {
    x: 0, y: 0, width: 10, height: 10,
    },
}];
cameras[0].cam.position.z = 5;
cameras[1].cam.position.z = 5;
    

 
// Função de animação
function animate() {
    const delta = clock.getDelta();


    object.rotation.y += delta;
    renderer.autoClear = false; // evita limpar o buffer a cada render
  renderer.autoClearColor = false // pode ser necessário se não funcionar
  renderer.clear();
  for (let i of cameras) {
  renderer.setViewport(i.viewport.x, i.viewport.y, i.viewport.width, i.viewport.height);
  renderer.render(scene, i.cam);
 }
}
renderer.setAnimationLoop(animate);

addEventListener('resize', (event) => {
    const height = renderer.domElement.height;
    const width = renderer.domElement.width;
   
    cameras[0].viewport.width = width / 2;
    cameras[0].viewport.height = height;
   
    cameras[1].viewport.width = width / 2;
    cameras[1].viewport.height = height;
    cameras[1].viewport.x = width / 2;
   
    const perspective = cameras[0].cam;
    const ortho = cameras[1].cam;
   
    perspective.aspect = cameras[0].viewport.width / cameras[0].viewport.height;
    perspective.updateProjectionMatrix();

    if (width > height) {
       ortho.top = ortho.bottom + (ortho.right - ortho.left) * cameras[1].viewport.height /
       cameras[1].viewport.width;
       
       } else {
       ortho.right = ortho.left + (ortho.top - ortho.bottom) * cameras[1].viewport.width /
       cameras[1].viewport.height;
       
       }
    
   ortho.updateProjectionMatrix();
   });



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