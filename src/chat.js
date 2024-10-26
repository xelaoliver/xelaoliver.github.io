var messages = [];
var ban = false;
if (localStorage.getItem("rank") == null) {
  localStorage.setItem("rank", "");
}
if (localStorage.getItem("username") == null) {
  localStorage.setItem("username", "guest");
}
var cloud_chat = Math.floor(Math.random()*(999-100)+100)+localStorage.getItem("rank")+localStorage.getItem("username")+" has joined the chat.";
var cloud_update = null;
var oldCloud = null;

document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById('userpad').addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      send();
    }
  })
})

function send() {
  if (ban) {
    return;
  }
  var txt = document.getElementById("userpad").value;
  document.getElementById("userpad").value = "";
  if (txt.substring(0,6) == "/user ") {
    oldUsername = localStorage.getItem("username");
    localStorage.setItem("username", txt.substring(6,txt.length));
    cloud_chat = Math.floor(Math.random()*(999-100)+100)+oldUsername+" has changed their username to "+localStorage.getItem("username")+".";
  } else if (txt.substring(0, 7) == "/banall") {
    cloud_update = "allusers";
  } else if (txt.substring(0,5) == "/ban ") {
    cloud_update = "ban"+txt.substring(5,txt.length);
  } else if (txt == "/rank" || txt == "/rank ") {
    localStorage.setItem("rank","");
  } else if (txt.substring(0,6) == "/rank " && txt.length >= 6) {
    localStorage.setItem("rank","["+txt.substring(6,txt.length)+"] ");
  } else if (txt == "/clear") {
    messages = [];
    displayChat();
  } else if (txt != "") {
    cloud_chat = Math.floor(Math.random()*(999-100)+100)+localStorage.getItem("rank")+localStorage.getItem("username")+": "+txt;
  }
}

function displayChat() {
  document.getElementById("chatpad").innerHTML = messages.join("<br>");
}

function checkMessage() {
  if (cloud_update == "ban"+localStorage.getItem("username")) {
    cloud_chat = Math.floor(Math.random()*(999-100)+100)+localStorage.getItem("rank")+localStorage.getItem("username")+" was banned by an opperator.";
    messages.unshift("You have been banned by opperator. You will no longer be allowed to send messages.");
    ban = true;
    displayChat();
    cloud_update = null;
    alert("You have been banned by opperator.");
  } else if(cloud_update == "allusers") {
    cloud_update = localStorage.getItem("username");
  } else if (oldCloud != cloud_chat) {
    messages.unshift(cloud_chat.substring(3,cloud_chat.length));
    displayChat();
  };
  oldCloud = cloud_chat;
}

setInterval(function () {checkMessage()}, 15);
