
// =========================
// SECURITY (basic only)
// =========================

document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("keydown", function(e) {
    if (e.key === "F12") e.preventDefault();
});

// =========================
// CONFIG (DO NOT STORE ANSWER)
// =========================

// SHA-256 of "MINIONESE"
const ANSWER_HASH =
"3bf239195b4850b7c198bc6c19790c1d723aaf0a0d9d4a4230347f862124ee7b"; // placeholder

// Base64 encoded Stage 3 URL
const NEXT_URL_ENC =
"aHR0cHM6Ly9ndW5rZmllbGQuZ2l0aHViLmlvL3N0YWdlLTMtbXVzaWMv";

// Vigenère key (hidden via clue text on page)
const VIG_KEY = "OBSIDIAN";

// Cipher text (hex of MINIONESE after transformations)
const CIPHER_HEX = "4d494e494f4e455345";

// =========================
// HASH FUNCTION
// =========================

async function sha256(str) {
    const buf = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(str)
    );

    return Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// =========================
// VIGENERE DECRYPT
// =========================

function vigenereDecrypt(text, key) {
    const A = "A".charCodeAt(0);
    key = key.toUpperCase();

    let result = "";

    for (let i = 0; i < text.length; i++) {
        const c = text.charCodeAt(i) - A;
        const k = key.charCodeAt(i % key.length) - A;

        result += String.fromCharCode(((c - k + 26) % 26) + A);
    }

    return result;
}

// =========================
// CHECK ANSWER
// =========================

async function check() {

    let input = document.getElementById("answer").value.trim().toUpperCase();

    let hash = await sha256(input);

    if (hash === ANSWER_HASH) {

        const nextURL = atob(NEXT_URL_ENC);

        document.getElementById("result").innerHTML = `
            <h2>Correct</h2>
            <a href="${nextURL}" target="_blank">Continue to Stage 3</a>
        `;

    } else {
        document.getElementById("result").innerHTML =
            "<p>Incorrect</p>";
    }
}