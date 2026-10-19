const child = document.querySelector("a");
child.style.filter = "invert(1)";

// set canvas dimensions
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 750;

function daysInMonth(year, month) {
    return new Date(year, month+1, 0).getDate();
}

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const date = new Date();

    // the sun
    ctx.shadowBlur = 30;
    ctx.shadowColor = "#FFCC33";
    ctx.fillStyle = "#FFCC33";
    ctx.strokeStyle = "#FFCC33";

    ctx.beginPath();
    ctx.arc(500, 375, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // the earth completes an orbit per year
    const yearProgress =
        (date.getMonth()+(date.getDate()-1+(date.getHours()+
        date.getMinutes()/60)/24)/
        daysInMonth(date.getFullYear(), date.getMonth()))/12;

    const orbitPosition = yearProgress*Math.PI*2;

    const earthX = 500+Math.cos(orbitPosition)*300;
    const earthY = 375+Math.sin(orbitPosition)*300;

    ctx.shadowBlur = 10;
    ctx.shadowColor = "#215a7a";
    ctx.fillStyle = "#215a7a";
    ctx.strokeStyle = "#215a7a";

    // draw the earth
    ctx.beginPath();
    ctx.arc(earthX, earthY, 15, 0, Math.PI * 2);
    ctx.fill();

    // draw the earths orbital path
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(180, 200, 220, 0.4)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc(500, 375, 300, 0, Math.PI * 2);
    ctx.stroke();

    // moon completes an orbit per 24 hours
    const timeProgress =
        (date.getHours()+date.getMinutes()/60+date.getSeconds()/3600)/24;

    const moonAngle = timeProgress*Math.PI*2-Math.PI/2;
    
    const moonX = earthX+Math.cos(moonAngle)*35;
    const moonY = earthY+Math.sin(moonAngle)*35;

    // draw the moons orbital path
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(180, 200, 220, 0.4)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc(earthX, earthY, 35, 0, Math.PI * 2);
    ctx.stroke();

    // draw the moon
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#E8EDF5";
    ctx.fillStyle = "#E8EDF5";

    ctx.beginPath();
    ctx.arc(moonX, moonY, 6, 0, Math.PI*2);
    ctx.fill();

    // display current time
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#E8EDF5";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";

    ctx.fillText(
        date.toLocaleTimeString(),
        earthX,
        earthY+58
    );

    requestAnimationFrame(main);
}

main();
