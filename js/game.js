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
UJAPP.framePerUpdate = 0;
UJAPP.frameAtual = 0;
UJAPP.players = [];

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
	//_state: false,
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
		this.bind('MouseOver', function(){ if(this._over) this.sprite(1, this._line); })
		this.bind('MouseOut', function(){ if(this._over) this.sprite(0, this._line); })
	},
	line: function(l) { this._line = l; return this;},
	soundFile: function(sf) { this._sound = sf; return this; },
	setModeOver: function(b) { this._over = b; return this;},
	setModeOnOff: function(b) { this._onOff = b; return this;}
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
	
	//velo = new Crafty.math.Vector2D(b1.v);
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