const ctx = document.getElementById('canvas').getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

var nipkowDiskData = {}
var rotation = 0;

function rotateHoleCoordinates(x, y, radian, cx, cy) {
  const relativeX = x-cx;
  const relativeY = y-cy;

  const rotatedX = relativeX*Math.cos(radian) - relativeY*Math.sin(radian);
  const rotatedY = relativeX*Math.sin(radian) + relativeY*Math.cos(radian);
	
  return [rotatedX+cx, rotatedY+cy];
}

function drawNipkowDisk() {
  nipkowDiskData = {"radius": parseFloat(document.getElementById("disk-radius").value), "holeRadius": parseFloat(document.getElementById("hole-radius").value), "distanceFromRim": parseFloat(document.getElementById("hole-spacing").value), "verticalHoles": parseFloat(document.getElementById("verticall-scan-lines").value)}
  
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, nipkowDiskData.radius, 0, 2*Math.PI);
	ctx.strokeStyle = "#000000";
	ctx.stroke();
	
	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, nipkowDiskData.holeRadius, 0, 2*Math.PI);
	ctx.strokeStyle = "#000000";
	ctx.stroke();
	
	for (let index = 0; index < nipkowDiskData.verticalHoles; index ++) {
		let angle = (((2*Math.PI)/nipkowDiskData.verticalHoles)*index)+rotation;
		
		let rotatedCoordinates = rotateHoleCoordinates(canvas.width/2, ((canvas.height/2)-(nipkowDiskData.radius-nipkowDiskData.holeRadius)+nipkowDiskData.distanceFromRim)+(index*(nipkowDiskData.holeRadius*2)), angle, canvas.width/2, canvas.height/2);
		
		ctx.beginPath();
		ctx.arc(rotatedCoordinates[0], rotatedCoordinates[1], nipkowDiskData.holeRadius, 0, 2*Math.PI);
		ctx.strokeStyle = "#000000";
		ctx.stroke();
		
		// horizontal 'scanline' guidlines
		ctx.beginPath();
		ctx.arc(canvas.width/2, canvas.height/2, Math.sqrt(Math.pow((canvas.width/2)-rotatedCoordinates[0], 2) + Math.pow((canvas.height/2)-rotatedCoordinates[1], 2)), 0, 2*Math.PI);
		ctx.strokeStyle = "#0000FF";
		ctx.stroke();
		
		ctx.beginPath();
		ctx.lineTo(nipkowDiskData.radius*Math.cos(angle)+(canvas.width/2), nipkowDiskData.radius*Math.sin(angle)+(canvas.height/2));
		ctx.lineTo(canvas.width/2, canvas.height/2);
		ctx.stroke();
		
		ctx.font = nipkowDiskData.holeRadius+"px Times New Roman";
		ctx.fillStyle = "#0000FF";
		ctx.fillText(index, rotatedCoordinates[0]+nipkowDiskData.holeRadius*1.5, rotatedCoordinates[1]-nipkowDiskData.holeRadius);
	}
	
	rotation += parseFloat(document.getElementById("rotation-speed").value);

}

setInterval(function() { drawNipkowDisk() }, 1000/60);


// drawNipkowDisk();
