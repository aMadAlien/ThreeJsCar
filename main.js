function rotateWheels(object, speed = 0.05) {
  const wheelsFront = ['Front_wheel', 'Rear_wheel', 'Front_wheel', 'Rear_wheel']
  const wheelsRear = ['Front_wheel001', 'Rear_wheel001', 'Front_wheel001', 'Rear_wheel001']

  wheelsFront.forEach(detail => object.getObjectByName(detail).rotation.z -= speed)
  wheelsRear.forEach(detail => object.getObjectByName(detail).rotation.z += speed)
}

function moveObjForward(object, targetPos) {
  const backPos = object.object3D.position.clone()
  wheelsRotate = true

  object.setAttribute('animation', 'property: position; to: ' + targetPos);

  setTimeout(() =>{
    wheelsRotate = false
    object.object3D.position.set(backPos.x, backPos.y, backPos.z)
    }, 2000);
}

const carEntity = document.getElementById('carEntity');
let carModel;

carEntity.addEventListener('model-loaded', () => {
  carModel = carEntity.object3D;

  const carFrame = carModel.getObjectByName("Frame_Orange_0");
  carFrame.material.color.set(255, 255, 255)
});

const driveBtn = document.querySelector('.btn-drive')
const wheelsBtn = document.querySelector('.btn-wheels')
let wheelsRotate = false

driveBtn.addEventListener('click', () => {
  const targetPos = '6 0.5 -3';
  moveObjForward(carEntity, targetPos);
})

wheelsBtn.addEventListener('click', () => {
  wheelsRotate = !wheelsRotate
})

function loop() {
  wheelsRotate && rotateWheels(carModel);
  requestAnimationFrame(loop);
}

loop();
