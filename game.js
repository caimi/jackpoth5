var UJAPP = {};
UJAPP.W = 1280;
UJAPP.H = 800;
UJAPP.prize = 1;
UJAPP.READY = 0;
UJAPP.RUNNING = 1;
UJAPP.DYING = 2;
UJAPP.PAUSE = true;
UJAPP.vmin = -5.0;
UJAPP.vmax = 5.0;

window.onload = function() {
	//start crafty
	Crafty.init(UJAPP.W, UJAPP.H);
	Crafty.viewport.init();
	Crafty.scene("loading");
	//Crafty.pause();
	//Crafty.canvas.init();
};

Crafty.scene("loading", function() {

	Crafty.load(["jackpot_1280x800.png", "jackpot_1280x1024.png", "splash.png", "ball2.png", "ball.png"], function() {
		setTimeout(function() {
			Crafty.scene("splash");
			// Play the main scene
		}, 100);
	});
	
	Crafty.audio.add("hit", "hit.wav");
	
	Crafty.sprite(74, 74, "start.png", {
		bt_start:  [0,0],
		bt_start_over:  [1,0],
		bt_start_clicked:  [2,1],
		bt_start_on:  [3,1]
	});
	
	Crafty.sprite(34, 34, "buttons.png", {
		bt_pause:  [0,0],
		bt_pause_over:  [1,0],
		bt_cueball:  [0,1],
		bt_cueball_over:  [1,1],
		bt_sound:  [0,2],
		bt_sound_over:  [1,2],
		bt_random: [0,3],
		bt_random_over: [1,3],
		bt_label: [0,4],
		bt_label_over: [1,4],
		bt_add:[0,5],
		bt_add_over:[1,5],
		bt_remove:[0,6],
		bt_remove_over:[1,6],
		bt_menu:[0,7],
		bt_menu_over:[1,7]
	});
	
	Crafty.sprite(26, 26, "ball2.png", {
		ball1:  [0,0],
		ball2:  [0,1],
		ball3:  [0,2],
		ball4:  [0,3],
		ball5:  [0,4],
		ball6:  [0,5],
		ball7:  [1,0],
		ball8:  [1,1],
		ball9:  [1,2],
		ball10: [1,3],
		ball11: [1,4],
		ball12: [1,5],
		ball13: [2,0],
		ball14: [2,1],
		ball15: [2,2],
		ball16: [2,3],
		ball17: [2,4],
		ball18: [2,5],
		ball19: [3,0],
		ball20: [3,1],
		ball21: [3,2],
		ball22: [3,3],
		ball23: [3,4],
		ball24: [3,5],
		ball25: [4,0],
		ball26: [4,1],
		ball27: [4,2],
		ball28: [4,3],
		ball29: [4,4],
		ball30: [4,5],
		ball31: [5,0]		/*ball1:  [0,0],
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
		ball16: [3,3]*/
	});
});

Crafty.scene("splash", function() {
	Crafty.viewport.scale(900/500);
	var bg = Crafty.e("2D, DOM, Image, Mouse")
		.image("splash_800x500.png", "no-repeat")
		.bind('Click', function(){ Crafty.scene("jackpot") });  
	Crafty.background(bg);
});

