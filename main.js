import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { moveObjForward, rotateWheels } from './utils/animation'

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x004d99);

// Add a car model
let object = null
let objToRender = 'low-poly_truck_car_drifter';
let mixer = null
let animationType = 'Car engine'

const loader = new GLTFLoader();
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;

    //  Animation Mixer
    mixer = new THREE.AnimationMixer( object );
    const clips = gltf.animations;

    // Play a specific animation
    const clip = THREE.AnimationClip.findByName( clips, animationType );
    const action = mixer.clipAction( clip );
    action.play();

    object.scale.set(0.03, 0.03, 0.03);
    object.position.set(-50, 1, 0);
    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error('Error occurred while loading:', error);
  }
);

// Create a plane geometry
const planeGeometry = new THREE.PlaneGeometry( 200, 100 );
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x003300 })
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
planeMesh.rotation.x = -Math.PI / 2;
scene.add(planeMesh)

// Create boxes
const box1 = new THREE.BoxGeometry(70, 1, 1);
const box2 = new THREE.BoxGeometry(70, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x003366 })

const box1Mesh = new THREE.Mesh(box1, material)
const box2Mesh = new THREE.Mesh(box2, material)

box1Mesh.position.set(0, 0, 12)
box2Mesh.position.set(0, 0, -12)

scene.add(box1Mesh)
scene.add(box2Mesh)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Create ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambientLight);

// Camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 2000)
camera.position.set(20, 60, 50)
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

// Controls
const controls = new OrbitControls(camera, canvas) // makes it move
controls.enableDamping = true
controls.enablePan = false
// controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 2

// Resize
window.addEventListener('resize', () => {
  //Update Sizes
  console.log('resize');
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  // Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix() // + loop() to avoid sphere squeezing
  renderer.setSize(sizes.width, sizes.height)
})

// make the car move forward
const driveBtn = document.querySelector('.btn-drive')
const wheelsBtn = document.querySelector('.btn-wheels')
let wheelsRotate = false

driveBtn.addEventListener('click', () => {
  const targetX = 50;
  moveObjForward(object, targetX);
})

wheelsBtn.addEventListener('click', () => {
  wheelsRotate = !wheelsRotate
})

export function animateObj(deltaSeconds = 0.5) {
  requestAnimationFrame(animateObj);
  mixer.update(deltaSeconds);
  wheelsRotate && rotateWheels(object, 0.0002)
}

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
  mixer && animateObj()
}

loop()