// Alex Oliver, 2026
// Simple script that translate webpage from english into japanese
// just include <script src="sources.js" defer></script>

// japanese translation
const translateButton = document.createElement("button");
translateButton.id = "translateButton";
translateButton.innerText = "Translate / \u7ffb \u8a33";
translateButton.className = "notranslate";
translateButton.style.position = "absolute";
translateButton.style.right = "7px";
translateButton.style.top = "7px"
translateButton.style.zIndex = "999";

document.body.append(translateButton);

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