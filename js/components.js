Crafty.c("Ball",{
	_ballType: '',
	init: function(){
		this.addComponent("2D, Canvas, SpriteAnimation, Tween");
		this.v = new Crafty.math.Vector2D(0,0);//velocity
		this.p = new Crafty.math.Vector2D(0,0);//position
		this.r = 10; //raio
		this.v.x = km.random(-Jackpot.vmax, Jackpot.vmax);
		this.v.y = km.random(-Jackpot.vmax, Jackpot.vmax);
		this.p.x = km.random(Jackpot.left + this.r, Jackpot.W - Jackpot.right - this.r);
		this.p.y = km.random(Jackpot.top + this.r, Jackpot.H - Jackpot.bottom - this.r);
		this.attr({x: this.p.x - this.r , y: this.p.y - this.r, status: 'idle', name:'ball' });
		this.opac = 1;
		this.bind('TweenEnd', function(){this.destroy();});
	},
	setPosition: function(x, y){this.p.x = x; this.p.y = y; return this;},
	setBallType: function(type){this._ballType = type; return this;},
});

Crafty.c("Player",{
	_name:'',
	Player: function(name){ this._name = name; }
});

Crafty.c("Explosion",{
	init: function(){
		this.addComponent("2D, Canvas, SpriteAnimation, explode");
		this.reel('explode1', 750, 0, 1, 15 );
		this.reel('explode2', 750, 0, 2, 15 );
		this.reel('explode3', 750, 0, 3, 15 );
		this.reel('explode4', 750, 0, 4, 15 );
		this.reel('explode5', 750, 0, 5, 15 );
		this.reel('explode6', 750, 0, 6, 15 );
		this.reel('explode7', 750, 0, 7, 15 );
		this.reel('explode8', 750, 0, 8, 15 );
		this.reel('explode9', 750, 0, 9, 15 );
		this.reel('explode10', 750, 0, 10, 15 );

		this.bind('EnterFrame', function(){ if(!this.isPlaying()) this.destroy(); return this;});
	}
});

Crafty.c("Button",{
	_type:'',
	_sound: 'hit',
	init: function(){
		this.addComponent("2D, Canvas, Mouse");
		this.bind('Click', function(){
			Crafty.audio.play(this._sound, 1, Jackpot.options.volume);
		});
		this.bind('MouseOver', function(){this.toggleComponent(this._type, this._type+'_over');});
		this.bind('MouseOut', function(){this.toggleComponent(this._type, this._type+'_over');});
	},
	setType: function(type) { this._type = type; return this;},
	setSound: function(sound) { this._sound = sound; return this; }
});

Crafty.c("Checkbox",{
	_value:true,
	_sound: 'hit',
	_trueSprite: 'bt_check',
	_falseSprite: 'bt_nocheck',
	init: function(){
		this.addComponent("2D, Canvas, Mouse, " + this._trueSprite);
		this.bind('Click', function(){
			Crafty.audio.play(this._sound, 1, Jackpot.options.volume);
			this.toggleComponent(this._trueSprite, this._falseSprite);
			this._value = !this._value; 
		});
	},
	setValue: function(b){
		this.addComponent(b?this._trueSprite:this._falseSprite);
		this.removeComponent(b?this._falseSprite:this._trueSprite); 
		this._value = b; 
		return this;
	},
	setSound: function(sound) { this._sound = sound; return this; },
	setToggleSprite: function(imgTrue, imgFalse){ this._trueSprite = imgTrue; this._falseSprite=imgFalse; return this;}
});

Crafty.c("Alert",{
	_sound: 'hit',
	_msg: '	<div class="alert" style="margin-top: 250px" ><div class="titulo">Atenção</div><div class="corpo">{0}<br></div><div class="botao"><span>OK</span></div></div>',
	_alert: '',
	init: function(){
		this.addComponent("2D, DOM, HTML, Text, Mouse");
		this.attr({x: (Jackpot.W-200)/2, y:(Jackpot.H-400)/2, visible: false, z: 1000});
		this.replace(this._msg.format(this._alert));
		this.bind('Click', function(){
			Crafty.audio.play(this._sound, 1, Jackpot.options.volume);
			//this.visible = false;
			this.destroy();
		});
	},
	setAlert: function(alert){
		this._alert = alert;
		msgbox = this._msg.format(this._alert);
		this.replace(msgbox); 
		this.visible = true; 
		return;
	}	
});

Crafty.c("ProgressBar", {
	_value: 0,
	_width: 400, 
	_innerHtml: 
		 '<div style="border: 1px solid #ffcc33; padding 2px; width: {0}px; height: 26px; display: table;">'+
	     '  <div style="background-color: #ffcc33; width: {1}px; text-align: center; margin:3px; font-size: 16px; height:22px; vertical-align: middle; font-weight: bold">'+
		 		'<span style="padding-top:3px; display: inline-block; color:#333333">{2}%</span></div>'+
	     '</div>'
	     ,
	init: function(){
		this.addComponent("2D, DOM, HTML");
		this.replace(this._innerHtml.format(this._width, Math.min(100, this._value/100*this._width), this._value));
	},
	setValue: function(percent){ this._value = percent; this.update(); return this;},
	update: function(){
		var html = this._innerHtml.format(this._width, Math.min(this._width, this._value/100*this._width), Math.min(100, this._value) );
		this.replace(html);
	}
});

Crafty.c("ToggleBox", {
	_innerHtml: 
		'<div class="toggle-box" style="width: {0}px">' +
		'<div class="title">{1}</div>' +
		'<div class="body">{2}</div>' + 
		'</div>',
	_width: 400,
	_title: '',
	_body: '',
	
	init: function(){
		this.addComponent("2D, DOM, HTML");
		this.replace();
	},
	
	update: function(){
		var html = this._innerHtml.format( Math.max(this._width, 100), this._title, this._body );
		this.replace(html);
		return this;
	},
	setTitle: function(t){
		this._title = t;
		this.update();
		return this;
	},
	setBody: function(b){
		this._body = b;
		this.update();
		return this;
	},
	setWidth: function(w){
		this._width = w;
		this.update();
		return this;
	}
});
