const projects = [
    ["Typewritist", "https://xelaoliver.github.io/typewriter/"],
    ["Player Piano", "https://xelaoliver.github.io/piano/"],
    ["Driving Simulator", "https://xelaoliver.github.io/drive/"],
    ["Rolodex of Algorithms", "https://xelaoliver.github.io/algorithms/"],
    ["Clock Demonstrations & Programs", "https://github.com/xelaoliver/demos"]
]

const container = document.getElementById("box");
const fixText = document.getElementById("text");

function getWidth(lengthofText) {
    var width = 0;
    for (let i = 0; i < lengthofText; i ++) {
        const length = lengthofText;
        if (width < length) {
            width = length;
        }
    }
    return width *= character.width;
}

for (let i = 0; i < projects.length; i ++) {
    let project = document.createElement("canvas");
    project.id = i;
    container.appendChild(project);
    fixText.value = projects[i][0];

    var canvas = document.getElementById(i);
    var ctx = canvas.getContext("2d");

    typeText();
}