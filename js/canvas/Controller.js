var runnersElement = document.getElementById("runners");
var seedElement = document.getElementById("seed");
var configElement = document.getElementById("config");
var seededWidthElement = document.getElementById("seededWidth");
var seededHeightElement = document.getElementById("seededHeight");
var isSeededElement = document.getElementById("isSeeded");

var gameOptions = {};

document.getElementById("playButton").onclick = function(){
    //set all values on gameOptions
    gameOptions.players = runnersElement.value.split('\n').sort().filter(
		function (value, index, self) { 
    		return self.indexOf(value) === index;
		}
	);
	
	var seed = Date.now()+"";
	if(isSeededElement.checked)
		seed = seedElement.value;
	gameOptions.seed = seed;
	
	gameOptions.hasSeed = isSeededElement.checked;
	seedElement.value;
	
    restart();
}

isSeededElement.onclick = function(){
    if(document.getElementById("isSeeded").checked){
        document.getElementById("seedOptions").style.display="block";
    }else{
        document.getElementById("seedOptions").style.display="none";
    }
}