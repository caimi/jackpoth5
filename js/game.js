var UJAPP = {};
UJAPP.W = 1280;
UJAPP.H = 800;
UJAPP.prize = 1;
UJAPP.READY = 0;
UJAPP.RUNNING = 1;
UJAPP.DYING = 2;
UJAPP.DEAD = 3;
UJAPP.KILLER = 1;
UJAPP.PAUSE = true;
UJAPP.vmin = -5.0;
UJAPP.vmax = 5.0;
UJAPP.framePerUpdate = 0;
UJAPP.frameAtual = 0;
UJAPP.colors = ['f0c700', 'd70000', '00b600', '00dddd', '007cf3', 
				'eb00eb', 'f0e395', 'f59595', 'aedb14', 'c5fdfd', 
				'10bde1', 'ffc4ff', 'efa600', 'b00d0d', '0f9d0f', 
				'009d9d', '0256ba', '6a0b6a', 'feff00', '540404', 
				'024d02', '006161', '0a1d79', '6e00ac', 'e56303', 
				'd4a8a8', 'e2e932', '9db868', '7b82ad', 'ee0088'  ]; 
UJAPP.players = [];
UJAPP.Player = {
	ball: null,
	name: '',
	color:'' 
}
UJAPP.display = {
	players: 0,
	remaning:0,
	newBall: 10,
	cueBall: 0,
	prizes: 1
};

window.onload = function() {
	Crafty.init(UJAPP.W, UJAPP.H);
	//Crafty.canvas.init(UJAPP.W, UJAPP.H);
	Crafty.viewport.init();
	Crafty.scene("loading");
};

Crafty.c("Button",{
	_sound: 'hit',
	_line: 0,
	_onOff: false,
	_over: true,
	_status: true,
	init: function(){
		this.addComponent("2D, Mouse");
		this.bind('Click', function(){
			Crafty.audio.play(this._sound);
			if(this._onOff){
				if(this._status)
					this.sprite(0, this._line);
				else
					this.sprite(3, this._line);	 
			}
		});
		this.bind('MouseOver', function(){ if(this._over) this.sprite(1, this._line); })
		this.bind('MouseOut', function(){ if(this._over) this.sprite(0, this._line); })
	},
	line: function(l) { this._line = l; return this;},
	soundFile: function(sf) { this._sound = sf; return this; },
	setModeOver: function(b) { this._over = b; return this;},
	setModeOnOff: function(b) { this._onOff = b; return this;},
	setStatus: function(s) { this._status = s; return this;}
});

Crafty.c("Ball",{
	_state: UJAPP.READY,
	init: function()
	{
		this.addComponent("2D, DOM, SpriteAnimation, ball");
		this.v = new Crafty.math.Vector2D(0,0);//velocity
		this.p = new Crafty.math.Vector2D(0,0);//position
		this.r = 13; //raio

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
			for(var j=i; j<UJAPP.players.length; j++){
				if( isCollided( UJAPP.players[i].ball, UJAPP.players[j].ball) ) {
					collitionEffect(UJAPP.players[i].ball, UJAPP.players[j].ball )
					break;
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
	if(b1 == b2) return false;
	if(b1.status == UJAPP.DYING && !b1.isPlaying()) {
		b1.status = UJAPP.DEAD;
		b1.destroy();
		printBoardNames();
	}
	if(b2.status == UJAPP.DYING && !b2.isPlaying()){
		b2.status = UJAPP.DEAD;
		b2.destroy();
		printBoardNames();
	} 
	if(b1.status == UJAPP.DEAD || b2.status == UJAPP.DEAD || b1.status == UJAPP.DYING || b2.status == UJAPP.DYING ) return false;
	
	if(b1.p.distanceSq(b2.p) < (b1.r+b2.r)*(b1.r+b2.r)){
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
	
	//velo = new Crafty.math.Vector2D(b1.v);
	b1.v.subtract(scaleVector(normal, (f1-f2)));
	b2.v.add(scaleVector(normal, (f1-f2)));
	
	if( (b1.type == UJAPP.KILLER || b2.type == UJAPP.KILLER) ){
		if(!(b1.type == UJAPP.KILLER) && b1.status != UJAPP.DEAD ){
			b1.status = UJAPP.DYING;	
			Crafty.audio.play('ploc');
			b1.animate('explode', 15, 0);
			UJAPP.display.remaning--;
		}
		if(!(b2.type == UJAPP.KILLER) && b2.status != UJAPP.DEAD){
			b2.status = UJAPP.DYING;
			Crafty.audio.play('ploc');
			b2.animate('explode', 15, 0);
			UJAPP.display.remaning--;
		}
		if(UJAPP.display.remaning <= UJAPP.display.prizes){
			pause();
		}
	}
	Crafty("dspRemaning").text(UJAPP.display.remaning);
}

function pause(){
	UJAPP.PAUSE = !UJAPP.PAUSE;
	Crafty("bt_start").setStatus(!UJAPP.PAUSE);
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

function linesToArray(lines){
	var texto = "";
	texto = lines.split("\n");
	return texto;
}

function printBoardNames(){
	var ent = Crafty("BoardNames");
	var j = 0;
	for(var i = 0; i < ent.length; i++){
		if((typeof(window[UJAPP.players[j].ball.status])) != undefined){
			Crafty(ent[i]).textColor(UJAPP.players[j].color);
			Crafty(ent[i]).text(function(){return UJAPP.players[j].name});
		}else{
			Crafty(ent[i]).textColor();
			Crafty(ent[i]).text(function(){return ''});			
		}
		j++
	}
	/*for (var i = 0; i < UJAPP.players.length; i++){
		if(UJAPP.players[i].ball.type != UJAPP.KILLER){
			if((i*16+75) < (UJAPP.H-120)){
				Crafty.e("2D, DOM, Text, BoardNames")
					.attr({x: 25, y:75+(i*16), w:200, h: 20})
					.css({"font-size":"14px", "text-shadow":"#a1a1a1 1px 1px 1px", "text-shadow":"#000 -1px -1px 1px"})
					.textColor(UJAPP.players[i].color)
					.text(function(){return UJAPP.players[i].name});
			}
		}
	}*/
}