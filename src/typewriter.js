// typeface presets
const character = {
    "width": 23.33, "height": 32, "x-spacing": 13.2, "y-spacing": 35,
    "layout": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890,.=+-?%;:       *\"/@£_&'()"
}

function typeText(canvas, text) {
    const typeface = new Image();

    // only start drawing characters once the typeface is loaded
    typeface.onload = function() {
        const ctx = canvas.getContext("2d");

        // set canvas dimensions
        canvas.width = text.length*character.width;
        canvas.height = character.height;

        // draw each character
        for (let x = 0; x < text.length; x++) {
            const i = character.layout.indexOf(text[x]);

            // character not in layout
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

    typeface.src = "/typewriter/typeface.gif";
}