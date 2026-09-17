// Alex Oliver, 2026
// Simple script that translate webpage from english into japanese
// just include <script src="sources.js" defer></script>

// japanese translation
const googleTranslate = document.createElement("div");

googleTranslate.id = "google_translate_element";
googleTranslate.style.display = "none";
googleTranslate.style.position = "absolute";
googleTranslate.style.width = "0";
googleTranslate.style.height = "0";
googleTranslate.style.overflow = "hidden";

document.body.append(googleTranslate);

const googleTranslate = document.createElement("div");

googleTranslate.id = "google_translate_element";
googleTranslate.style.display = "none";

document.body.append(googleTranslate);

const script = document.createElement("script");

script.type = "text/javascript";
script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

document.body.append(script);

function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: "en",
            includedLanguages: "en,ja"
        },
        "google_translate_element"
    );
}

document.getElementById("translateButton").addEventListener("click", () => {
    const select = document.querySelector(".goog-te-combo");

    if (select) {
        select.value = "ja";
        select.dispatchEvent(new Event("change"));
    }
});