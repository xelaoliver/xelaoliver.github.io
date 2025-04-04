if (localStorage.getItem("username") == null) {
    localStorage.setItem("username", "Guest"+Math.floor(Math.random()*(887)+111));
}

var cloud_chat = `${localStorage.getItem("username")} has just entered the chat board.<br>`;
var oldCloud_chat;

function send(text, pureText) {
    if (pureText == "/clear") {
        document.getElementById("chat-container").innerHTML = null;
    } else if (pureText.substring(0, 6) == "/user ") {
        let oldUsername = localStorage.getItem("username");
        localStorage.setItem("username", pureText.substring(6));
        cloud_chat = `${oldUsername} has renamed themselves to ${localStorage.getItem("username")}<br>`;
    } else {
        cloud_chat = text;
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("text-input").addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            send(`${localStorage.getItem("username")}: ${document.getElementById("text-input").value}<br>`, document.getElementById("text-input").value);
            document.getElementById("text-input").value = null;
        }
    })
})

setInterval(function () {
    if (cloud_chat != oldCloud_chat) {
        document.getElementById("chat-container").innerHTML = cloud_chat+document.getElementById("chat-container").innerHTML;
        document.getElementById("chat-container").scrollTop = 0;
    }

    oldCloud_chat = cloud_chat;
}, 1000/15)
