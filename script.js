const projects = [
    ["Typewritist", "https://xelaoliver.github.io/typewriter/"],
    ["Player Piano", "https://xelaoliver.github.io/piano/"],
    ["Driving Simulator", "https://xelaoliver.github.io/drive/"],
    ["Rolodex of Algorithms", "https://xelaoliver.github.io/algorithms/"],
    ["Clock Demonstrations & Programs", "https://github.com/xelaoliver/demos"]
]

const typeface = document.getElementById("typeface");
const container = document.getElementById("box");

// thanks to typewriter/script.js

const whitelist = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890,.=+-?%;:*\"/@£_&'() ";
const character = {
    "width": 23.33, "height": 32, "x-spacing": 13.2, "y-spacing": 35,
    "layout": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890,.=+-?%;:       *\"/@£_&'()"
}

function typeText(text) {
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions.
    canvas.width = text.length*character.width;
    canvas.height = character.height;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw each character.
    for (let x = 0; x < text.length; x++) {
        const i = character.layout.indexOf(text[x]);

        // character not in whitelist
        if (i === -1) {
            continue;
        }

        const a = i%26;
        const c = Math.floor(i/26);

        ctx.drawImage(
            typeface,
            (a*character.width)+(a*character["x-spacing"]),
            (c*character.height)+(c*character["y-spacing"]),
            character.width,
            character.height,
            x*character.width,
            0,
            character.width,
            character.height
        );
    }
}

for (let i = 0; i < projects.length; i ++) {
    let project = document.createElement("canvas");
    project.id = i;
    project.style.cssText = "position: absolute;";

    const x = Math.floor(Math.random()*(container.clientWidth-(projects[i][0].length*character.width))/character.width)*character.width;
    const y = Math.floor(Math.random()*(container.clientHeight-character.height)/character.height)*character.height;

    project.style.transform = `translate(${x}px, ${y}px)`;

    let link = document.createElement("a");
    link.href = projects[i][1];

    container.appendChild(link);
    link.appendChild(project);

    var canvas = document.getElementById(i);
    var ctx = canvas.getContext("2d");

    typeText(projects[i][0]);
}