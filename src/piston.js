// Alex Oliver 2026
// Combustion Engine Simulation with changeable attributes

const canvas = document.getElementById("piston"); // change id
var ctx = canvas.getContext("2d");
// const dimensions = {width: canvas.width/2, height: canvas.height/2}
const dimensions = {width: 80, height: canvas.height-80}

// for ease of rotating coords. around points
function rotate(pivot, coordinates, radians) {
    // translate points to origin of canvas
    const x = coordinates[0]-pivot[0];
    const y = coordinates[1]-pivot[1];

    // rotate around point
    const rotatedX = x*Math.cos(radians) - y*Math.sin(radians);
    const rotatedY = x*Math.sin(radians) + y*Math.cos(radians);

    // return and translate points back
    return [rotatedX+pivot[0]+dimensions.width, rotatedY+pivot[1]+dimensions.height];
}

// point in direction
function extend(coordinates, amount, radians) {
    const x = amount*Math.cos(radians);
    const y = amount*Math.sin(radians);

    return [x+coordinates[0], y+coordinates[1]];
}

// calculate direction pointing in
function direction(start, end) {
    const x = end[0]-start[0];
    const y = end[1]-start[1];

    return Math.atan2(y, x);
}

// calculate distance between 2 points
function distance(first, second) {
    return Math.hypot(
        second[0] - first[0],
        second[1] - first[1]
    );
}

// initialise arguments
const engineSpecifications = {axelRadius: 10, counterballanceRadius: 50, speed: .02, crankShaftLength: 125, pistonWidth: 100, pistonHeight: 50}
var rotation = 0;
var coordinates;    // for use when calculating coordinates
var crankAxelCoordinates;   // for use when calculating the crank axels
var angle;  // for use when calculating angles
var pistonAxelCoordinates;  // for use when calculating the piston head axel

// customisation
ctx.fillStyle = "white";
ctx.lineCap = "round";

