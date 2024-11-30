var messages = new Array();
var ban = false;
var invis = false;
var users = new Array();

function randomId() {
	return Math.floor(Math.random()*(999-100)+100);
}

if (localStorage.getItem("username") == null) {
	localStorage.setItem("username", "waffler"+randomId());
}

if (localStorage.getItem("prev") == null) {
	localStorage.setItem("prev", "non");
}

var cloud_chat; var cloud_respond;
var oldCloud_chat = null; var oldCloud_respond = null;

if (localStorage.getItem("prev") == "owner") {
	cloud_chat = randomId()+'<span style="color: #FFAA00">'+localStorage.getItem("username")+'</span> has joined the chat!';
} else if (localStorage.getItem("prev") == "op") {
	cloud_chat = randomId()+'<span style="color: #00AAAA">'+localStorage.getItem("username")+'</span> has joined the chat!';
} else {
	cloud_chat = randomId()+'<span style="color: #333333">'+localStorage.getItem("username")+'</span> has joined the chat!';
}

function display(board, string) {
	document.getElementById(board).innerHTML = string.join('');
}

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
	let input = document.getElementById("userpad").value;
	document.getElementById("userpad").value = null;
	
	if (input == "/owner") {
		let passwordInput = prompt("Enter owner password.");
		if (passwordInput == atob("aGVhcnRhY2hlcw==")) {
			messages.unshift("You are now owner.<br>");
			localStorage.setItem("rank", "owner");
			localStorage.setItem("prev", "owner");
		} else {
			messages.unshift("Owner password incorrect.<br>");
		}
		display("chatpad", messages);
	} else if (input == "/clear") {
		messages = new Array();
		messages.unshift("&nbsp;");
		display("chatpad", messages);
	} else if (input.substring(0, 4) == "/op ") {
		if (localStorage.getItem("prev") == "owner") {
			cloud_respond = "op"+input.substring(4);
		} else {
			messages.unshift("You must be owner to do this.<br>");
			display("chatpad", messages);
		}
	} else if (input.substring(0, 6) == "/deop ") {
		if (localStorage.getItem("prev") == "owner" || input.substring(6) == localStorage.getItem("username")) {
			cloud_respond = "deop"+input.substring(6);
		} else {
			messages.unshift("You must be owner to do this.<br>");
			display("chatpad", messages);
		}
	} else if (input.substring(0, 6) == "/rank ") {
		if (localStorage.getItem("prev") == "op" || localStorage.getItem("prev") == "owner") {
			if (input.substring(6).lower.includes("owner")) {
				messages.unshift("You can't have a rank including owner!<br>");
			display("chatpad", messages);
			} else {
				localStorage.setItem("rank", input.substring(6).replace(/(<([^>]+)>)/ig, ''));
			}
		} else {
			messages.unshift("You must be an opperator to do this.<br>");
			display("chatpad", messages);
		}
	} else if (input.substring(0, 5) == "/ban ") {
		if (localStorage.getItem("prev") == "op" || localStorage.getItem("prev") == "owner") {
			cloud_respond = "ban"+input.substring(5);
		} else {
			messages.unshift("You must be an opperator to do this.<br>");
			display("chatpad", messages);
		}
	} else if (input.substring(0, 6) == "/invis") {
		if (localStorage.getItem("prev") == "owner") {
			invis = !invis;
			messages.unshift("Invisible mode switched.<br>");
			display("chatpad", messages);
		} else {
			messages.unshift("You must be an owner to do this.<br>");
			display("chatpad", messages);
		}
	} else if (input.substring(0, 6) == "/user ") {
		let oldUsername = localStorage.getItem("username");
		localStorage.setItem("username", input.substring(6).replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
		if (!invis) {
			cloud_chat = randomId()+oldUsername+" changed their name to "+localStorage.getItem("username");
			cloud_chat = randomId()+oldUsername+" changed their name to "+localStorage.getItem("username");
		}
	} else if (input.substring(0, 1) == "/") {
		messages.unshift("This is not a command, please contact Alex Oliver if you want it to be.<br>");
		display("chatpad", messages);
	} else {
		if (invis) {
			cloud_chat = randomId()+input;
		} else {
			if (localStorage.getItem("rank") == null) { 
				cloud_chat = randomId()+localStorage.getItem("username")+": "+input;
			} else {
				if (localStorage.getItem("prev") == "owner") {
					cloud_chat = randomId()+'<span style="color: #FFAA00">['+localStorage.getItem("rank")+"] "+localStorage.getItem("username")+'</span>: '+input;
				} else if (localStorage.getItem("prev") == "op") {
					cloud_chat = randomId()+'<span style="color: #00AAAA">['+localStorage.getItem("rank")+"] "+localStorage.getItem("username")+'</span>: '+input;
				} else {
					cloud_chat = randomId()+'<span style="color: #333333">['+localStorage.getItem("rank")+"] "+localStorage.getItem("username")+'</span>: '+input;
				}
			}
		}
	}
}

function main() {
	document.getElementById("pad").innerHTML = new Date().toLocaleString()+" - xelaoliver.github.io/chat - By using this chat room, you abide to the terms and conditions.";
	
	if (oldCloud_chat != cloud_chat) {
		if (cloud_chat.substring(0, 3) == "new") {
			messages.unshift(cloud_chat.substring(6)+"<br>");
			display("chatpad", messages);
			
			if (users.toString().length > cloud_respond.length) {
				users.push(localStorage.getItem("username")+"<br>");
				cloud_respond = users;
			}
		} else {
			messages.unshift(cloud_chat.substring(3)+"<br>");
			display("chatpad", messages);
		}
	}
	if (oldCloud_respond != cloud_respond) {
		if (cloud_respond.substring(0, 2) == "op" && cloud_respond.substring(2) == localStorage.getItem("username").replace(/(<([^>]+)>)/ig, '') && localStorage.getItem("prev") != "owner") {
			localStorage.setItem("prev", "op");
			localStorage.setItem("rank", "bet u begged 4 this");
			cloud_chat = randomId()+localStorage.getItem("username")+" is now an opperator.";
			messages.unshift("You are now an opperator.<br>");
			display("chatpad", messages);
		} else if (cloud_respond.substring(0, 4) == "deop" && cloud_respond.substring(4) == localStorage.getItem("username".replace(/(<([^>]+)>)/ig, '')) && localStorage.getItem("prev") == "op") {
			localStorage.setItem("prev", "non");
			localStorage.setItem("rank", "user");
			cloud_chat = randomId()+localStorage.getItem("username")+" is no longer an opperator.";
			messages.unshift("You are no longer an opperator.<br>");
			display("chatpad", messages);
		} else if (cloud_respond.substring(0, 3) == "ban" && cloud_respond.substring(3) == localStorage.getItem("username").replace(/(<([^>]+)>)/ig, '')) {
			ban = true;
			messages.unshift("You have been banned. Take the L!<br>");
			display("chatpad", messages);
			cloud_chat = randomId()+localStorage.getItem("username")+" has been banned.";
		}
	}
	oldCloud_chat = cloud_chat; oldCloud_respond = cloud_respond;
}

setInterval(function () {main()}, 10);
