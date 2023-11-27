export function moveObjForward(object, targetX) {
    let animationFrameId;

    function animate() {
        object.position.x += 0.5;

        rotateWheels(object)

        if (object.position.x < targetX) {
            animationFrameId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationFrameId);
            setTimeout(() => (object.position.x = -50), 1000);
        }
    }

    animate();
}

export function rotateWheels(object, speed = 0.05) {
    const wheelsFront = [ 'Front_wheel', 'Rear_wheel', 'Front_wheel', 'Rear_wheel' ]
    const wheelsRear = [ 'Front_wheel001', 'Rear_wheel001', 'Front_wheel001', 'Rear_wheel001' ]

    wheelsFront.forEach(detail => object.getObjectByName(detail).rotation.z -= speed)
    wheelsRear.forEach(detail => object.getObjectByName(detail).rotation.z += speed)
}