const projects = [
    ["Typewritist", "https://xelaoliver.github.io/typewriter/"],
    ["Player Piano", "https://xelaoliver.github.io/piano/"],
    ["Driving Simulator", "https://xelaoliver.github.io/drive/"],
    ["Rolodex of Algorithms", "https://xelaoliver.github.io/algorithms/"],
    ["Clock Demonstrations & Programs", "https://github.com/xelaoliver/demos"],
    ["Quizlet Match Solver", "https://github.com/xelaoliver/quizlet-match-solver"],
    ["Master Clock", "https://xelaoliver.github.io/old-website/clock"]
]

var taken = [[], []];

const container = document.getElementById("box");

for (let i = 0; i < projects.length; i++) {
    let project = document.createElement("canvas");
    project.id = i;
    project.style.cssText = "position: absolute;";

    const width = projects[i][0].length*character.width;
    let x, y, overlaps;

    // thanks to stackoverflow for the do {} while {}
    do {
        x = Math.floor(Math.random()*(container.clientWidth-width)/character.width)*character.width;
        y = Math.floor(Math.random()*(container.clientHeight-character.height)/character.height)*character.height;

        overlaps = 0;
        for (let j = 0; j < taken[0].length; j ++) {
            const otherX = taken[0][j];
            const otherY = taken[1][j];
            const otherWidth = projects[j][0].length*character.width;

            // Check whether the two rectangles overlap.
            if (
                x < otherX+otherWidth &&
                x+width > otherX &&
                y < otherY+character.height &&
                y+character.height > otherY
            ) {
                overlaps = 1;
                break;
            }
        }
    } while (overlaps);

    project.style.transform = `translate(${x}px, ${y}px)`;

    let link = document.createElement("a");
    link.href = projects[i][1];

    container.appendChild(link);
    link.appendChild(project);

    var canvas = document.getElementById(i);
    typeText(canvas, projects[i][0]);

    taken[0].push(x);
    taken[1].push(y);
}