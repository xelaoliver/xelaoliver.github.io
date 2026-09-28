const image = document.getElementById("image");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let game = false;
let initialized = false;

image.addEventListener("load", () => {
    const scale = 1220 / image.scrollWidth;

    canvas.width = Math.floor(365 / scale);
    canvas.height = Math.floor(475 / scale);

    canvas.style.position = "absolute";
    canvas.style.left = `${466 / scale}px`;
    canvas.style.top = `${200 / scale}px`;

    initialized = true;
    game = false;
    
    ctx.lineWidth = 1.5;
    resetGame();
});

function resetGame() {
    pX = canvas.width/2;
    pY = canvas.height/2;

    pDir = 0;
    tail = [];
    length = 30;
    targetLength = length;
    left = false;
    right = false;

    spawnFood();
}



// game code, its old - but im not bothered
const rotateAmount = 3*(Math.PI/180); // change
const speed = 1;
const width = 3;
const growth = 30;
var pX = canvas.width/2;
var pY = canvas.height/2;
var pDir = 0;
var tail = [];
var length = 30;
var targetLength = length;

let fX = 0;
let fY = 0;

function spawnFood() {
    const padding = 40;

    fX = Math.floor(
        Math.random()*(canvas.width-padding*2)+padding
    );

    fY = Math.floor(
        Math.random()*(canvas.height-padding*2)+padding
    );
}


var left = false; var right = false;

function body(a, b) {
    ctx.beginPath();
    let pW = 0;
    for (let i = 0; i < tail.length; i++) {
        let s = tail[i];

        let nX = a*Math.cos(s[2]);
        let nY = b*Math.sin(s[2]);

        if (i < width) {
            pW = i;
        } else if (i > tail.length-width*3) {
            let t = (tail.length-i)/(width*3);
            pW = Math.max(t*width, 0);
        } else {
            pW = width;
        }

        let x = s[0]+nX*pW;
        let y = s[1]+nY*pW;
        
        if (i == 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }

        if (Math.sqrt(Math.pow(pX-x, 2)+Math.pow(pY-y, 2)) < width && i > width) {
            ctx.closePath();

            return 1;
        }
    }
    ctx.stroke();
    ctx.closePath();

    return 0;
}

function main() {
    if (!game) return;

    if (left) pDir += rotateAmount;
    if (right) pDir -= rotateAmount;

    pX += speed * Math.sin(pDir);
    pY += speed * Math.cos(pDir);

    const distance = Math.hypot(pX - fX, pY - fY);
    if (distance < width + 5) {
        targetLength += growth;
        spawnFood();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    tail.unshift([pX, pY, pDir]);
    if (tail.length > targetLength) {
        tail.pop();
    }

    ctx.beginPath();
    ctx.arc(fX, fY, 5, 0, 2*Math.PI);
    ctx.stroke();

    if (body(1, -1) || body(-1, 1) || pX < 10 || pX > canvas.width-20 || pY < 10 || pY > canvas.height-20) {
        alert(`Game over, your score was ${(targetLength-30)/growth}!`);
    } else {
        requestAnimationFrame(main);
    }

}

function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
        e.preventDefault();
        left = true;
        run();
    }
    if (e.key === "ArrowRight") {
        e.preventDefault();
        right = true;
        run();
    }
}

function handleKeyUp(e) {
    if (e.key === "ArrowLeft") {
        e.preventDefault();
        left = false;
    }
    if (e.key === "ArrowRight") {
        e.preventDefault();
        right = false;
    }
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function run() {
    if (!initialized || game) return;

    game = true;
    requestAnimationFrame(main);
}
