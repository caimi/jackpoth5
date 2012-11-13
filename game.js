var W = 1280;
var H = 800;
var prize = 1;
var READY = 0;
var RUNNING = 1;
var DYING = 2

window.onload = function () {
    //start crafty
    Crafty.init(W, H);
	Crafty.scene("loading");
	Crafty.pause();
    //Crafty.canvas.init();
};

//the loading screen that will display while our assets load
Crafty.scene("loading", function () {
    //load takes an array of assets and a callback when complete
	Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
		.text("Loading")
		.css({ "text-align": "center" });

		//"buttons.png", "b_branca.png", "b_preta.png", "explosions.png", "explosions2.png", "jackpot_1024x768.png", "jackpot_1280x1024.png", "jackpot_1280x800.png", "jackpot_800x600.png","start.png"
    Crafty.load(["ball.png", "jackpot_1440x900.png"], function () {
        Crafty.scene("main"); //when everything is loaded, run the main scene
    });
		Crafty.sprite(23, 26, "ball.png", {
		ball1:  [0,0],
		ball2:  [1,0],
		ball3:  [2,0],
		ball4:  [3,0],
		ball5:  [0,1],
		ball6:  [1,1],
		ball7:  [2,1],
		ball8:  [3,1],
		ball9:  [0,2],
		ball10: [1,2],
		ball11: [2,2],
		ball12: [3,2],
		ball13: [0,3],
		ball14: [1,3],
		ball15: [2,3],
		ball16: [3,3]
	});
});

Crafty.scene("main", function () {
	var font_style = { "font-family": "impact", "font-size": "30px", "text-align":"right"};
	var img = "jackpot_"+Crafty.viewport.width+"x"+Crafty.viewport.height;
	var bg = Crafty.e("2D, DOM, Image")
             .attr({w: Crafty.viewport.width, h: Crafty.viewport.height})
             .image(img+".png", "no-repeat");  
    Crafty.background(bg);

	var players = 50;
	for (var i = 0; i < players; i++) {
		axisX = Crafty.math.randomInt(200, W-43);
		axisY = Crafty.math.randomInt(70, H-123);
		
		Crafty.e("2D, DOM, ball" + Crafty.math.randomInt(1, 16) + ", Collision")
			.attr({ x: axisX, y: axisY, z:1, dX: Crafty.math.randomInt(-5.0, 5.0), dY: Crafty.math.randomInt(-5.0, 5.0) })
			.bind('EnterFrame', detectCollision)
			.bind('KeyDown', function(e){
				if(e.key == Crafty.keys['PAGE_UP']) 
			     	this.dX = this.dX + 1;
			    else if(e.key == Crafty.keys['PAGE_DOWN'])
			     	this.dX = this.dX + 1;
				else if(e.key == Crafty.keys['SPACE']){
			     	this.dX = Crafty.math.randomInt(-250/Crafty.timer.getFPS(), 250/Crafty.timer.getFPS());
			     	this.dY = Crafty.math.randomInt(-250/Crafty.timer.getFPS(), 250/Crafty.timer.getFPS());					
				}
			})
	}
	
	Crafty.e("2D, DOM, Text").attr({ w: 210, h: 60, x: 210, y: 45 })
		.bind('EnterFrame', function(){
			this.text('fps: '+Crafty.timer.getFPS())
		})
		.css({ "font-family": "tahoma", "font-size": "12px", "color":"#a1a1a1"});
	Crafty.e("2D, DOM, Text").attr({ w: 100, h: 30, x: 0, y: H-60 })
		.text(players)
		.css(font_style);
	Crafty.e("2D, DOM, Text").attr({ w: 200, h: 30, x: 0, y: H-60 })
		.text(players)
		.css(font_style);
	Crafty.e("2D, DOM, Text").attr({ w: 305, h: 30, x: 0, y: H-60 })
		.text("10")
		.css(font_style);
	Crafty.e("2D, DOM, Text").attr({ w: 380, h: 30, x: 0, y: H-60 })
		.text("0")
		.css(font_style);
	Crafty.e("2D, DOM, Text").attr({ w: 463, h: 30, x: 0, y: H-60 })
		.text(prize)
		.css(font_style)
		.bind('KeyDown', function(e){
			if(e.key == Crafty.keys['ENTER']) 
		     	Crafty.pause()
		     });	
});

function createPlayer(name, c){
	var player = new Object();
	
	player.status = READY;
	player.color = c;
	player.x = Crafty.math.randomInt(200, W-43);
	player.y = Crafty.math.randomInt(70, H-123);
	player.dx = Crafty.math.randomInt(-5, 5);
	player.dy = Crafty.math.randomInt(-5, 5);
	player.name = name;
	
	return player;
}

function detectCollision(){
	if(this.x < 200){		
		this.dX = -this.dX;
		this.x = 200;
	}
	if(this.x > W-43){
		this.dX = -this.dX;
		this.x = W-43;	
	}
	if(this.y < 70){
		this.dY = -this.dY;
		this.y = 70;		
	}
	if(this.y > H-123){
		this.dY = -this.dY;
		this.y = H-123;
	}
	
	this.x += this.dX;
	this.y += this.dY;
}
