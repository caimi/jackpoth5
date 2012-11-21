var UJAPP = {};
UJAPP.W = 1280;
UJAPP.H = 800;
UJAPP.prize = 1;
UJAPP.READY = 0;
UJAPP.RUNNING = 1;
UJAPP.DYING = 2;
UJAPP.DEAD = 3;
UJAPP.PLAYER = 0;
UJAPP.KILLER = 1;
UJAPP.PAUSE = true;
UJAPP.vmin = -5.0;
UJAPP.vmax = 5.0;
UJAPP.totalPlayers = 10;
UJAPP.totalKillers = 0;
UJAPP.framePerUpdate = 4;
UJAPP.frameAtual = 0;
UJAPP.players = [];

window.onload = function() {
	//start crafty
	Crafty.init(UJAPP.W, UJAPP.H);
	//Crafty.canvas.init(UJAPP.W, UJAPP.H);
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
	Crafty.audio.add("ploc", "kill2.wav");
	Crafty.audio.add("go", "go.wav");
	
	Crafty.sprite(74, 74, "start.png", {
		bt_start:  [0,0],
		bt_start_over:  [1,0],
		bt_start_clicked:  [2,1],
		bt_start_on:  [3,1]
	});

	Crafty.sprite(26, 26, "explosions2.png", {
		x0:  [0,0],
		x1:  [0,1],
		x2:  [0,2],
		x3:  [0,3],
		x4:  [0,4],
		x5:  [0,5]
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
	
	Crafty.sprite(26, 26, "ball3.png", {
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
		ball31: [5,0]
		/*ball1:  [0,0],
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
	Crafty.viewport.scale(window.innerHeight/500);
	var bg = Crafty.e("2D, DOM, Image, Mouse")
		.image("splash_800x500.png", "no-repeat")
		.bind('Click', function(){ Crafty.scene("jackpot") }); 
	Crafty.background(bg);
	UJAPP.players = [];
});

Crafty.scene("jackpot", function() {
	Crafty.viewport.scale(window.innerWidth/1280);
	var img = "jackpot_1280x800";// + Crafty.viewport.width + "x" + Crafty.viewport.height;
	var bg = Crafty.e("2D, DOM, Image").attr({
		w : Crafty.viewport.width,
		h : Crafty.viewport.height
	}).image(img + ".png", "no-repeat");
	//Crafty.background(bg);
	// Crafty.e("HTML, Keyboard")
	   // .attr({x:20, y:70, w:180, h:UJAPP.H-10})
	   // .replace("<textarea style='width: 170px;height: 620px; background-color: #000;'></textarea>");
	Crafty.e("2D, DOM, Text, cueBallTotal")
		.attr({ x: 340, y: UJAPP.H-60, w: 40, h: 30 })
		.css({"font-family":"impact", "font-size":"24pt", "Color":"#fff", "text-align":"right"})
	// Crafty.e("2D, DOM, bt_pause, Button")
		// .attr({ x : 600, y : UJAPP.H-90, w : 34, h : 34 })
	Crafty.e("2D, DOM, bt_cueball, Button")
		.attr( { x : 640, y : UJAPP.H-90, w : 34, h : 34} )
		.bind("Click", function()
			{
				var e = Crafty.e("Ball, ball31").attr({ x:700, y:400});
				e.p.x = 700;
				e.p.y = 400;
				e.type = UJAPP.KILLER;
				UJAPP.players.push(e);
				Crafty("cueBallTotal").text(Crafty("ball31").length);
			}
		)
		.line(1)
		.soundFile('go');
	Crafty.e("2D, DOM, bt_sound, Button")
		.attr( { x : 680, y : UJAPP.H-90, w : 34, h : 34} )
		.bind("Click", function()
		{
			var e = Crafty.e("Ball, Player, ball" + ((UJAPP.players.length % 30)+1)).attr({ x:700, y:400});
			UJAPP.players.push(e);
			e.p.x = 700;
			e.p.y = 400;
			e.v.x = UJAPP.players.length % 2 * 8 + 1;
			e.v.y = 0;
		})
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
		.bind("Click", function()
		{
			var e = Crafty.e("Ball, Player, ball" + ((UJAPP.players.length % 30)+1)).attr({ x:700, y:400});
			UJAPP.players.push(e);
			e.p.x = 700;
			e.p.y = 400;
		})
		.line(5);
	Crafty.e("2D, DOM, bt_remove, Button")
		.attr( { x : 840, y : UJAPP.H-90, w : 34, h : 34} )
		.bind("Click", function()
		{
			var last = UJAPP.players.pop();
			last.destroy();
		})	
		.line(6);
	Crafty.e("2D, DOM, bt_menu, Button")
		.attr( { x : 880, y : UJAPP.H-90, w : 34, h : 34} )
		.bind("Click", function(){ Crafty.scene("splash");})
		.line(7);
		
	Crafty.e("2D, DOM, bt_start, Button")
		.attr( { x : 520, y : UJAPP.H-90, w : 74, h : 74} )
		.bind("Click", function(){ pause()})
		.setModeOnOff(true);
		
	for (var i = 0; i < UJAPP.totalPlayers; i++){
		UJAPP.players[i] = ( Crafty.e("Ball, Player, ball" + ((i % 31)+1)) );
		Crafty.e("2D, DOM, Text")
			.attr({x: 30, y:100+(i*25), w:200, h: 20})
			.css({"font-size":"10px"})
			.text(function(){return "vel("+ UJAPP.players[i].v.x +", "+ UJAPP.players[i].v.y+")"});
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
	line: function(l) { this._line = l; return this;},
	soundFile: function(sf) { this._sound = sf; return this; },
	setModeOnOff: function(b) { this._onOff = b; return this;}
});

Crafty.c("Ball",{
	_state: UJAPP.READY,
	init: function()
	{
		this.addComponent("2D, DOM, SpriteAnimation, x0");
		this.v = new Crafty.math.Vector2D(0,0);//velocity
		this.p = new Crafty.math.Vector2D(0,0);//position
		this.r = 13; //raio
		// this.v.x = Crafty.math.randomInt(UJAPP.vmin, UJAPP.vmax);
		// this.v.y = Crafty.math.randomInt(UJAPP.vmin, UJAPP.vmax); 
		this.v.x = randomRange(UJAPP.vmin, UJAPP.vmax);
		this.v.y = randomRange(UJAPP.vmin, UJAPP.vmax); 
		this.animate('explode', [[0,6], [1,6], [2,6], [3,6], [4,6], [5,6], 
								 [0,7], [1,7], [2,7], [3,7], [4,7], [5,7], 
								 [0,8], [1,8], [2,8], [3,8], [4,8], [5,8]]);

		this.p.x = Crafty.math.randomInt(200 + this.r, UJAPP.W-43);
		this.p.y = Crafty.math.randomInt(70 + this.r, UJAPP.H-123);
		this.attr({x: this.p.x - this.r , y: this.p.y - this.r });
		this.collidded = false;
		this.type = UJAPP.PLAYER;

		this.bind('EnterFrame', update)
		this.bind('KeyDown', function(e)
		{
			if(e.key == Crafty.keys['PAGE_UP']){
		     	this.v.y = 1;
		     	this.v.x = 0;
			} 
		    else if(e.key == Crafty.keys['PAGE_DOWN']){
		     	this.v.x = 0;
		     	this.v.y = -1;
		     }
			else if(e.key == Crafty.keys['SPACE']){
		     	this.v.x = randomRange(UJAPP.vmin, UJAPP.vmax);
		     	this.v.y = randomRange(UJAPP.vmin, UJAPP.vmax);					
			};
		});
	}
});

function update(){
	if(UJAPP.PAUSE) return;
	UJAPP.frameAtual = UJAPP.frameAtual + 1;
	
	if(UJAPP.frameAtual >= UJAPP.framePerUpdate){
		UJAPP.frameAtual = 0;
		for(var i=0; i<UJAPP.players.length; i++){
			UJAPP.players[i].collided = false;
		}
		for(var i=0; i<UJAPP.players.length; i++){
			for(var j=i; j<UJAPP.players.length; j++){
				if( isCollided( UJAPP.players[i], UJAPP.players[j]) ) {
					collitionEffect(UJAPP.players[i], UJAPP.players[j] )
				}
			}
		}
	}
		
	if(this.p.x < 200 + this.r){		
		this.v.x = -this.v.x;
		this.p.x = 200 + this.r;
	}
	if(this.p.x > (UJAPP.W-21 - this.r)){
		this.v.x = -this.v.x;
		this.p.x = (UJAPP.W-21 - this.r);	
	}
	if(this.p.y < 70+ this.r){
		this.v.y = -this.v.y;
		this.p.y = 70+ this.r;		
	}
	if(this.p.y > UJAPP.H-102 - this.r){
		this.v.y = -this.v.y;
		this.p.y = UJAPP.H-102 - this.r;
	}
		
	this.p = this.p.add(this.v);
	this.x = this.p.x - this.r;
	this.y = this.p.y - this.r;
}

function isCollided(b1, b2){
	if(b1.status == UJAPP.DYING && !b1.isPlaying()) b1.destroy();
	if(b2.status == UJAPP.DYING && !b2.isPlaying()) b2.destroy();
	if(b1 == b2) return false;
	if(b1.status == UJAPP.DEAD || b2.status == UJAPP.DEAD || b1.status == UJAPP.DYING || b2.status == UJAPP.DYING ) return false;
	if(b1.collided && b2.collided) return false;
	
	if(b1.p.distanceSq(b2.p) < (b1.r+b2.r)*(b1.r+b2.r)){
		b1.collided = true;
		b2.collided = true;
		return true;
	}
	return false;
}

function collitionEffect(b1, b2){
	normal = new Crafty.math.Vector2D(b2.p.x - b1.p.x, b2.p.y - b1.p.y);
	normal.normalize();
	//2 corpos nao ocupam o mesmo lugar no espaco.
	b2.p.x = b1.p.x + scaleVector(normal, (b1.r+b2.r) ).x;
	b2.p.y = b1.p.y + scaleVector(normal, (b1.r+b2.r) ).y;

	//conservacao de energia
	f1 = b1.v.dotProduct(normal);
	f2 = b2.v.dotProduct(normal);
	
	velo = new Crafty.math.Vector2D(b1.v);
	b1.v.subtract(scaleVector(normal, (f1-f2)));
	b2.v.add(scaleVector(normal, (f1-f2)));
	
	if( (b1.type == UJAPP.KILLER || b2.type == UJAPP.KILLER) ){
		if(!(b1.type == UJAPP.KILLER)){
			b1.status = UJAPP.DYING;	
			Crafty.audio.play('ploc');
			b1.animate('explode', 15, 0);
		}
		if(!(b2.type == UJAPP.KILLER)){
			b2.status = UJAPP.DYING;
			Crafty.audio.play('ploc');
			b2.animate('explode', 15, 0);
		}	
	}
	

//a fisica esta estourando. limitacao forcada :(
	/*if(b1.v.x > 2*UJAPP.vmax) b1.v.x = 2*UJAPP.vmax;
	if(b1.v.x < 2*UJAPP.vmin) b1.v.x = 2*UJAPP.vmin;
	if(b1.v.y > 2*UJAPP.vmax) b1.v.y = 2*UJAPP.vmax;
	if(b1.v.y < 2*UJAPP.vmin) b1.v.y = 2*UJAPP.vmin;
	if(b2.v.x > 2*UJAPP.vmax) b2.v.x = 2*UJAPP.vmax;
	if(b2.v.x < 2*UJAPP.vmin) b2.v.x = 2*UJAPP.vmin;
	if(b2.v.y > 2*UJAPP.vmax) b2.v.y = 2*UJAPP.vmax;
	if(b2.v.y < 2*UJAPP.vmin) b2.v.y = 2*UJAPP.vmin;*/
}

function pause(){
	UJAPP.PAUSE = !UJAPP.PAUSE;
}

function randomVelocity(){
	var ent = Crafty("Ball");
	for(i=0; i<ent.length; i++){
		Crafty(ent[i]).v.x = randomRange(UJAPP.vmin, UJAPP.vmax);
		Crafty(ent[i]).v.y = randomRange(UJAPP.vmin, UJAPP.vmax);
	}
}

function randomRange(min, max){
	return min + (max-min) * Math.random();
}

function scaleVector(v1, k){
	return new Crafty.math.Vector2D(v1.x*k, v1.y*k);
}