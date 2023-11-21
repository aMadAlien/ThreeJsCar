export function moveObjForward(object, targetX) {
    let animationFrameId;

    function animate() {
        object.position.x += 1;

        if (object.position.x < targetX) {
            animationFrameId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationFrameId);
            setTimeout(() => (object.position.x = -50), 1000);
        }
    }

    animate();
}