import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';



const scene  = new THREE.Scene();
//setup the camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1,1000);
//render the actual graphics.
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene,camera);
//create the object, use a built in geometry 
const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({
  color:0xff6347
});
const torus = new THREE.Mesh(geometry,material);
scene.add(torus);

//add the lightning
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight);//add the pointlight to light up the taurus.
const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star  = new THREE.Mesh(geometry, material);
  const[x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);


//add texture and space
const spaceTexture = new THREE.TextureLoader().load('/images/background.jpg');
scene.background = spaceTexture;

//avatar
const sreejithTexture = new THREE.TextureLoader().load('/images/sreejith.jpg');
const sreejith = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({
    map: sreejithTexture
  })
);
scene.add(sreejith);

//Moon 
const moonTexture = new THREE.TextureLoader().load('/images/flat-moon_cropped.png');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture
  })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);


function moveCamera(){
  const t = document.body.getBoundingClientRect().top;//get the position of users curretn position

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;


  sreejith.rotation.y += 0.01;
  sreejith.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.y = t * -0.0002;
  camera.position.x = t * -0.0002;
}

document.body.onscroll=moveCamera;

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005; 
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate(); 