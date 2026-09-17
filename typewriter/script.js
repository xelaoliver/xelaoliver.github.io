const whitelist = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890,.=+-?%;:*\"/@£_&'() ";
const character = {
    "width": 23.33, "height": 32, "x-spacing": 13.2, "y-spacing": 35,
    "layout": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890,.=+-?%;:       *\"/@£_&'()"
}
const typeface = document.getElementById("typeface");
const canvas = document.createElement("canvas");
document.getElementById("parent").appendChild(canvas);
const ctx = canvas.getContext("2d");

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
    var height = b.length*character.height;
    for (let i = 0; i < b.length; i ++) {
        if (width < b[i].length) {
            width = b[i].length;
        }
    }
    width *= character.width;
    
    // edit canvas dimensions
    canvas.width = `${width}`;
    canvas.height = `${height}`;
    canvas.style.border = "1px solid black";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // type text
    for (let y = 0; y < b.length; y ++) {
        const line = b[y];
        for (let x = 0; x < line.length; x ++) {
            const i = character.layout.indexOf(line[x]);
            const a = i%26;
            const c = Math.floor(i/26);

            ctx.drawImage(
                typeface,
                (a*character.width)+(a*character["x-spacing"]),
                (c*character.height)+(c*character["y-spacing"]),
                character.width,
                character.height,
                x*character.width,
                y*character.height,
                character.width,
                character.height
            );
        }
    }
}