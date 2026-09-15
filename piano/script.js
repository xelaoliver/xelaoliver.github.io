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
var playStart = null;
var noteI = 0;
var notes = [];

const piano = new Tone.Sampler({
    urls: {
        "A0": "A0.mp3", "C1": "C1.mp3", "D#1": "Ds1.mp3", "F#1": "Fs1.mp3", "A1": "A1.mp3", "C2": "C2.mp3", "D#2": "Ds2.mp3", "F#2": "Fs2.mp3", "A2": "A2.mp3", "C3": "C3.mp3",
        "D#3": "Ds3.mp3", "F#3": "Fs3.mp3", "A3": "A3.mp3", "C4": "C4.mp3", "D#4": "Ds4.mp3", "F#4": "Fs4.mp3", "A4": "A4.mp3", "C5": "C5.mp3", "D#5": "Ds5.mp3", "F#5": "Fs5.mp3", "A5": "A5.mp3",
        "C6": "C6.mp3", "D#6": "Ds6.mp3", "F#6": "Fs6.mp3", "A6": "A6.mp3", "C7": "C7.mp3", "D#7": "Ds7.mp3", "F#7": "Fs7.mp3", "A7": "A7.mp3", "C8": "C8.mp3"
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
    onload: () => {
        console.log("sounds loaded");
    }
}).toDestination();

const keyPositions = [
    [0, 0], [1, 0], [0, 1], [0, 2], [1, 2], [0, 3], [1, 3], [0, 4], [0, 5], [1, 5], [0, 6],
    [1, 6], [0, 7], [1, 7], [0, 8], [0, 9], [1, 9], [0, 10], [1, 10], [0, 11], [0, 12], [1, 12],
    [0, 13], [1, 13], [0, 14], [1, 14], [0, 15], [0, 16], [1, 16], [0, 17], [1, 17], [0, 18], [0, 19],
    [1, 19], [0, 20], [1, 20], [0, 21], [1, 21], [0, 22], [0, 23], [1, 23], [0, 24], [1, 24], [0, 25],
    [0, 26], [1, 26], [0, 27], [1, 27], [0, 28], [1, 28], [0, 29], [0, 30], [1, 30], [0, 31], [1, 31],
    [0, 32], [0, 33], [1, 33], [0, 34], [1, 34], [0, 35], [1, 35], [0, 36], [0, 37], [1, 37], [0, 38],
    [1, 38], [0, 39], [0, 40], [1, 40], [0, 41], [1, 41], [0, 42], [1, 42], [0, 43], [0, 44], [1, 44],
    [0, 45], [1, 45], [0, 46], [0, 47], [1, 47], [0, 48], [1, 48], [0, 49], [1, 49], [0, 50], [0, 51]
]
       
var fingers = [];

/* functions to draw keyboard */
function drawFingers() {
    // draw all fingers on the piano keyboard
    for (let i = 0; i < fingers.length; i ++) {
        const key = keyPositions[fingers[i]];

        let a = 0;
        if (key[0]) {
            a = settings.whiteKeyWidth/2;
        }

        // draw finger, correct to the white/black key
        ctx.drawImage(
            image,
            key[1]*settings.whiteKeyWidth-(15*settings.fingerScale)+a,
            key[0]?20:55,
            223*settings.fingerScale,
            223*settings.fingerScale
        );
    }
}

function drawKeyboard() {
    ctx.clearRect(-50, -50, canvas.width, canvas.height);

    // draw piano keyboard
    for (let i = 0; i < 52; i ++) {
        drawKey(i, 0);

        if (blacks[i%7] && i != 51) {
            drawKey(i);
        }
    }

    // draw all fingers onto the keyboard
    drawFingers();
}

function drawKey(x, type) {
    ctx.beginPath();
    if (type == 0) { // white
        ctx.rect(x*settings.whiteKeyWidth, 0, settings.whiteKeyWidth, settings.whiteKeyHeight);
        ctx.stroke();
    } else { // black
        ctx.rect(x*settings.blackKeyWidth+(x*5)+settings.blackKeyWidth, 0, settings.blackKeyWidth, settings.blackKeyHeight);
        ctx.fill();
    }
}

/* functions to play & stop note */
function midiToNote(midi) {
    return Tone.Frequency(midi, "midi").toNote();
}

function noteOn(note) {
    if (!fingers.includes(note[1]-21)) {
        fingers.push(note[1]-21);
    }
    
    piano.triggerAttack(
        midiToNote(note[1]),
        Tone.now(),
        note[3]
    );
}

function noteOff(note) {
    const index = fingers.indexOf(note-21);
            
    if (index !== -1) {
        fingers.splice(index, 1);
    }

    piano.triggerRelease(
        midiToNote(note)
    );
}

/* parse midi */
async function loadMidi() {
    const file = document.getElementById("midiInput").files[0];
    var buffer;

    // open file or option
    if (!file) {
        const url = document.getElementById("midiSelect").value;
        const response = await fetch(url);
        buffer = await response.arrayBuffer();
    } else {
        buffer = await file.arrayBuffer();
    }

    // get information
    const midi = new Midi(buffer);
    
    const duration = Math.floor(midi.duration);
    const minutes = Math.floor(duration/60);
    const seconds = duration%60;

    document.getElementById("duration").textContent = minutes === 0 ? `${seconds} seconds` : `${minutes} minutes & ${seconds} seconds`;

    let totalNotes = 0;
    midi.tracks.forEach((track, i) => {
        totalNotes += track.notes.length;
    });
    document.getElementById("notes").textContent = totalNotes;

    // append all notes to array
    notes = [];

    midi.tracks.forEach(track => {
        track.notes.forEach(note => {
            notes.push([1, note.midi, note.time, note.velocity]); // pressed/released, note, start, velocity
            notes.push([0, note.midi, note.time+note.duration]); // pressed/released, note, end
        });
    });

    // notes.sort((a, b) => a[0]-b[0]);
    notes.sort((a, b) => a[2]-b[2]);

    // reset playback state
    fingers.length = 0;
}

/* play midi file */
function play(timestamp) {
    if (playStart === null) {
        playStart = timestamp;
    }
    
    const currentTime = (timestamp-playStart)/1000; // convert to seconds

    while (noteI < notes.length && notes[noteI][2] <= currentTime) {
        const note = notes[noteI];

        if (note[0] == 1) {
            noteOn(note);
        } else {
            noteOff(note[1]);
        }

        noteI ++;
    }

    drawKeyboard();

    if (noteI < notes.length || fingers.length > 0) {
        requestAnimationFrame(play);
    }
}

drawKeyboard();

document.getElementById("loadMidi").addEventListener("click", async () => {
    await Tone.start();

    await loadMidi();

    playStart = null;
    noteI = 0;

    if (image.complete) {
        requestAnimationFrame(play);
    } else {
        image.onload = () => requestAnimationFrame(play);
    }
});