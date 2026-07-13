// Alex Oliver, 2026

import * as Tone from "https://cdn.jsdelivr.net/npm/tone@15.0.4/+esm";
import { Midi } from "https://cdn.jsdelivr.net/npm/@tonejs/midi/+esm";

// constants
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.translate(50, 50);

const image = document.getElementById("finger");
const blacks = [1, 0, 1, 1, 0, 1, 1];
const settings = {
    "whiteKeyWidth": 15,
    "whiteKeyHeight": 80,
    "blackKeyWidth": 10,
    "blackKeyHeight": 50,
    "fingerScale": .7,
}
const keyPositions = [
    {
        "black": false,
        "x": 0
    },
    {
        "black": true,
        "x": 0
    },
    {
        "black": false,
        "x": 1
    },
    {
        "black": false,
        "x": 2
    },
    {
        "black": true,
        "x": 2
    },
    {
        "black": false,
        "x": 3
    },
    {
        "black": true,
        "x": 3
    },
    {
        "black": false,
        "x": 4
    },
    {
        "black": false,
        "x": 5
    },
    {
        "black": true,
        "x": 5
    },
    {
        "black": false,
        "x": 6
    },
    {
        "black": true,
        "x": 6
    },
    {
        "black": false,
        "x": 7
    },
    {
        "black": true,
        "x": 7
    },
    {
        "black": false,
        "x": 8
    },
    {
        "black": false,
        "x": 9
    },
    {
        "black": true,
        "x": 9
    },
    {
        "black": false,
        "x": 10
    },
    {
        "black": true,
        "x": 10
    },
    {
        "black": false,
        "x": 11
    },
    {
        "black": false,
        "x": 12
    },
    {
        "black": true,
        "x": 12
    },
    {
        "black": false,
        "x": 13
    },
    {
        "black": true,
        "x": 13
    },
    {
        "black": false,
        "x": 14
    },
    {
        "black": true,
        "x": 14
    },
    {
        "black": false,
        "x": 15
    },
    {
        "black": false,
        "x": 16
    },
    {
        "black": true,
        "x": 16
    },
    {
        "black": false,
        "x": 17
    },
    {
        "black": true,
        "x": 17
    },
    {
        "black": false,
        "x": 18
    },
    {
        "black": false,
        "x": 19
    },
    {
        "black": true,
        "x": 19
    },
    {
        "black": false,
        "x": 20
    },
    {
        "black": true,
        "x": 20
    },
    {
        "black": false,
        "x": 21
    },
    {
        "black": true,
        "x": 21
    },
    {
        "black": false,
        "x": 22
    },
    {
        "black": false,
        "x": 23
    },
    {
        "black": true,
        "x": 23
    },
    {
        "black": false,
        "x": 24
    },
    {
        "black": true,
        "x": 24
    },
    {
        "black": false,
        "x": 25
    },
    {
        "black": false,
        "x": 26
    },
    {
        "black": true,
        "x": 26
    },
    {
        "black": false,
        "x": 27
    },
    {
        "black": true,
        "x": 27
    },
    {
        "black": false,
        "x": 28
    },
    {
        "black": true,
        "x": 28
    },
    {
        "black": false,
        "x": 29
    },
    {
        "black": false,
        "x": 30
    },
    {
        "black": true,
        "x": 30
    },
    {
        "black": false,
        "x": 31
    },
    {
        "black": true,
        "x": 31
    },
    {
        "black": false,
        "x": 32
    },
    {
        "black": false,
        "x": 33
    },
    {
        "black": true,
        "x": 33
    },
    {
        "black": false,
        "x": 34
    },
    {
        "black": true,
        "x": 34
    },
    {
        "black": false,
        "x": 35
    },
    {
        "black": true,
        "x": 35
    },
    {
        "black": false,
        "x": 36
    },
    {
        "black": false,
        "x": 37
    },
    {
        "black": true,
        "x": 37
    },
    {
        "black": false,
        "x": 38
    },
    {
        "black": true,
        "x": 38
    },
    {
        "black": false,
        "x": 39
    },
    {
        "black": false,
        "x": 40
    },
    {
        "black": true,
        "x": 40
    },
    {
        "black": false,
        "x": 41
    },
    {
        "black": true,
        "x": 41
    },
    {
        "black": false,
        "x": 42
    },
    {
        "black": true,
        "x": 42
    },
    {
        "black": false,
        "x": 43
    },
    {
        "black": false,
        "x": 44
    },
    {
        "black": true,
        "x": 44
    },
    {
        "black": false,
        "x": 45
    },
    {
        "black": true,
        "x": 45
    },
    {
        "black": false,
        "x": 46
    },
    {
        "black": false,
        "x": 47
    },
    {
        "black": true,
        "x": 47
    },
    {
        "black": false,
        "x": 48
    },
    {
        "black": true,
        "x": 48
    },
    {
        "black": false,
        "x": 49
    },
    {
        "black": true,
        "x": 49
    },
    {
        "black": false,
        "x": 50
    },
    {
        "black": false,
        "x": 51
    }
]
let pianoReady = false;

