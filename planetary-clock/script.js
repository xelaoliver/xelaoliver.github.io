// invert colours of projectName
const child = document.querySelector("a");
child.style.filter = "invert(1)";

// set canvas dimensions
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 750;

function daysInMonth(year, month) {
    // https://stackoverflow.com/a/1185804

    var d = new Date(year, month+1, 0);
    return d.getDate();
}


function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.shadowBlur = 30;
    ctx.shadowColor = "#FFCC33";
    ctx.fillStyle = "#FFCC33";
    ctx.strokeStyle = "#FFCC33";
    
    ctx.beginPath();
    ctx.arc(500, 375, 50, 0, Math.PI*2);
    ctx.stroke();
    ctx.fill();
    
    const date = new Date();

    var orbitPosition = (date.getMonth()+(date.getDate()/daysInMonth(date.getFullYear(), date.getMonth())))/12;
    orbitPosition *= Math.PI*2;

    ctx.shadowBlur = 7;
    ctx.fillStyle = "#215a7a";
    ctx.strokeStyle = "#215a7a";
    ctx.shadowColor = "#215a7a";

    const earth = [
        500+Math.cos(orbitPosition)*300, 375+Math.sin(orbitPosition)*300
    ]

    ctx.beginPath();
    ctx.arc(earth[0], earth[1], 15, 0, Math.PI*2);
    ctx.fill();

    requestAnimationFrame(main);
}

main();