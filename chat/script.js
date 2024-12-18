function randomId() {
	return Math.floor(Math.random()*(999-100)+100);
}

if (localStorage.getItem("username") == null) {
	localStorage.setItem("username", "guest"+randomId());
}

if (localStorage.getItem("rank") == null) {
	localStorage.setItem("rank", "regular");
}

function colouredUsername(username) {
	return '<span style="color: '+ranks[localStorage.getItem("rank")]+'">'+username+'</span>'
}

const ranks = {"regular": "#21cc98", "mayor": "#ffd43a"}
var cloud_chat = randomId()+colouredUsername(localStorage.getItem("username"))+" has joined the chat board!"; var old_cloud_chat;
var cloud_request = ""; var old_cloud_request;

var command; var banned = false;

document.addEventListener("DOMContentLoaded", (event) => {
	document.getElementById("text-input").addEventListener("keydown", function (e) {
		if (e.key === "Enter") {
		send();
		}
	})
})

function display(string, clear) {
	if (clear) {
		document.getElementById("chat").innerHTML = null;
	} else {
		document.getElementById("chat").innerHTML = string+"<br>"+document.getElementById("chat").innerHTML;
	}
}

function send() {
	if (banned) {
		return;
	}
	let input = document.getElementById("text-input").value;
	document.getElementById("text-input").value = null;
	
	input = input.replaceAll("<", "&lt;");
	input = input.replaceAll(">", "&gt;");

	if (input.substring(0, 1) == "/") {
		command = input.substring(1);

		if (command == "help") {
			display("<br> - /user <br> - /clear <br> - /ban user <br> - /mayor <br> - /theatre youtube-url<br>");
		} else if (command.substring(0, 4) == "user") {
			let oldUsername = localStorage.getItem("username");
			
			localStorage.setItem("username", command.substring(5));
			
			cloud_chat = randomId()+colouredUsername(oldUsername)+" has changed their username to "+colouredUsername(localStorage.getItem("username"));
		} else if (command == "clear") {
			display("", true);
		} else if (command.substring(0, 7) == "theatre" && command.includes("https://www.youtube.com/")) {
			cloud_chat = randomId()+localStorage.getItem("username")+" is playing something on the theatre!";
			cloud_request = randomId()+"youtube"+command.substring(8);
		} else if (command.substring(0, 3) == "ban"){
			cloud_request = randomId()+"ban"+command.substring(4);
		} else if (command == "mayor") {
			let passwordInput = prompt("Enter mayor password");
			
			if (passwordInput == atob(window.location.href.substring(parseInt(1000, 0b10), parseInt(1100, 2))===atob("eGVsYQ==")?Buffer.from("6332466d5"+window.location.href.substring(11, 12)+"585235"+0b1100100101111+"6870636d513d", atob("aGV4")).toString():"ZnVja3NoaXRjcmFw")) {
				localStorage.setItem("rank", "mayor");
				display("You are now mayor");
			} else {
				display("Go to hell!");
			}
		} else {
			display("Not a valid command.");
		}
	} else {
		cloud_chat = randomId()+colouredUsername(localStorage.getItem("username"))+": "+input;
	}
}

function main() {
	document.getElementById("time").innerHTML = new Date().toLocaleString();
	document.getElementById("rank").innerHTML = '<span style="color: '+ranks[localStorage.getItem("rank")]+'">'+localStorage.getItem("rank")+'</span>';
	document.getElementById("username").innerHTML = localStorage.getItem("username");

	if (old_cloud_chat != cloud_chat) {
		display(cloud_chat.substring(3));
	}
	if (old_cloud_request != cloud_request) {
		if (cloud_request.substring(3, 10) == "youtube") {
			const url = cloud_request.substring(7);
			const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|.*[?&]v=)|youtu\.be\/)([^#&?]*).*/;
			const match = url.match(regExp);
				
			const videoId = (match && match[1].length === 11) ? match[1] : null;

			if (videoId) {
				const iframeHTML = '<iframe width="200" height="relative" src="https://www.youtube.com/embed/'+videoId+'" allowfullscreen></iframe>';
				document.getElementById('youtube-video').innerHTML = iframeHTML;
			}
		} else if (cloud_request.substring(3, 6) == "ban" && cloud_request.substring(6) == localStorage.getItem("username") && localStorage.getItem("rank") != "mayor") {
			cloud_chat = randomId()+colouredUsername(localStorage.getItem("username"))+" has been banished.";
			display("You have been banished.");
			banned = true;
		}
	}
	
	old_cloud_chat = cloud_chat;
	old_cloud_request = cloud_request;
}

setInterval(function () {main()}, 10);
