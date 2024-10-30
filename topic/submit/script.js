function process() {
  let output = '<p id="chatpad" style="padding: 10px; background-color:'+document.getElementById("colour").value+'; color: black; text-decoration: none; border-radius: 5px;">';
    
  output += document.getElementById("title").value;
  output += '<span class="single-line" style="float: right;">';
  output += document.getElementById("author").value+" ";
  
  let startingdate = document.getElementById("startingdate").value.replaceAll("-", "/");
  let endingdate = document.getElementById("endingdate").value.replaceAll("-", "/");

  let startParts = startingdate.split("/");
  let endParts = endingdate.split("/");

  startingdate = startParts[2] + "/" + startParts[1] + "/" + startParts[0];
  endingdate = endParts[2] + "/" + endParts[1] + "/" + endParts[0];

  output += startingdate + "-" + endingdate;
  output += '</span><br><br><span style="display: flex;"><img src="';
  output += document.getElementById("image").value;
  output += '" style="margin-right: 10px;"><span>';
  output += document.getElementById("information").value;
  output += '</span></span><br></p>';

  document.getElementById("output").innerHTML = output;
  console.log(output);
}
