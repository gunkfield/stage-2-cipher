// Solution word
const SOLUTIONS = [
    "MINIONESE",
    "GRU",
    "NEFARIO",
    "KEVIN",
    "SKIBIDIDOOKIE",
    "LOWTAPERFADE",
    "JAMESSTEPHENJIMMYMRBEASTDONALDSON"
];

const NEXT_URL_ENC =
"aHR0cHM6Ly9ndW5rZmllbGQuZ2l0aHViLmlvL3N0YWdlLTMtbXVzaWMv";

const ROTATION_TIME = 1 * 60 * 1000;

let nextRotation =
    Date.now() + ROTATION_TIME;

let currentSolution =
    SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)];

let SHIFT_KEY =
    Math.floor(Math.random() * 25) + 1;

const VIG_KEY = "OBSIDIAN";

// Encrypt with Caesar cipher
function caesarEncrypt(text, shift) {
    return text
        .split("")
        .map(char => {
            const code = char.charCodeAt(0) - 65; // A = 65
            return String.fromCharCode(((code + shift) % 26) + 65);
        })
        .join("");
}

function updateCipher() {

    const caesarText =
        caesarEncrypt(currentSolution, SHIFT_KEY);

    const vigenereText =
        vigenereEncrypt(caesarText, VIG_KEY);

    const hexText =
        textToHex(vigenereText);

    document.getElementById("cipherBox").innerText =
        hexText.toUpperCase();
}

function vigenereEncrypt(text, key) {
    key = key.toUpperCase();

    let result = "";

    for (let i = 0; i < text.length; i++) {
        const textCode = text.charCodeAt(i) - 65;
        const keyCode = key.charCodeAt(i % key.length) - 65;

        result += String.fromCharCode(
            ((textCode + keyCode) % 26) + 65
        );
    }

    return result;
}

function textToHex(text) {
    return text
        .split("")
        .map(char =>
            char.charCodeAt(0)
                .toString(16)
                .padStart(2, "0")
        )
        .join("");
}

function updateTimer() {

    const remaining =
        Math.max(0, nextRotation - Date.now());

    const minutes =
        Math.floor(remaining / 60000);

    const seconds =
        Math.floor((remaining % 60000) / 1000);

    document.getElementById("timer").innerText =
        `Cipher rotates in: ${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function check() {

    const input =
        document.getElementById("answer")
            .value
            .trim()
            .toUpperCase();

    const result =
        document.getElementById("result");

    if (input === currentSolution) {

        const nextURL = atob(NEXT_URL_ENC);

        result.innerHTML = `
            <h2>Correct</h2>
            <a href="${nextURL}" target="_blank">Continue to Stage 3</a>
        `;

    } else {

        result.innerHTML =
            "<p>Incorrect</p>";

    }
}

// Initial cipher
updateCipher();

updateTimer();

// Change key every 3 minutes
setInterval(() => {

    SHIFT_KEY =
        Math.floor(Math.random() * 25) + 1;

    currentSolution =
        SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)];

    updateCipher();

    nextRotation =
        Date.now() + ROTATION_TIME;

}, ROTATION_TIME);

setInterval(updateTimer, 1000);
