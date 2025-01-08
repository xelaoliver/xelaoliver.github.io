var keys = {"dot": false, "dash": false, "slash": false, "delete": false}
var old = {"dot": false, "dash": false, "slash": false, "delete": false}
var code = "";
var morseCode = {  
    ".-":"a",
    "-...":"b",
    "-.-.":"c",
    "-..":"d",
    ".":"e",
    "..-.":"f",
    "--.":"g",
    "....":"h",
    "..":"i",
    ".---":"j",
    "-.-":"k",
    ".-..":"l",
    "--":"m",
    "-.":"n",
    "---":"o",
    ".--.":"p",
    "--.-":"q",
    ".-.":"r",
    "...":"s",
    "-":"t",
    "..-":"u",
    "...-":"v",
    ".--":"w",
    "-..-":"x",
    "-.--":"y",
    "--..":"z",
    "":" "
};

function keydown(evt) {
    switch (evt.keyCode) {
        case 188: keys.dot = true; break;
        case 190: keys.dash = true; break;
        case 191: keys.slash = true; break;
        case 16: keys.delete = true; break;
    }
}

function keyup(evt) {
    switch (evt.keyCode) {
        case 188: keys.dot = false; break;
        case 190: keys.dash = false; break;
        case 191: keys.slash = false; break;
        case 16: keys.delete = false; break;
    }
}

function morse() {
    if (old.dash != keys.dash && keys.dash) {
        code += "-";
    }
    if (old.dot != keys.dot && keys.dot) {
        code += ".";
    }
    if (old.slash != keys.slash && keys.slash) {
        code += "/";
    }
    if (old.delete != keys.delete && keys.delete) {
        code = code.substring(0, code.length-1);
    }

    old.dot = keys.dot; old.dash = keys.dash; old.slash = keys.slash; old.delete = keys.delete;

    var decoded = [];

    code.split("/").map(function (word) {
        word.split(" ").map(function (letter) {
            decoded.push(morseCode[letter]);
        });
    });

    document.getElementById("translate-output").textContent = decoded.toString().replaceAll(",", "");
}

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

setInterval(morse, 1000 / 60);
