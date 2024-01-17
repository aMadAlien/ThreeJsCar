export function rotateWheels(object, speed = 0.05) {
    const wheelsFront = [ 'Front_wheel', 'Rear_wheel', 'Front_wheel', 'Rear_wheel' ]
    const wheelsRear = [ 'Front_wheel001', 'Rear_wheel001', 'Front_wheel001', 'Rear_wheel001' ]

    wheelsFront.forEach(detail => object.getObjectByName(detail).rotation.z -= speed)
    wheelsRear.forEach(detail => object.getObjectByName(detail).rotation.z += speed)
}