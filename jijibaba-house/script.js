var video;
var frameSlider;
var choose = null;

function run() {
    document.getElementById("second").style.display = "none";
    document.getElementById("loft").style.display = "none";

    video = document.getElementById("video");
    frameSlider = document.getElementById("frame");

    frameSlider.addEventListener("input", () => {
        video.currentTime = frameSlider.value;
    });

    video.addEventListener("loadedmetadata", () => {
        frameSlider.max = video.duration;
        frameSlider.min = 0;
        frameSlider.step = video.duration / 120;
    });
}

function changeFloor(floor) {
    if (floor == "first") {
        document.getElementById("first").style.display = "";
        document.getElementById("second").style.display = "none";
        document.getElementById("loft").style.display = "none";
    } else if (floor == "second") {
        document.getElementById("first").style.display = "none";
        document.getElementById("second").style.display = "";
        document.getElementById("loft").style.display = "none";
    } else if (floor == "loft") {
        document.getElementById("first").style.display = "none";
        document.getElementById("second").style.display = "none";
        document.getElementById("loft").style.display = "";
    }
}

function showRoom(newSource, chooseId) {
    const source = document.getElementById("play");
    source.src = newSource;
    document.getElementById("video").style.display = "";
    picture.style.display = "none";
    video.load();
    frameSlider.value = 0;

    document.getElementById(chooseId).setAttribute("fill", "red");
    if (choose != null) {
        choose.setAttribute("fill", "blue");
    }
    choose = document.getElementById(chooseId);
}

function showPicture(newSource, chooseId) {
    const source = document.getElementById("video");
    const picture = document.getElementById("picture");
    source.style.display = "none";
    picture.style.display = "";
    picture.src = newSource;
    frameSlider.value = 0;

    document.getElementById(chooseId).setAttribute("fill", "red");
    if (choose != null) {
        choose.setAttribute("fill", "blue");
    }
    choose = document.getElementById(chooseId);
}