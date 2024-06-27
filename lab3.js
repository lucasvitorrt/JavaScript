import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// Inicialização do renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criação da câmera e posicionamento
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 30;

// criação do cenário
const scene = new THREE.Scene();
scene.background = new THREE.Color('black');

// Geometria dos planetas (todos iguais)
const sphere = new THREE.SphereGeometry(1, 8, 6);

// Alguns materiais para renderizar os astros
const mYellow = new THREE.MeshBasicMaterial({ color: 'yellow' });
const mBlue = new THREE.MeshBasicMaterial({ color: 'DodgerBlue' });
const mGrey = new THREE.MeshBasicMaterial({ color: 'lightgrey' });
const mRed = new THREE.MeshBasicMaterial({ color: 'Red' });

// Inicialização / criação do(s) objeto(s)

// A função wrapWireframe está no código dado
const sun = wrapWireframe(new THREE.Mesh(sphere, mYellow));
const earth = wrapWireframe(new THREE.Mesh(sphere, mBlue));
const moon = wrapWireframe(new THREE.Mesh(sphere, mGrey))
const satelite = wrapWireframe(new THREE.Mesh(sphere, mRed))

// Lista das funções de animação
const updatable = [];

// Elemento Sol do nosso scene graph
sun.scale.set(5, 5, 5);
scene.add(sun);

// Ramo da terra
const earthOrbit = new THREE.Group(); // nó 'pai'
updatable.push(registerAnimationTick(earthOrbit, 360 / 120));
scene.add(earthOrbit);

// Existe um problema nas duas linhas seguintes
// Será corrigido em breve

const earthGroup = new THREE.Group();
earthOrbit.add(earthGroup);
earthGroup.position.x = 15
earthGroup.add(earth);

earth.scale.set(1, 1, 1);
updatable.push(registerAnimationTick(earth, 360 / 3));

const moonGroup = new THREE.Group();
earthGroup.add(moonGroup);
moonGroup.add(moon);
moon.scale.set(0.5, 0.5, 0.5);
moon.position.x = 3;

updatable.push(registerAnimationTick(moonGroup, 360 / 15));

const sateliteGroup = new THREE.Group();
earthGroup.add(sateliteGroup);
sateliteGroup.add(satelite);
satelite.position.x = 1.5;
satelite.scale.set(0.3, 0.3, 0.3);

updatable.push(registerAnimationTick(sateliteGroup, 360 / 5));


// Registra a função de animação para o sol
// Uma volta completa (360º) a cada 60 segundos
updatable.push(registerAnimationTick(sun, 360 / 60));
// Temporizador da animação
const clock = new THREE.Clock();


/*const gui = new GUI();
const dataControls = {
translateParent: -1, rotateParent: false,
translateChild: 2, rotateChild: false,
}

const parentFolder = gui.addFolder('Pai');
parentFolder.add(dataControls, 'translateParent', -4, 4, 0.1);
parentFolder.add(dataControls, 'rotateParent');

const childFolder = gui.addFolder('Filho');
childFolder.add(dataControls, 'translateChild', -4, 4, 0.1);
childFolder.add(dataControls, 'rotateChild');
const gBox = new THREE.BoxGeometry();
const mGreen = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
const mRed = new THREE.MeshBasicMaterial({ color: 0xFF0000 });

const parent = new THREE.Mesh(gBox, mRed);
const child = new THREE.Mesh(gBox, mGreen);
 
parent.add(child); // filho é um nó do pai
scene.add(parent); // cenário só contém o pai*/
 

// Função de animação
function animate() {
    const delta = clock.getDelta();

    for (let i of updatable) {
         i(delta);
    }

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

function registerAnimationTick(object, angularSpeed) {
     const obj = object;
     const w = THREE.MathUtils.degToRad(angularSpeed);
     return (delta) => obj.rotation.z += delta * w;
     }
    