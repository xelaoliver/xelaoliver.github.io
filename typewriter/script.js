const canvas = document.createElement("canvas");
document.getElementById("parent").appendChild(canvas);
const ctx = canvas.getContext("2d");

function typeTheText() {
    const typeface = new Image();

    // only start drawing characters once the typeface is loaded
    typeface.onload = function() {
        const ctx = canvas.getContext("2d");

        var text = document.getElementById("text").value;
    
        // remove characters that arent in whitelist
        for (let i = text.length-1; i >= 0; i --) {
            if (character.layout.indexOf(text[i]) == -1 && text[i] != "\n") {
                text = text.substring(0, i)+text.substring(i+1);
            }
        }
        
        const b = text.split("\n");
        
        // get longest line & height to set canvas dimensions to
        var width = 0;
        var height = b.length*character.height;
        for (let i = 0; i < b.length; i ++) {
            const length = b[i].length-((b[i].split('\\').length-1)*2);
            if (width < length) {
                width = length;
            }
        }
        width *= character.width;

        // set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // draw each character
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

    typeface.src = "/typewriter/typeface.gif";
}