function findBrackets(code) {
	var brackets = [];
	var open = 0;

	for (let index = 0; index < code.length; index++) {
		if (code[index] === "[") {
			var bracketsIndex = index;
			open = 1;

			while (open > 0 && bracketsIndex < code.length) {
				bracketsIndex++;
	   
				if (code[bracketsIndex] === "[") {
					open ++;
				} else if (code[bracketsIndex] === "]") {
					open --;
				}
			}

			if (open === 0) {
				brackets.push(index, bracketsIndex);
			}
		}
	}
	return brackets;
}

function waitForKeyPress() {
	return new Promise((resolve) => {
		function onKeyPress(event) {
			document.removeEventListener('keydown', onKeyPress);
			resolve(event.key);
		}
	
	document.addEventListener('keydown', onKeyPress);
	});
}

async function arithmatic(brackets, code) {
	var pointer = 0;
	var cells = new Array(256).fill(0);
	var index = 0;
	var output = "";

	while (index < code.length) {
		if (code[index] === ">") {
			pointer++;
		} else if (code[index] === "<") {
			pointer--;
		} else if (code[index] === "+") {
			cells[pointer] = (cells[pointer] + 1) % 256;
		} else if (code[index] === "-") {
			cells[pointer] = (cells[pointer] - 1 + 256) % 256;
		} else if (code[index] === "[" && cells[pointer] === 0) {
			index = brackets[brackets.indexOf(index) + 1];
		} else if (code[index] === "]" && cells[pointer] !== 0) {
			index = brackets[brackets.indexOf(index) - 1]; 
		} else if (code[index] == ".") {
			output = output+String.fromCharCode(cells[pointer]);
		} else if (code[index] == ",") {
			alert("This compiler does not support input.");
		}
		index++;
	}
	return output;
}

async function run() {
	let code = document.getElementById("code").value;

	var brackets = findBrackets(code);
	var output = await arithmatic(brackets, code);  

	document.getElementById("out").innerHTML = output;
}

run();