// run indefinitely
// use ctx.closePath();
setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // clear canvas
    rotation += engineSpecifications.speed;
    rotation = rotation%(Math.PI*2);

    // draw counterballance for crankshaft
    ctx.beginPath();
    ctx.arc(dimensions.width, dimensions.height, engineSpecifications.counterballanceRadius, rotation, Math.PI+rotation);
    ctx.stroke();

    ctx.beginPath();
    coordinates = rotate([0, 0], [engineSpecifications.counterballanceRadius, 0], rotation);
    ctx.moveTo(coordinates[0], coordinates[1]);
    coordinates = rotate([0, 0], [engineSpecifications.axelRadius*2, 0], rotation);
    ctx.lineTo(coordinates[0], coordinates[1]);
    ctx.stroke();

    ctx.beginPath();
    coordinates = rotate([0, 0], [-engineSpecifications.counterballanceRadius, 0], rotation);
    ctx.moveTo(coordinates[0], coordinates[1]);
    coordinates = rotate([0, 0], [-engineSpecifications.axelRadius*2, 0], rotation);
    ctx.lineTo(coordinates[0], coordinates[1]);
    ctx.stroke();

    ctx.beginPath();
    coordinates = extend([dimensions.width, dimensions.height], engineSpecifications.counterballanceRadius-engineSpecifications.axelRadius, rotation-Math.PI/2);
    ctx.arc(coordinates[0], coordinates[1], engineSpecifications.axelRadius*2, rotation, Math.PI+rotation, true);
    ctx.stroke();

    ctx.beginPath();
    coordinates = rotate([0, 0], [engineSpecifications.axelRadius*2, 0], rotation);
    ctx.moveTo(coordinates[0], coordinates[1]);
    coordinates = extend(coordinates, engineSpecifications.counterballanceRadius-engineSpecifications.axelRadius, rotation-Math.PI/2);
    ctx.lineTo(coordinates[0], coordinates[1]);
    ctx.stroke();

    ctx.beginPath();
    coordinates = rotate([0, 0], [-engineSpecifications.axelRadius*2, 0], rotation);
    ctx.moveTo(coordinates[0], coordinates[1]);
    coordinates = extend(coordinates, engineSpecifications.counterballanceRadius-engineSpecifications.axelRadius, rotation-Math.PI/2);
    ctx.lineTo(coordinates[0], coordinates[1]);
    ctx.stroke();

    // draw crank axel
    ctx.beginPath();
    crankAxelCoordinates = rotate([0, 0], [engineSpecifications.counterballanceRadius-engineSpecifications.axelRadius, 0], rotation-Math.PI/2);
    ctx.arc(crankAxelCoordinates[0], crankAxelCoordinates[1], engineSpecifications.axelRadius, 0, Math.PI*2);
    ctx.stroke();

    // draw shaft axel and rotate to conform with the shaft
    angle = direction(crankAxelCoordinates, [dimensions.width, crankAxelCoordinates[1]-engineSpecifications.crankShaftLength]);

    pistonAxelCoordinates = [dimensions.width, crankAxelCoordinates[1]-engineSpecifications.crankShaftLength];

    ctx.beginPath();
    coordinates = rotate([
        pistonAxelCoordinates[0]-dimensions.width, pistonAxelCoordinates[1]-dimensions.height
    ], [
        (pistonAxelCoordinates[0]-dimensions.width), (pistonAxelCoordinates[1]-dimensions.height)+(engineSpecifications.axelRadius*1.5)
    ], angle);
    ctx.moveTo(coordinates[0], coordinates[1]);

    ctx.arc(crankAxelCoordinates[0], crankAxelCoordinates[1], engineSpecifications.axelRadius*3, Math.PI/2+angle, Math.PI/.66+angle);

    coordinates = rotate([
        pistonAxelCoordinates[0]-dimensions.width, pistonAxelCoordinates[1]-dimensions.height
    ], [
        (pistonAxelCoordinates[0]-dimensions.width), (pistonAxelCoordinates[1]-dimensions.height)-(engineSpecifications.axelRadius*1.5)
    ], angle);
    ctx.lineTo(coordinates[0], coordinates[1]);

    ctx.stroke();

    // draw piston axel
    ctx.beginPath();
    ctx.arc(pistonAxelCoordinates[0], pistonAxelCoordinates[1], engineSpecifications.axelRadius*1.5, Math.PI/2+angle, Math.PI/.66+angle, true);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(pistonAxelCoordinates[0], pistonAxelCoordinates[1], engineSpecifications.axelRadius, 0, Math.PI*2);
    ctx.stroke();

    // draw piston
    ctx.beginPath();
    ctx.rect(pistonAxelCoordinates[0]-engineSpecifications.pistonWidth/2, pistonAxelCoordinates[1]-engineSpecifications.pistonHeight/2,
        engineSpecifications.pistonWidth, engineSpecifications.pistonHeight
    );
    ctx.stroke();

    /*
    // draw piston "cylinder"
    ctx.beginPath();
    ctx.moveTo(dimensions.width-engineSpecifications.pistonWidth/2, engineSpecifications.crankShaftLength-engineSpecifications.pistonHeight/2+engineSpecifications.axelRadius);
    ctx.lineTo(dimensions.width-engineSpecifications.pistonWidth/2, dimensions.height-engineSpecifications.crankShaftLength/2-20);  // 20 is an abstract number
    ctx.moveTo(dimensions.width+engineSpecifications.pistonWidth/2, engineSpecifications.crankShaftLength-engineSpecifications.pistonHeight/2+engineSpecifications.axelRadius);
    ctx.lineTo(dimensions.width+engineSpecifications.pistonWidth/2, dimensions.height-engineSpecifications.crankShaftLength/2-20);  // 20 is an abstract number
    ctx.stroke();

    // draw crank "cylinder"
    ctx.beginPath();
    ctx.arc(dimensions.width, dimensions.height, engineSpecifications.counterballanceRadius+engineSpecifications.axelRadius*2, 0, Math.PI);
    ctx.stroke();

    ctx.beginPath();    // right
    angle = engineSpecifications.counterballanceRadius+engineSpecifications.axelRadius*2-engineSpecifications.pistonWidth/2;
    ctx.arc((dimensions.width+engineSpecifications.pistonWidth/2)+angle, dimensions.height-engineSpecifications.crankShaftLength/2-20, angle, Math.PI, Math.PI/2, true);
    ctx.moveTo(dimensions.width+engineSpecifications.pistonWidth/2+20, dimensions.height-engineSpecifications.crankShaftLength/2);
    ctx.lineTo(dimensions.width+engineSpecifications.pistonWidth/2+20, dimensions.height);
    ctx.stroke();

    ctx.beginPath();    // left
    angle = engineSpecifications.counterballanceRadius+engineSpecifications.axelRadius*2-engineSpecifications.pistonWidth/2;
    ctx.arc((dimensions.width-engineSpecifications.pistonWidth/2)-angle, dimensions.height-engineSpecifications.crankShaftLength/2-20, angle, Math.PI/2, 0, true);
    ctx.moveTo(dimensions.width-engineSpecifications.pistonWidth/2-20, dimensions.height-engineSpecifications.crankShaftLength/2);
    ctx.lineTo(dimensions.width-engineSpecifications.pistonWidth/2-20, dimensions.height);
    ctx.stroke();

    // cap of the piston "cylinder"
    ctx.beginPath();
    ctx.arc(dimensions.width, engineSpecifications.crankShaftLength-engineSpecifications.pistonHeight/2+engineSpecifications.axelRadius, engineSpecifications.pistonWidth/2, 0, Math.PI, true);
    ctx.stroke();
    */

    // draw axel
    ctx.beginPath();
    ctx.arc(dimensions.width, dimensions.height, engineSpecifications.axelRadius, 0, Math.PI*2);
    ctx.stroke();
}, .06);