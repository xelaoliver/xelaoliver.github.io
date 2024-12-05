var message = "";
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

if (localStorage.getItem("rank") == null) {
    localStorage.setItem("rank", "user");
}

var cloud_chat; var cloud_respond = "karlson";
var oldCloud_chat = null; var oldCloud_respond = null;

if (localStorage.getItem("prev") == "owner") {
	cloud_chat = randomId()+'<span style="color: #FFAA00">'+localStorage.getItem("username")+'</span> has joined the chat!';
} else if (localStorage.getItem("prev") == "op") {
	cloud_chat = randomId()+'<span style="color: #00AAAA">'+localStorage.getItem("username")+'</span> has joined the chat!';
} else {
	cloud_chat = randomId()+'<span style="color: #333333">'+localStorage.getItem("username")+'</span> has joined the chat!';
}

function display(board, string) {
	let temporary = document.createElement("div");
	temporary.innerHTML = string;
	string = temporary.innerHTML;
	document.getElementById(board).innerHTML = string+document.getElementById(board).innerHTML;
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
		if (passwordInput == atob(window.location.href.substring(12, 15)==atob("b2xp")?"cmFyZW9jY2FzaW9ucw":"ZnVjaw")) {
			message = ("You are now owner.<br>");
			localStorage.setItem("rank", "owner");
			localStorage.setItem("prev", "owner");
		} else {
			message = "Owner password incorrect.<br>";
		}
		display("chatpad", message);
	} else if (input == "/clear") {
		document.getElementById("chatpad") = "";
	} else if (input.substring(0, 6) == "/reset") {
		if (localStorage.getItem("prev") == "owner") {
			cloud_respond = "reset";
			display("chatpad", "Resetting...");
		} else {
			display("chatpad", "You must be owner to do this.<br>");
		}
	} else if (input == "/admin") {
		display("chatpad", "Thanks for looking at the commands!<br>");
	} else if (input.substring(0, 4) == "/op ") {
		if (localStorage.getItem("prev") == "owner") {
			cloud_respond = "op"+input.substring(4);
		} else {
			display("chatpad", "You must be owner to do this.<br>");
		}
	} else if (input.substring(0, 6) == "/deop ") {
		if (localStorage.getItem("prev") == "owner" || input.substring(6) == localStorage.getItem("username")) {
			cloud_respond = "deop"+input.substring(6);
		} else {
			display("chatpad", "You must be owner to do this.<br>");
		}
	} else if (input.substring(0, 6) == "/rank ") {
		if (localStorage.getItem("prev") == "op" || localStorage.getItem("prev") == "owner") {
			if (input.substring(6).lower.includes("owner")) {
				display("chatpad", "You can't have a rank including owner!<br>");
			} else {
				localStorage.setItem("rank", input.substring(6).replace(/(<([^>]+)>)/ig, ''));
			}
		} else {
			display("chatpad", "You must be an opperator to do this.<br>");
		}
	} else if (input.substring(0, 5) == "/ban ") {
		if (localStorage.getItem("prev") == "op" || localStorage.getItem("prev") == "owner") {
			cloud_respond = "ban"+input.substring(5);
		} else {
			display("chatpad", "You must be an opperator to do this.<br>");
		}
	} else if (input.substring(0, 6) == "/invis") {
		if (localStorage.getItem("prev") == "owner") {
			invis = !invis;
			display("chatpad", "Invisible mode toggled.<br>");
		} else {
			display("chatpad", "You must be an owner to do this.<br>");
		}
	} else if (input.substring(0, 6) == "/user ") {
		let oldUsername = localStorage.getItem("username");
		localStorage.setItem("username", input.substring(6).replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
		if (!invis) {
			if (localStorage.getItem("prev") == "owner") {
				cloud_chat = randomId()+'<span style="color: #FFAA00">'+oldUsername+'</span> changed their name to <span style="color: #FFAA00">'+localStorage.getItem("username")+'</span>';
			} else if (localStorage.getItem("prev") == "op") {
				cloud_chat = randomId()+'<span style="color: #00AAAA">'+oldUsername+'</span> changed their name to <span style="color: #00AAAA">'+localStorage.getItem("username")+'</span>';
			} else {
				cloud_chat = randomId()+oldUsername+" changed their name to "+localStorage.getItem("username");
			}
		}
	} else if (input.substring(0, 1) == "/") {
		display("chatpad", "This is not a command, please contact Alex Oliver if you want it to be.<br>");
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
	document.getElementById("pad").innerHTML = new Date().toLocaleString()+" - xelaoliver.github.io/chat - Rank: "+localStorage.getItem("prev");
	
	if (oldCloud_chat != cloud_chat) {
		if (cloud_chat.substring(0, 3) == "new") {
			message = (cloud_chat.substring(6)+"<br>");
			display("chatpad", message);
			
			if (users.toString().length > cloud_respond.length) {
				users.push(localStorage.getItem("username")+"<br>");
				cloud_respond = users;
			}
		} else {
			message = (cloud_chat.substring(3)+"<br>");
			display("chatpad", message);
		}
	}
	if (oldCloud_respond != cloud_respond) {
		if (cloud_respond.substring(0, 2) == "op" && cloud_respond.substring(2) == localStorage.getItem("username").replace(/(<([^>]+)>)/ig, '') && localStorage.getItem("prev") != "owner") {
			localStorage.setItem("prev", "op");
			localStorage.setItem("rank", "op");
			cloud_chat = randomId()+localStorage.getItem("username")+" is now an opperator.";
			display("chatpad", "You are now an opperator.<br>");
		} else if (cloud_respond.substring(0, 4) == "deop" && cloud_respond.substring(4) == localStorage.getItem("username".replace(/(<([^>]+)>)/ig, '')) && localStorage.getItem("prev") == "op") {
			localStorage.setItem("prev", "non");
			localStorage.setItem("rank", "user");
			cloud_chat = randomId()+localStorage.getItem("username")+" is no longer an opperator.";
			display("chatpad", "You are no longer an opperator.<br>");
		} else if (cloud_respond.substring(0, 3) == "ban" && cloud_respond.substring(3) == localStorage.getItem("username").replace(/(<([^>]+)>)/ig, '')) {
			ban = true;
			display("chatpad", "You have been banned. Take the L!<br>");
			cloud_chat = randomId()+localStorage.getItem("username")+" has been banned.";
		} else if (cloud_respond == "reset") {
			localStorage.clear();
			display("chatpad", "Please reload, server reset happening.");
			ban = true;
		}
	}
	oldCloud_chat = cloud_chat; oldCloud_respond = cloud_respond;
}

setInterval(function () {main()}, 10);
