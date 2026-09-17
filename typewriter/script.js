const whitelist = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890,.=+-?%;:*\"/@£_&'() ";
var canvas;
var ctx;

window.onload = function() {
    canvas = document.createElement("canvas");
    document.getElementById("parent").appendChild(canvas);
    ctx = canvas.getContext("2d");
};

// parse text
function typeText() {
    var text = document.getElementById("text").value;
    
    // remove characters that arent in whitelist
    for (let i = text.length-1; i >= 0; i --) {
        if (whitelist.indexOf(text[i]) == -1 && text[i] != "\n") {
            text = text.substring(0, i)+text.substring(i+1);
        }
    }

    const b = text.split("\n");
    
    // get longest line & height to set canvas dimensions to
    var width = 0;
    var height = b.length*24;
    for (let i = 0; i < b.length; i ++) {
        if (width < b[i].length) {
            width = b[i].length;
        }
    }
    width *= 24;
    
    // edit canvas dimensions
    canvas.width = `${width}`;
    canvas.height = `${height}`;
    canvas.style.border = "1px solid black";
    
    // type text
}