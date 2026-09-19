const map = document.getElementById("map");
const carImage = document.getElementById("car");
map.style.transform = "scale(10)";

var car = {"x": -4401, "y": -3212, "direction": -.1, "speed": 0, "power": .02, "break": .99, "stear": 0, "turningSpeed": .04, "carScale": 40}

function updateMap() {

    carImage.style.cssText = `transform-origin: 30% 50%; transform: rotate(${-Math.floor(car.direction*(180/Math.PI))}deg); position: absolute; width: ${car.carScale}px; left: ${(640/2)-(580/car.carScale)}px; top: ${(480/2)-(370/car.carScale)}px;`;

    turn(keys.ArrowLeft-keys.ArrowRight);
    accelerate(keys.ArrowUp-keys.ArrowDown, car.direction);

    map.style.transform = `translate(${car.x}px, ${car.y}px) scale(20)`;
}

// car
function trig(radius, radian) {
    return [Math.cos(radian)*radius, -Math.sin(radian)*radius];
}

function accelerate(joystickY, direction) {
    car.speed += car.power * joystickY;
    car.speed *= car.break;

    const a = trig(car.speed, direction);

    car.x -= a[0];
    car.y -= a[1];
}

function turn(joystickX) {
    const maxSteer = 0.6;
    const steerSpeed = .8;
    const targetSteer = joystickX*maxSteer;

    car.stear += (targetSteer-car.stear)*steerSpeed;

    const wheelBase = 40;
    if (Math.abs(car.speed) > .001) {
        const turnRate =(car.speed/wheelBase)*Math.tan(car.stear);

        car.direction += turnRate;
    }
}

// driving input
const keys = {
    ArrowUp: 0,
    ArrowDown: 0,
    ArrowLeft: 0,
    ArrowRight: 0
};

window.addEventListener("keydown", (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = 1;
    }
});

window.addEventListener("keyup", (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = 0;
    }
});

setInterval(updateMap, 1000/60);