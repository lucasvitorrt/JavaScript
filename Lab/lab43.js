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

 
const perspective = new THREE.PerspectiveCamera(90, 1, .1, 100);
perspective.position.z = 5;

const ortho = new THREE.OrthographicCamera(-4, 4, 4, -3, 0.1, 10);
ortho.position.z = 5;

const clock = new THREE.Clock();

// Na seção de inicialização
 const gui = new GUI();
 const dataControls = {
 fov: 40, near: 20, far: 50,
 rx: -1.55, ry: 0.78, rz: 1.5
 };

 const cameras = [{
 // câmera principal
 cam: new THREE.PerspectiveCamera(90, 1, .1, 500),
 viewport: {
    x: 0, y: 0, width: 10, height: 10,
 },
 }, {
 // câmera secundária
cam: new THREE.PerspectiveCamera(dataControls.fov, 1, dataControls.near,
dataControls.far),

 viewport: {
 x: 0, y: 0, width: 10, height: 10,
 },
 }];

 const orbital = new OrbitControls(cameras[0].cam, renderer.domElement);
 cameras[0].cam.position.z = 50;

 cameras[1].cam.position.x = 30;
 cameras[1].cam.position.y = 30;
 cameras[1].cam.lookAt(0, 0, 0);

    

 
// Função de animação

const cameraHelper = new THREE.CameraHelper(cameras[1].cam);
scene.add(cameraHelper);

const perspectiveFolder = gui.addFolder('Perspective');
perspectiveFolder.add(dataControls, 'fov', 10, 100, 1).onChange(v => {
cameras[1].cam.fov = v;
cameras[1].cam.updateProjectionMatrix();
cameraHelper.update();
});
perspectiveFolder.add(dataControls, 'near', 0.1, 100, .1).onChange(v => {
cameras[1].cam.near = v;
cameras[1].cam.updateProjectionMatrix();
cameraHelper.update();

});
perspectiveFolder.add(dataControls, 'far', 0.1, 100, .1).onChange(v => {
cameras[1].cam.far = v;
cameras[1].cam.updateProjectionMatrix();
cameraHelper.update();
});

const orientationFolder = gui.addFolder('Orientation');
orientationFolder.add(dataControls, 'rx', -2.5, -1, .01).onChange(v => {
cameras[1].cam.rotation.x = v;
});
orientationFolder.add(dataControls, 'ry', 0, 1.5, .01).onChange(v => {
cameras[1].cam.rotation.y = v;
});
orientationFolder.add(dataControls, 'rz', 0, 3, .01).onChange(v => {
cameras[1].cam.rotation.z = v;
});


// Antes do laço
 // ###############################################################
 renderer.autoClear = false; // evita limpar o buffer a cada render
 //renderer.autoClearColor = false // pode ser necessário se não funcionar

// Dentro do laço de animação (substitua o renderizador)
 renderer.clear();
 for (let i of cameras) {
 renderer.setViewport(i.viewport.x, i.viewport.y, i.viewport.width, i.viewport.height);
 renderer.render(scene, i.cam);
 }

function animate() {
    const delta = clock.getDelta();
    orbital.update();



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