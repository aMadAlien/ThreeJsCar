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
    const wheelsDetails = [
        'Front_wheel_Black_0', 'Front_wheel_Light_black_0', 'Rear_wheel_Black_0', 'Rear_wheel_Light_black_0'
    ]

    wheelsDetails.forEach(detail => object.getObjectByName(detail).rotation.z -= speed)
}