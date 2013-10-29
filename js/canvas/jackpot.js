var runnersElement = document.getElementById("runners");
var seedElement = document.getElementById("seed");
var configElement = document.getElementById("config");
var seededWidthElement = document.getElementById("seededWidth");
var seededHeightElement = document.getElementById("seededHeight");
var isSeededElement = document.getElementById("isSeeded");

var ballWidth = 26;
var ballHeight = 26;
var radius = ballWidth/2;
var diameter = 2 * radius;
var diameterPowerOfTwo = diameter * diameter;
var speed = 4;
var elements;
var oneSecond = 1000;
var FPS = 30;
var frameLimit = oneSecond/FPS;
var running = true;
var timePassed = 0;
var lastLoopTime = Date.now();
var delta = 0;
var ballGenerationInterval = 1;
var lastGeneratedBallTime = 0;

var canvas= document.getElementById("game-canvas");
var context= canvas.getContext("2d");
context.textAlign="center";
context.font = "italic 40pt Calibri";

var resources = new Resources();
resources.load(
	[
		{url:"images/canvas/white.png",name:"white"}
	],
	{
		updateLoadedPercentage: function(percetLoaded){
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillText("Loading "+percetLoaded+"%", 10, 10);
		},
		loadingComplete: function(){

			//Set play button visible
		} 
	}
);

function setupCanvas(){
	if(isSeededElement.checked){
		context.canvas.width  = seededWidthElement.value;
		context.canvas.height = seededHeightElement.value;
	}else{
		context.canvas.width  = window.innerWidth;
		context.canvas.height = window.innerHeight;	
	}
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.font = "bold 20px Arial";
	context.strokeStyle = "black";
	context.lineWidth = 3;
	context.fillStyle = "white";
	context.textAlign="center";
}


var enter = 13;
var escape = 27;
document.onkeydown = function(e) {
	if(running){
    	if(e.keyCode === enter){
			killerBall();
			e.preventDefault();
		}
    }
	if(e.keyCode === escape){
		stop();
		e.preventDefault();
	}
};

function areColliding(point1, point2){
    var xs = point2.x - point1.x;
    xs *= xs;
    var ys = point2.y - point1.y;
    ys *= ys;
    return  xs + ys  < diameterPowerOfTwo;
}

function normalize(x,y){ 
	var length = Math.sqrt(x * x + y * y);
	if (length === 0) return {x:1,y:0};
	return {x:(x / length), y:(y / length)};
}

function onCollision(a, b){
	if(a.killer && !b.killer){
		b.dead = true;
	}
	if(!a.killer && b.killer){
		a.dead = true;
	}
	
	var normal = normalize(a.x-b.x,a.y-b.y);

 	b.x = a.x - (normal.x * diameter);
 	b.y = a.y - (normal.y * diameter);	
	
	var aF = a.xSpeed * normal.x + a.ySpeed * normal.y;
	var bF = b.xSpeed * normal.x + b.ySpeed * normal.y;
	var fDelta = aF - bF;
	a.xSpeed -=  fDelta * normal.x;
	a.ySpeed -=  fDelta * normal.y;
	b.xSpeed +=  fDelta * normal.x;
	b.ySpeed +=  fDelta * normal.y;
}

function isCollidingWithAny(a){
	for(var i in elements){
		if(areColliding(elements[i],a)){
			return true;
		}
	}
	return false;
}

function printTime(time){
	context.fillText(time,10,10);	
}

function Ball(x, y, xSpeed, ySpeed, name){
	this.x = x;
	this.y = y;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.name = name;
	this.canvas = getBall(name);
	this.paint = function(){
		context.drawImage(this.canvas, this.x, this.y);
		if(name){
			context.strokeText(this.name, this.x+radius, this.y);
			context.fillText(this.name, this.x+radius, this.y);
		}
	}
}
	
function randomBall(name){ 
	return new Ball(Math.random()*canvas.width,
					Math.random()*canvas.height,
					(Math.random()*speed*2)-speed,
					(Math.random()*speed*2)-speed,
					name
				);
}
	
function killerBall(){
	var firstKiller = new Ball(canvas.width/2,
					canvas.height/2,
					(Math.random()*speed*2)-speed,
					(Math.random()*speed*2)-speed
				);
	firstKiller.killer = true;
	elements.push(firstKiller);
}
	
function getSeed(){
	if(!isSeededElement.checked)
		return Date.now()+"";
	return seedElement.value;
}

function stop(){
	configElement.style.display="block";
	canvas.style.display="none";
	running = false;
}

function restart(){	
	configElement.style.display="none";
	canvas.style.display="block";
	setupCanvas();
	
	var seed = getSeed();
	Math.seedrandom(seed);
	var names = runnersElement.value.split('\n').sort().filter(
		function (value, index, self) { 
    		return self.indexOf(value) === index;
		}
	);
	
	timePassed = 0;
	running = true;
	context.clearRect(0, 0, canvas.width, canvas.height);
	elements = new Array();
	clearBalls();
	for(var i = 0; i < names.length; i++){
		var newBall = randomBall(names[i]);
		while(isCollidingWithAny(newBall)){
			newBall = randomBall(names[i]);
		}
		elements.push(newBall);
	}
	killerBall();
	delta = 0;
	lastGeneratedBallTime = 0;
	lastLoopTime = Date.now();
	requestAnimationFrame(loop);
}

function loop(){
	if(!running) return;
	var currentTime = Date.now();
	delta += currentTime - lastLoopTime;
	if(delta < frameLimit){
		lastLoopTime = Date.now();
		requestAnimationFrame(loop);
		return;	
	}
	timePassed+=frameLimit;
	var timePassedInSeconds = Math.floor(timePassed/1000);
	if(timePassedInSeconds-lastGeneratedBallTime >= ballGenerationInterval){
		lastGeneratedBallTime = timePassedInSeconds;
		killerBall();
	}
	
	printTime(Math.floor(timePassed/1000));
	context.clearRect(0, 0,canvas.width, canvas.height);
	for(var i=0;i<elements.length;i++){elements[i].x+=elements[i].xSpeed;
		elements[i].y+=elements[i].ySpeed;
		
		if(elements[i].x + diameter > canvas.width)
			elements[i].xSpeed = -Math.abs(elements[i].xSpeed);
		if(elements[i].x < 0)
			elements[i].xSpeed = Math.abs(elements[i].xSpeed);
		if(elements[i].y + diameter > canvas.height)
			elements[i].ySpeed = -Math.abs(elements[i].ySpeed);
		if(elements[i].y < 0)
			elements[i].ySpeed = Math.abs(elements[i].ySpeed);
	}
	for(var i=0;i<elements.length;i++){
		for(var j=i+1;j<elements.length;j++){
			if(areColliding(elements[i],elements[j])){
				onCollision(elements[i],elements[j]);
				break;
			}
		}
		
	}
	var liveCount = 0;
	for(var i=elements.length-1;i>=0;i--){
		if(elements[i].dead){
			elements.splice(elements.indexOf(elements[i]), 1);
		}else{
			if(!elements[i].killer)
				liveCount++;
			elements[i].paint();
		}
	}
	if(liveCount == 1)
		running = false;
	lastLoopTime = Date.now();
	delta = 0;
	requestAnimationFrame(loop);			
}
