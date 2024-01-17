const driveBtn = document.querySelector('.btn-drive')
const wheelsBtn = document.querySelector('.btn-wheels')
let wheelsRotate = false
let moveForward = false

driveBtn.addEventListener('click', () => {
    moveForward = true
})

wheelsBtn.addEventListener('click', () => {
    wheelsRotate = !wheelsRotate
})


AFRAME.registerComponent('modify-materials', {
    init: function () {
        this.el.addEventListener('model-loaded', () => {
            const carFrame = this.el.object3D.getObjectByName("Frame_Orange_0");
            carFrame.material.color.set(255, 255, 255);
        });
    },
    tick: function () {
        const targetPos = '6 0.5 -3';
        if (wheelsRotate) {
            this.rotateWheels();
        }
        if (moveForward) {
            moveForward = false
            wheelsRotate = true
            this.moveObjForward(targetPos)
        }
    },
    remove: function () {
        this.el.removeEventListener('model-loaded', () => {
            const carFrame = this.el.object3D.getObjectByName("Frame_Orange_0");
            carFrame.material.color.set(255, 255, 255);
        })
    },
    rotateWheels: function () {
        const speed = 0.02;
        const wheelsFront = ['Front_wheel', 'Rear_wheel', 'Front_wheel', 'Rear_wheel'];
        const wheelsRear = ['Front_wheel001', 'Rear_wheel001', 'Front_wheel001', 'Rear_wheel001'];

        wheelsFront.forEach(detail => this.el.object3D.getObjectByName(detail).rotation.z -= speed);
        wheelsRear.forEach(detail => this.el.object3D.getObjectByName(detail).rotation.z += speed);
    },
    moveObjForward: function (targetPos) {
        const backPos = this.el.object3D.position.clone();
        this.el.setAttribute('animation', 'property: position; to: ' + targetPos);

        setTimeout(() => {
            wheelsRotate = false
            this.el.removeAttribute('animation')
            this.el.object3D.position.set(backPos.x, backPos.y, backPos.z);
        }, 2000);
    }
});