Crafty.scene("jackpot", function() {
	Crafty.viewport.scale(1.125);
	var img = "jackpot_1280x800";// + Crafty.viewport.width + "x" + Crafty.viewport.height;
	var bg = Crafty.e("2D, DOM, Image").attr({
		w : Crafty.viewport.width,
		h : Crafty.viewport.height
	}).image(img + ".png", "no-repeat");
	Crafty.background(bg);
	Crafty.e("HTML, Keyboard")
	   .attr({x:20, y:70, w:180, h:UJAPP.H-10})
	   .replace("<textarea style='width: 170px;height: 620px; background-color: #000;'></textarea>");
	Crafty.e("2D, DOM, Text, cueBallTotal")
		.attr({ x: 340, y: UJAPP.H-60, w: 40, h: 30 })
		.css({"font-family":"impact", "font-size":"24pt", "Color":"#fff", "text-align":"right"})
	// Crafty.e("2D, DOM, bt_pause, Button")
		// .attr({ x : 600, y : UJAPP.H-90, w : 34, h : 34 })
	Crafty.e("2D, DOM, bt_cueball, Button")
		.attr( { x : 640, y : UJAPP.H-90, w : 34, h : 34} )
		.bind("Click", function()
			{
				Crafty.e("Ball, ball31").attr({ x:700, y:400});
				Crafty("cueBallTotal").text(Crafty("ball31").length);
			}
		)
		.line(1);
	Crafty.e("2D, DOM, bt_sound, Button")
		.attr( { x : 680, y : UJAPP.H-90, w : 34, h : 34} )
		.line(2);
	Crafty.e("2D, DOM, bt_random, Button")
		.attr( { x : 720, y : UJAPP.H-90, w : 34, h : 34} )
		.bind("Click", randomVelocity)
		.line(3);
	Crafty.e("2D, DOM, bt_label, Button")
		.attr( { x : 760, y : UJAPP.H-90, w : 34, h : 34} )
		.line(4);
	Crafty.e("2D, DOM, bt_add, Button")
		.attr( { x : 800, y : UJAPP.H-90, w : 34, h : 34} )
		.line(5);	
	Crafty.e("2D, DOM, bt_remove, Button")
		.attr( { x : 840, y : UJAPP.H-90, w : 34, h : 34} )
		.line(6);
	Crafty.e("2D, DOM, bt_menu, Button")
		.attr( { x : 880, y : UJAPP.H-90, w : 34, h : 34} )
		.bind("Click", function(){ Crafty.scene("splash");})
		.line(7);
		
	Crafty.e("2D, DOM, bt_start, Button")
		.attr( { x : 520, y : UJAPP.H-90, w : 74, h : 74} )
		.bind("Click", function(){ pause()})
		.setModeOnOff(true);
		
	players = 30;
	for (var i = 0; i < players; i++){
		b = Crafty.e("Ball, ball" + ((i % 31)+1));
	}
	
	Crafty("cueBallTotal").text(Crafty("ball31").length);
});

Crafty.c("Button",{
	_sound: 'hit',
	_line: 0,
	_onOff: false,
	_state: false,
	init: function(){
		this.addComponent("2D, Mouse");
		this.bind('Click', function(){
			Crafty.audio.play(this._sound);
			if(this._onOff){
				if(this._state)
					this.sprite(0, this._line);
				else
					this.sprite(3, this._line);	 
				this._state = !this._state;
			}
		});
		this.bind('MouseOver', function(){ if(!this._state) this.sprite(1, this._line); })
		this.bind('MouseOut', function(){ if(!this._state) this.sprite(0, this._line); })
	},
	line: function(l) { this._line = l;},
	soundFile: function(sf) { this._sound = sf; },
	setModeOnOff: function(b) { this._onOff = b}
});

Crafty.c("Ball",{
	_state: UJAPP.READY,
	init: function()
	{
		this.addComponent("2D, DOM, Collision");
		this.attr({ x: Crafty.math.randomInt(200, UJAPP.W-43), y: Crafty.math.randomInt(70, UJAPP.H-123), z:1, dX: Crafty.math.randomInt(UJAPP.vmin, UJAPP.vmax), dY: Crafty.math.randomInt(UJAPP.vmin, UJAPP.vmax) });
		this.bind('EnterFrame', detectCollision)
		this.bind('KeyDown', function(e)
		{
			if(e.key == Crafty.keys['PAGE_UP']) 
		     	this.dX = this.dX + 1;
		    else if(e.key == Crafty.keys['PAGE_DOWN'])
		     	this.dX = this.dX + 1;
			else if(e.key == Crafty.keys['SPACE']){
		     	this.dX = Crafty.math.randomInt(UJAPP.vmin, UJAPP.vmax);
		     	this.dY = Crafty.math.randomInt(UJAPP.vmin, UJAPP.vmax);					
			};
		});
	}
});

function detectCollision(){
	if(UJAPP.PAUSE) return;
	if(this.x < 200){		
		this.dX = -this.dX;
		this.x = 200;
	}
	if(this.x > UJAPP.W-43){
		this.dX = -this.dX;
		this.x = UJAPP.W-43;	
	}
	if(this.y < 70){
		this.dY = -this.dY;
		this.y = 70;		
	}
	if(this.y > UJAPP.H-123){
		this.dY = -this.dY;
		this.y = UJAPP.H-123;
	}
	
	this.x += this.dX;
	this.y += this.dY;
}

function isCollided(b1, b2){
	return false;
}

function pause(){
	UJAPP.PAUSE = !UJAPP.PAUSE;
}

function randomVelocity(){
	var ent = Crafty("Collision");
	for(i=0; i<ent.length; i++){
		Crafty(ent[i]).attr({
			dX: Crafty.math.randomInt(UJAPP.vmin, UJAPP.vmax),
			dY: Crafty.math.randomInt(UJAPP.vmin, UJAPP.vmax)
		})
	}
}