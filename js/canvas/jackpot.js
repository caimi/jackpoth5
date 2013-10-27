document.getElementById("seed").value = Date.now();
var timeElement = document.getElementById("time");

var ballWidth = 23;
var ballHeight = 26;
var radius = 9;
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
var ballGenerationInterval = 5;
var lastGeneratedBallTime = 0;

var canvas= document.getElementById("game-canvas");
var context= canvas.getContext("2d");

var availableColors = ["purple", "blue"];

var resources = new Resources();
resources.load(
	[
		{url:"images/canvas/purple.png",name:"purple"},
		{url:"images/canvas/blue.png",name:"blue"},
		{url:"images/canvas/white.png",name:"white"}
	],
	{
		updateLoadedPercentage: function(percetLoaded){
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillText("Carregando "+percetLoaded+"%", 10, 10);
		},
		loadingComplete: function(){
			restart();
		} 
	}
);

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
	timeElement.removeChild( timeElement.firstChild );
	timeElement.appendChild( document.createTextNode(time) );	
}

function Ball(x, y, xSpeed, ySpeed, color){
	this.x = x;
	this.y = y;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.canvas = resources.get(color);
	this.paint = function(){
		context.drawImage(this.canvas, this.x, this.y);
	}
}
	
function randomBall(){ 
	return new Ball(Math.random()*canvas.width,
					Math.random()*canvas.height,
					(Math.random()*speed*2)-speed,
					(Math.random()*speed*2)-speed,
					availableColors[Math.floor(Math.random()*10)%availableColors.length]
				);
}
	
function killerBall(){
	var firstKiller = new Ball(canvas.width/2,
					canvas.height/2,
					(Math.random()*speed*2)-speed,
					(Math.random()*speed*2)-speed,
					"white"
				);
	firstKiller.killer = true;
	elements.push(firstKiller);
}
	
function restart(){
	var seed = document.getElementById("seed").value;
	var ballCount = document.getElementById("runners").value.match(/\n/g).length + 1;
	timePassed = 0;
	running = true;
	Math.seedrandom(seed);
	context.clearRect(0, 0, canvas.width, canvas.height);
	elements = new Array();
	for(var i = 0; i < ballCount; i++){
		var newBall = randomBall();
		while(isCollidingWithAny(newBall)){
			newBall = randomBall();
		}
		elements.push(newBall);
	}
	killerBall();
	delta = 0;
	lastGeneratedBallTime = 0;
	lastLoopTime = Date.now();
	requestAnimationFrame(loop);
}

var ballWidthWithExtra = ballWidth+2;
var ballHeightWithExtra = ballHeight+2;
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
	for(var i=0;i<elements.length;i++){
 		context.clearRect(elements[i].x, elements[i].y, ballWidthWithExtra, ballHeightWithExtra);
		elements[i].x+=elements[i].xSpeed;
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