const piano = new Tone.Sampler({
    urls: {
        "A0": "A0.mp3",
        "C1": "C1.mp3",
        "D#1": "Ds1.mp3",
        "F#1": "Fs1.mp3",
        "A1": "A1.mp3",
        "C2": "C2.mp3",
        "D#2": "Ds2.mp3",
        "F#2": "Fs2.mp3",
        "A2": "A2.mp3",
        "C3": "C3.mp3",
        "D#3": "Ds3.mp3",
        "F#3": "Fs3.mp3",
        "A3": "A3.mp3",
        "C4": "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        "A4": "A4.mp3",
        "C5": "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        "A5": "A5.mp3",
        "C6": "C6.mp3",
        "D#6": "Ds6.mp3",
        "F#6": "Fs6.mp3",
        "A6": "A6.mp3",
        "C7": "C7.mp3",
        "D#7": "Ds7.mp3",
        "F#7": "Fs7.mp3",
        "A7": "A7.mp3",
        "C8": "C8.mp3"
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
    onload: () => {
        console.log("piano loaded");
        pianoReady = true;
        tryStart();
    }
}).toDestination();

var fingers = [];

function drawWhiteKey(x) {
    // draw a white key, based on settings and the x position
    ctx.beginPath();
    ctx.rect(x*settings.whiteKeyWidth, 0, settings.whiteKeyWidth, settings.whiteKeyHeight);
    ctx.stroke();
}

function drawBlackKey(x) {
    // draw a black key, based on settings and the x position
    ctx.beginPath();
    ctx.rect(x*settings.blackKeyWidth+(x*5)+settings.blackKeyWidth, 0, settings.blackKeyWidth, settings.blackKeyHeight);
    ctx.fill();
}

function noteOn(midiNote, velocity=.8) {
    if (!fingers.includes(midiNote-21)) {
        fingers.push(midiNote-21);
    }

    piano.triggerAttack(
        midiToNote(midiNote),
        Tone.now(),
        velocity
    );
}

function noteOff(midiNote) {
    const index = fingers.indexOf(midiNote-21);

    if (index !== -1) {
        fingers.splice(index, 1);
    }

    piano.triggerRelease(
        midiToNote(midiNote)
    );
}

function midiToNote(midi) {
    return Tone.Frequency(midi, "midi").toNote();
}

function drawFingers() {
    // draw all fingers on the piano keyboard
    for (let i = 0; i < fingers.length; i ++) {
        const key = keyPositions[fingers[i]];
        let offset = key.black?settings.whiteKeyWidth/2:0;

        let a = 0;
        if (key.black) {
            a = settings.whiteKeyWidth/2;
        }

        // draw finger, correct to the white/black key
        ctx.drawImage(
            image,
            key.x*settings.whiteKeyWidth-(15*settings.fingerScale)+a,
            key.black?20:55,
            223*settings.fingerScale,
            223*settings.fingerScale
        );
    }
}

function drawKeyboard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw piano keyboard
    for (let i = 0; i < 52; i ++) {
        drawWhiteKey(i);

        if (blacks[i % 7] && i != 51) {
            drawBlackKey(i);
        }
    }

    // draw all fingers onto the keyboard
    drawFingers();
}

// parse midi
let notes = [];
async function loadMidi() {
    const file = document.getElementById("midiInput").files[0];

    if (!file) {
        alert("Please select a MIDI file.");
        return;
    }

    const buffer = await file.arrayBuffer();
    const midi = new Midi(buffer);

    console.log("Duration:", midi.duration);

    notes = [];

    midi.tracks.forEach(track => {
        track.notes.forEach(note => {
            notes.push([note.time, 1, note.midi, note.velocity]);
            notes.push([note.time + note.duration, 0, note.midi]);
        });
    });

    notes.sort((a, b) => a[0] - b[0]);

    // Reset playback state
    fingers.length = 0;
    noteI = 0;
    playStart = null;

    tryStart();
}

// playing midi file
let playStart = null;
let noteI = 0;

function play(timestamp) {
    // add fingers
    if (playStart === null) { playStart = timestamp;}
    const currentTime = (timestamp-playStart)/1000; // convert to seconds

    while (noteI < notes.length && notes[noteI][0] <= currentTime) {
        const [, type, midi, velocity] = notes[noteI];

        if (type === 1) {
            noteOn(midi, velocity);
        } else {
            noteOff(midi);
        }

        noteI++;
    }

    drawKeyboard();

    if (noteI < notes.length || fingers.length > 0) {
        requestAnimationFrame(play);
    }
}

function tryStart() {
    if (!pianoReady || !audioReady) {
        return;
    }

    if (image.complete) {
        requestAnimationFrame(play);
    } else {
        image.onload = () => requestAnimationFrame(play);
    }
}

let audioReady = false;
document.getElementById("loadMidi").addEventListener("click", async () => {
    await Tone.start();   // Safe to call multiple times
    audioReady = true;

    await loadMidi();
});

onload: () => {
    console.log("piano loaded");

    if (image.complete) {
        requestAnimationFrame(play);
    } else {
        image.onload = () => requestAnimationFrame(play);
    }
}