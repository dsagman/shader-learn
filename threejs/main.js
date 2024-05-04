import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 20, 2, 1 );
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const PlaneGeometry = new THREE.PlaneGeometry( 30, 30, 10 );
const PlaneMaterial = new THREE.MeshBasicMaterial( { 
    color: 0x0000ff,
    side: THREE.DoubleSide } );
const plane = new THREE.Mesh( PlaneGeometry, PlaneMaterial );
scene.add( plane );
plane.rotation.x = -0.5 * Math.PI;

const gridHelper = new THREE.GridHelper( 30, 30 );
scene.add( gridHelper );

const sphereGeometry = new THREE.SphereGeometry( 5, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial( { 
    color: 0xffff00,
    wireframe: false } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( sphere );

sphere.position.x = 10;

const gui = new dat.GUI();

const cubeFolder = gui.addFolder('Cube');
const cubeRotationFolder = cubeFolder.addFolder('Rotation');
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01);
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01);
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01);
const cubePositionFolder = cubeFolder.addFolder('Position');
cubePositionFolder.add(cube.position, 'x', -10, 10, 0.01);
cubePositionFolder.add(cube.position, 'y', -10, 10, 0.01);
cubePositionFolder.add(cube.position, 'z', -10, 10, 0.01);
const cubeScaleFolder = cubeFolder.addFolder('Scale');
cubeScaleFolder.add(cube.scale, 'x', 0, 5, 0.01);
cubeScaleFolder.add(cube.scale, 'y', 0, 5, 0.01);
cubeScaleFolder.add(cube.scale, 'z', 0, 5, 0.01);

const cubeColor = { color: '#ff0000' }; // Initial color
const cubeColorFolder = cubeFolder.addFolder('Color');
cubeColorFolder.addColor(cubeColor, 'color');

cubeFolder.open();
const sphereFolder = gui.addFolder('Sphere');
sphereFolder.add(sphere.position, 'x', -10, 10, 0.01);
sphereFolder.add(sphere.position, 'y', -10, 10, 0.01);
sphereFolder.add(sphere.position, 'z', -10, 10, 0.01);
sphereFolder.add(sphere.scale, 'x', 0, 5, 0.01);
sphereFolder.add(sphere.scale, 'y', 0, 5, 0.01);
sphereFolder.add(sphere.scale, 'z', 0, 5, 0.01);
sphereFolder.add(sphereMaterial, 'wireframe');
const sphereColor = { color: '#ff0000' }; // Initial color
const sphereColorFolder = sphereFolder.addFolder('Color');
sphereColorFolder.addColor(sphereColor, 'color');
const sphereSpeed = { speed: 0.01 };
const sphereSpeedFolder = sphereFolder.addFolder('Speed');
sphereSpeedFolder.add(sphereSpeed, 'speed', 0, 0.1, 0.001);
sphereFolder.open();



const orbit = new OrbitControls(camera, renderer.domElement);
// camera.position.z = 5;
camera.position.set(-10, 30, 30);
orbit.update();

let step = 0;
function animate() {
	requestAnimationFrame( animate );
    cube.material.color.set(cubeColor.color);
    sphere.material.color.set(sphereColor.color);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    step += sphereSpeed.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));
    
	renderer.render( scene, camera );
}
animate();