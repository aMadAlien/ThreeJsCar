import * as THREE  from 'three'
// import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Scene
const scene = new THREE.Scene()

// Create a sphere
// const geometry = new THREE.SphereGeometry(3, 64, 64)
const box1 = new THREE.BoxGeometry( 20, 1, 1 ); 
const box2 = new THREE.BoxGeometry( 20, 1, 1 ); 
const material = new THREE.MeshStandardMaterial({
  color: '#F25185'
})


const box1Mesh = new THREE.Mesh(box1, material)
const box2Mesh = new THREE.Mesh(box2, material)

box1Mesh.position.set(0, 0, 5)
box2Mesh.position.set(0, 0, -5)
// console.log(box1Mesh);

scene.add(box1Mesh)
scene.add(box2Mesh)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Light
const light1 = new THREE.PointLight(0xffffff, 100, 100)
const light2 = new THREE.PointLight(0xffffff, 100, 100)

light1.position.set(0, 4, 10)
light2.position.set(0, 4, -10)

scene.add(light1)
scene.add(light2)

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set(10, 15, 15)
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

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()