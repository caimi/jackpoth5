window.onload = function() {
	Jackpot.start();
};
var options = {
		maxParticles: 30,
		size: 8,
		sizeRandom: 3,
		speed: 1,
		speedRandom: 2,
		// Lifespan in frames
		lifeSpan: 15,
		lifeSpanRandom: 5,
		// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
		angle: 0,
		angleRandom: 180,
		startColour: [118, 26, 19, 1],
		startColourRandom: [0, 0, 0, 0],
		endColour: [245, 35, 0, 0],
		endColourRandom: [60, 60, 60, 0],
		// Only applies when fastMode is off, specifies how sharp the gradients are drawn
		sharpness: 20,
		sharpnessRandom: 10,
		// Random spread from origin
		spread: 10,
		// How many frames should this last
		duration: 15,
		// Will draw squares instead of circle gradients
		fastMode: false,
		gravity: { x: 0, y: 0 },
		// sensible values are 0-3
		jitter: 1
};
var colors = ['#ff0000', '#ff00ff', '#0000ff', '#00FFFF', '#00ff00', '#c0ff00', '#ffff00', '#fe8001','#662d91','#8b2300'];
/*var colors = [ [255, 0, 0, 1], [255, 0, 255, 1], [0, 0, 255, 1], [0, 255, 255, 1], [0, 255, 0, 1], 
               [196, 255, 0, 1], [255, 255, 0, 1], [255, 128, 0, 1], [145, 0, 255, 1], [142, 51, 21, 1]];*/
var Jackpot = {
	W: 1280,
	H: 800,
	left: 288,
	top: 22,
	right: 27,
	bottom: 52,
	border: {left:0, right:0, top:0, bottom:0},
	board : {},
	options: {music: 0, volume: 0.5, label: true, labelFont: {size:'12px', color:'#333333', weight:true, id:0}, mode: 1, vmax: 1, life: 1, prizes:1 },
	url: '',
	ballRadius: 10,
	vmax: 1,
	seed: Date.now(),
	lastFrameTime: Date.now(),
	timeElapsed: 0,
	players: [],
	people:[],
	names: [],
	dspBall:[],
	dspText:[],
	dspDead:[],
	mode: 1,
	cicle: 0,
	prizes: 1,
	life: 1,
	pause: true,
	finish: false,
	playing: false,
	replay: false,
	dominio: 'file:///D:/GoogleDrive/2-Meus%20projetos/Desenv/UJCH5/index.html',
	tagFontSize: ['pequeno', 'médio', 'grande'],
	tagVelocity: ['lento', 'normal', 'rápido'],
	//dominio: 'http://www.caimi.com.br/uj/index.html',

	start: function(){
		Jackpot.W = window.innerWidth;
		Jackpot.H = window.innerHeight;
		
		Crafty.init(Jackpot.W, Jackpot.H);
		Crafty.canvas.init(Jackpot.W, Jackpot.H);
//		Crafty.viewport.init();
		Jackpot.border.left = Jackpot.left + Jackpot.ballRadius;
		Jackpot.border.right = Jackpot.W - Jackpot.right - Jackpot.ballRadius;
		Jackpot.border.top = Jackpot.top + Jackpot.ballRadius;
		Jackpot.border.bottom = Jackpot.H - Jackpot.bottom - Jackpot.ballRadius;
		
		Jackpot.url = document.location.href;
		Jackpot.timeLastFrame = Date.now();
		km.seed(Jackpot.seed);
		var options = km.store.get('options');
		if(km.util.isSet(options))
			Jackpot.options = options;
		Crafty.scene("loading");
	},
	
	createResponsiveArena: function(){
		Crafty.e("2D, Canvas, Image").attr({ x:0, y:0, w:275, h:60}).image("images/arena-tl.png", "no-repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:0, y:60, w:275, h:Jackpot.H-290}).image("images/arena-ml.png", "repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:0, y:Jackpot.H-290, w:275, h:290}).image("images/arena-bl.png", "repeat");
		
		Crafty.e("2D, Canvas, Image").attr({ x:275, y:0, w:48, h:50}).image("images/arena_01.png", "repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:275, y:50, w:48, h:Jackpot.H-100}).image("images/arena_06.png", "repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:275, y:Jackpot.H-52, w:48, h:52}).image("images/arena_11.png", "repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:275+48, y:0, w:Jackpot.W-74-275, h:50}).image("images/arena_02.png", "repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:275+48, y:50, w:Jackpot.W-74-275, h:Jackpot.H-102}).image("images/arena_07.png", "repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:275+48, y:Jackpot.H-52, w:Jackpot.W-74-275, h:52}).image("images/arena_12.png", "repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:Jackpot.W-42, y:0, w:42, h:50}).image("images/arena_04.png", "repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:Jackpot.W-42, y:50, w:42, h:Jackpot.H-102}).image("images/arena_08.png", "repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:Jackpot.W-42, y:Jackpot.H-52, w:42, h:52}).image("images/arena_13.png", "repeat");
	},
	
	createResponsiveBoard: function(){
		var box = {
			x: Math.max( (Jackpot.W - Math.max(Jackpot.W - 100,700))/2, 50),
			y: Math.max( (Jackpot.H - Math.max(Jackpot.H - 100, 500))/2, 50),
			w: Math.max(Jackpot.W - 50, 700), 
			h: Math.max(Jackpot.H-50, 530)
		};
		Jackpot.board = box;
		Crafty.e("2D, Canvas, Image").attr({ x:225+box.x, y:0+box.y, w:box.w - box.x-250, h:box.h-120}).image("images/board-tc.png", "repeat-x");
		Crafty.e("2D, Canvas, Image").attr({ x:box.x, y:box.y+95, w:box.w, h:box.h-box.x-120}).image("images/board-ml.png", "repeat-y");
		Crafty.e("2D, Canvas, Image").attr({ x:box.x+225, y:box.y+95, w:box.w-box.x-250, h:box.h-box.y-120}).image("images/board-mc.png", "repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:box.w-25, y:box.y+95, w:25, h:box.h-box.y-120}).image("images/board-mr.png", "repeat-y");
		Crafty.e("2D, Canvas, Image").attr({ x:box.x+225, y:box.h-25, w:box.w-box.x-250, h:25}).image("images/board-bc.png", "repeat-x");


		Crafty.e("2D, Canvas, Image").attr({ x:box.x, y:box.y, w:225, h:95}).image("images/board-tl.png", "no-repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:box.w-25, y:box.y, w:25, h:95}).image("images/board-tr.png", "no-repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:box.x, y:box.h-25, w:225, h:25}).image("images/board-bl.png", "no-repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:box.w-25, y:box.h-25, w:225, h:25}).image("images/board-br.png", "no-repeat");
		
		Crafty.e("2D, Canvas, Image").attr({ x:box.x+2, y:box.y+140, w:box.w-100, h:2}).image("images/separation.png", "repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:box.x+2, y:box.h+box.y-150, w:box.w-55, h:2}).image("images/separation.png", "repeat");
		Crafty.e("2D, Canvas, Image").attr({ x:box.w-54, y:box.h-100, w:box.h-310, h:2, rotation: -90}).image("images/separation.png", "repeat");
 	},
	
	/**@
	 * #.update
	 *
	 * update game in each frame. Moving balls, colliding, removing balls, etc... 
	 *
	 * @public
	 * @sign public {void} update();
	 * @param none
	 * @returns none
	 */
	update: function(){
		if(Jackpot.pause) return;
		if(Jackpot.finish) return;
		
		Jackpot.cicle++;
		
		if(Jackpot.cicle % 250 == 0){
			Jackpot.newCueBall();
		}
		
		for(var i=0; i<Jackpot.players.length; i++){
			Jackpot.moveBall(Jackpot.players[i]);
		}
		
		for(var i=0; i<Jackpot.players.length; i++){
			for(var j=i; j<Jackpot.players.length; j++){
				b1 = Jackpot.players[i];
				b2 = Jackpot.players[j];
				
				if( Jackpot.isCollided(b1, b2) ) {
					Jackpot.collisionEffect(b1, b2);
					Jackpot.playMode(b1, b2);
					break;
				}
			}
		}
		
		Crafty("cicle").text(Jackpot.cicle);
	},

	newPlayer: function(name, i){
		ball = Crafty.e('Ball, ball'+ (i%90));
		ball.setBallType('ball' + (i%90));
		ball.attr({name: name});
		Jackpot.players.push( ball );
	},
	
	createPlayer: function(name, i){
		var person = new Player();
		person.setName(name);

		dspText = Crafty.e("2D, DOM, Text").attr({x:75, y: 5, w:100, visible: false})
			.text(person.name)
			.textFont({family: 'tahoma', size: '12px', weight: 'bold'})
			.textColor("#f1f1f1");
		person.addDisplayer(dspText);
	
		for(var life = 0; life < Jackpot.life; life++){
			var ball = Crafty.e('Ball, ball'+ (i%50));
			ball.setBallType('ball' + (i%50));
			ball.attach( 
				Crafty.e("2D, DOM, Text, Tween").text(person.name).attr({x: ball.p.x-100, y: ball.p.y+15, w: 200, visible: Jackpot.options.label})
				.textColor(Jackpot.options.labelFont.color)
				.textFont({family: 'tahoma', size: Jackpot.options.labelFont.size, weight: Jackpot.options.labelFont.weight?'bold':'normal'})
				.css({'text-align': 'center', 'text-shadow': '1px 1px 1px #ffffff'})
			);
			person.addBall(ball);
			var size = life > 0 ? 5 : Jackpot.ballRadius*2+2;
			dspBall = Crafty.e("2D, Canvas, " + ball._ballType).attr({x:30, y: 30, w:size, h:Jackpot.ballRadius*2+2, visible: false});
			person.addDisplayer(dspBall);
			Jackpot.players.push( ball );
		}
		
		Jackpot.people.push( person );
	},
	
	newCueBall: function(){
		x = (Jackpot.W - Jackpot.left - Jackpot.right)/2 + Jackpot.left;
		y = (Jackpot.H - Jackpot.top - Jackpot.bottom)/2 + Jackpot.top;
		var ballType = Jackpot.mode == 1 ? 'cueBall':'zumbiBall1'; 
		Jackpot.players.push( Crafty.e('Ball, ' + ballType).setPosition(x,y).setBallType('cueBall'));
		Crafty.audio.play('go',1, Jackpot.options.volume);
	},
	
	playersInGame: function(){
		var count = 0;
		for(var i=0; i<Jackpot.people.length; i++){
			if(Jackpot.people[i].lifes()>0){
				count++;
			}
		}
		return count;
	},
	
	playMode: function(b1, b2){
		if(Jackpot.mode == 1){
			this.copsAndRobbersMode(b1, b2);
		} else{
			this.zumbiMode(b1, b2);
		}
	},
	
	/**@
	 * #.moveBall
	 *
	 * calculate new position of the ball, adding velocity in atual position  
	 *
	 * @public
	 * @sign public {void} moveBall();
	 * @param none
	 * @returns none
	 */
	moveBall: function(ball){
		if(ball.p.x < Jackpot.border.left){		
			ball.v.x = -ball.v.x;
			ball.p.x = Jackpot.border.left;
		}
		if(ball.p.x > (Jackpot.border.right)){
			ball.v.x = -ball.v.x;
			ball.p.x = (Jackpot.border.right);	
		}
		if(ball.p.y < Jackpot.border.top){
			ball.v.y = -ball.v.y;
			ball.p.y = Jackpot.border.top;		
		}
		if(ball.p.y > Jackpot.border.bottom){
			ball.v.y = -ball.v.y;
			ball.p.y = Jackpot.border.bottom;
		}
			
		ball.p = ball.p.add(ball.v);
		ball.x = ball.p.x - ball.r;
		ball.y = ball.p.y - ball.r;

	},//moveBall
	
	/**@
	 * #.isCollided
	 *
	 * verify circle collision. 
	 *
	 * @public
	 * @sign public boolean isCollided(ball, otherBall);
	 * @param ball Crafty.c("Ball")
	 * @returns true = collided
	 */
	isCollided: function isCollided(b1, b2){
		if(b1 == b2) return false;

		if(b1.p.distanceSq(b2.p) < (b1.r+b2.r)*(b1.r+b2.r)){
			return true;
		}
		return false;
	},
	
	/**@
	 * #.collisionEffect
	 *
	 * Reposition balls and calculate velocity after collision. 
	 *
	 * @public
	 * @sign public {void} collisionEffect(ball, otherBall);
	 * @param ball Crafty.c("Ball")
	 * @returns none
	 */
	collisionEffect: function(b1, b2){
		normal = new Crafty.math.Vector2D(b2.p.x - b1.p.x, b2.p.y - b1.p.y);
		normal.normalize();
		//2 corpos nao ocupam o mesmo lugar no espaco.
		b2.p.x = b1.p.x + Jackpot.scaleVector(normal, (b1.r+b2.r) ).x;
		b2.p.y = b1.p.y + Jackpot.scaleVector(normal, (b1.r+b2.r) ).y;

		//conservacao de energia
		f1 = b1.v.dotProduct(normal);
		f2 = b2.v.dotProduct(normal);
		
		//velo = new Crafty.math.Vector2D(b1.v);
		b1.v.subtract( Jackpot.scaleVector(normal, (f1-f2)));
		b2.v.add( Jackpot.scaleVector(normal, (f1-f2)));
	},
	
	/**@
	 * #.scaleVector
	 *
	 * multiply vector by factor. 
	 *
	 * @public
	 * @sign public {Craft.math.Vector2D} scaleVector(vector, number);
	 * @param vector Crafty.math.Vector2D
	 *        number number for scale vector.
	 * @returns Craft.math.Vector2D
	 */
	scaleVector: function scaleVector(v1, k){
		return new Crafty.math.Vector2D(v1.x*k, v1.y*k);
	},

	/**@
	 * #.copsAndRobbersMode
	 *
	 * Game mode. Balls die when touching by cueBall  
	 *
	 * @public
	 * @sign public {void} copsAndRobbersMode(i, j);
	 * @param i array index of ball 
	 *        j array index of other ball.
	 * @returns none
	 */
	copsAndRobbersMode: function(b1, b2){
		if(b1._ballType == 'cueBall' || b2._ballType == 'cueBall'){
			if(b1._ballType != 'cueBall'){
				Jackpot.remove(b1);
			}
			if(b2._ballType != 'cueBall'){
				Jackpot.remove(b2);
			}
		}
	},
	
	/**@
	 * #.zumbiMode
	 *
	 * Game mode. If the cueBall is touching by player's ball, then the player's ball will be transform in a cueBall too.  
	 *
	 * @public
	 * @sign public {void} zumbiMode(b1, b2);
	 * @param b1 Crafty.c("Ball")
	 *        b2 Crafty.c("Ball")
	 * @returns none
	 */
	zumbiMode: function(b1,b2){
		if(b1._ballType == 'cueBall' || b2._ballType == 'cueBall'){
			if(b1._ballType != 'cueBall'){
				b1.sprite(km.randomInt(2,5),0);
				b1.v.x = 0;
				b1.v.y = 0;
			} 
			if(b2._ballType != 'cueBall'){
				b2.sprite(km.randomInt(2,5),0);
				b2.v.x = 0;
				b2.v.y = 0;
			}
			b1.setBallType('cueBall');
			b2.setBallType('cueBall');
			Jackpot.updateDisplay();
		}
	},
	updateDisplay: function(){
		var col = 25,
		    row = 40;
		
		for(var i=0; i<Jackpot.people.length; i++) {
			p = Jackpot.people[i];
			if( p.lifes() > 0 ) {
				if( row + 40 < (Jackpot.H - 275) ){
					row += 22;
				} else{
					if(col >= 80) break;
					col += 100;
					row = 62; 
				}
				var spacer = 0;
				for(var j=1; j <p._display.length; j++){
					if( p.lifes() >=j && col < 180){
						p._display[j].attr({x:col+spacer, y: row, visible: true});
						spacer += p._display[j].w + 3;
					}else{
						p._display[j].attr({visible: false});
					}
				}

				spacer += 2;
				p._display[0].attr({x:col+spacer, y: row+3, visible: true});
			}else{
				for(var j=0; j <p._display.length; j++){
					p._display[j].attr({visible: false});
				}
			}
		}
		Crafty('txtRemaining').text(Jackpot.playersInGame());

		if(Jackpot.playersInGame() <= Jackpot.prizes){
			Jackpot.pause = true;
			Jackpot.finish = true;
			Crafty.trigger("FinishGame");
		}
	
		var dspDeadPeople='';
		var max = Math.max(0,Jackpot.dspDead.length-(parseInt((Jackpot.W - 300) / 80)));
		for(var i=max; i<Jackpot.dspDead.length; i++){
			dspDeadPeople += Jackpot.dspDead[i] + " < ";
		}
		Crafty("dspDead").text(dspDeadPeople);
	},
		
	remove: function(ball){
		Jackpot.players.splice(Jackpot.players.indexOf(ball),1);
		person = Jackpot.findPerson(ball);
		
		Crafty.e("2D, DOM, Text, Tween").text(person.name).attr({x: ball.p.x-25, y:ball.p.y+15, w: 180})
			.textFont({family:'tahoma', size:'14px', weight: 'bold'})
			.textColor('#000000')
			.css({ 'text-shadow': '2px 2px 2px #ffffff'})
			.tween({alpha: 0.0}, 2500)
			.bind('TweenEnd', function(){ this.destroy(); } );

		Crafty.e("Explosion, explode")
			.attr({x: ball.p.x - ball.r, y:ball.p.y - ball.r})
			.animate('explode' + km.randomInt(1,10), 1);
		
		person.die(ball);
		if(person.lifes()==0){
			while(person._display.length>0){
				var d = person._display.pop();
				d.destroy();
			}
			Jackpot.people.splice(Jackpot.people.indexOf(person), 1);
		}
		
		Crafty.audio.play('ploc', 1, Jackpot.options.volume);
		Jackpot.dspDead.push(person.name);
		Jackpot.updateDisplay();
	},
	
	findPerson: function(ball){
		for(var p=0; p < Jackpot.people.length; p++){
			var person = Jackpot.people[p];
			if(person._balls.indexOf(ball) > -1){
				return person;
			}
		}
		return null;
	},
	
	createMenu: function(name){
		Crafty.e("Button, bt_menu_big")
		.attr({x: Jackpot.board.y+Jackpot.board.w-105, y:Jackpot.board.y+140})
		.setType('bt_menu_big')
		.bind('Click', function(){
			Crafty.scene("splash");
		});
		Crafty.e("Button, bt_people")
			.attr({x: Jackpot.board.y+Jackpot.board.w-105, y:Jackpot.board.y+200})
			.setType('bt_people')
			.bind('Click', function(){
				Crafty.scene("names");
			});
		Crafty.e("Button, bt_gear")
			.attr({x: Jackpot.board.y+Jackpot.board.w-105, y:Jackpot.board.y+260})
			.setType('bt_gear')
			.bind('Click', function(){
				Crafty.scene("conf");
			});
		Crafty.e("Button, bt_help")
			.attr({x: Jackpot.board.y+Jackpot.board.w-105, y:Jackpot.board.y+320})
			.setType('bt_help')
			.bind('Click', function(){
				Crafty.scene("help");
			});
		Crafty.e("Button, bt_credits")
			.attr({x: Jackpot.board.y+Jackpot.board.w-105, y:Jackpot.board.y+380})
			.setType('bt_credits')
			.bind('Click', function(){
				Crafty.scene("credits");
			});
		
		var entMenu = {};
		var helpText='';
		if(name == 'names'){
			entMenu = Crafty("bt_people");
			entMenu.toggleComponent("bt_people_over, bt_people");
			helpText = "Selecione um arquivo com os nomes dos participantes, ou separe os nomes com vírgula no campo abaixo.";
		}
		if(name == 'conf'){
			entMenu =Crafty("bt_gear");
			entMenu.toggleComponent("bt_gear_over, bt_gear");
			helpText = "Configure as opções abaixo conforme desejar.";
		}
		if(name == 'help'){
			entMenu = Crafty("bt_help");
			entMenu.toggleComponent("bt_help_over, bt_help");
			helpText = "Uma rápida explicação de como funciona o sorteio.";
		}
		if(name == 'credits'){
			entMenu = Crafty("bt_credits");
			entMenu.toggleComponent("bt_credits_over, bt_credits");
			helpText = "Quem faz o Ultimate Jackpot";
		}
		entMenu.unbind("Click");
		entMenu.unbind("MouseOver");
		entMenu.unbind("MouseOut");
		
		Crafty.e("2D, Text, DOM, title")
			.attr({x:  Jackpot.board.x + 10, y: Jackpot.board.y +70, w: Jackpot.board.w-Jackpot.board.y, h: 25})
			.text(helpText)
			.textFont({family: 'arial', size:'13px'})
			.textColor("#e1e1e1");
	},
	
	initializeReplay: function(){
		Jackpot.replay = true;
		var url = Jackpot.url;
		var opcoes = url.split('?')[1];
		var urlSemHash = opcoes.match('(.*)(k.*)')[1];
		var shaObj = new jsSHA(urlSemHash, "TEXT");
		var hash = shaObj.getHash("SHA-1", "HEX");
		
		var urlHash = opcoes.match('k([A-za-z0-9]*)(&)')[1];
		
		if(hash != urlHash){
			throw('O replay não pode ser gerado, pois a url digitada não corresponde a um sorteio válido.');
			return false;
		}
		
		try{
			Jackpot.W = opcoes.match('w([0-9]*)(&)')[1];			
			Jackpot.H = opcoes.match('h([0-9]*)(&)')[1];
			Jackpot.prizes = opcoes.match('p([0-9]*)(&)')[1];
			Jackpot.vmax = opcoes.match('v([0-9.,]*)(&)')[1];
			Jackpot.life = opcoes.match('l([0-9]*)(&)')[1];
			Jackpot.mode = opcoes.match('m([0-9]*)(&)')[1];		
			Jackpot.seed = opcoes.match('s([A-za-z0-9]*)(&)')[1];
			Jackpot.seed = Jackpot.seed.replace('&', '');
			var n = opcoes.match('&n([a-zA-Z0-9].*)(&.+)')[1];
			n = unescape(n);
			n = n.replace('&','');
			var names = n.split(',');
			Jackpot.names = names;
		}catch(err){
			alert("URL não está correta. Verifique o problema e tente novamente.");
		}
		Jackpot.border.left = Jackpot.left + Jackpot.ballRadius;
		Jackpot.border.right = Jackpot.W - Jackpot.right - Jackpot.ballRadius;
		Jackpot.border.top = Jackpot.top + Jackpot.ballRadius;
		Jackpot.border.bottom = Jackpot.H - Jackpot.bottom - Jackpot.ballRadius;
		
		return true;
	},
	
	generateReplayUrl: function(){
		var url = '';
		url += 'w' + Jackpot.W + '&';
		url += 'h' + Jackpot.H + '&';
		url += 'p' + Jackpot.prizes + '&';
		url += 'v' + Jackpot.vmax + '&';
		url += 'l' + Jackpot.life + '&';
		url += 'm' + Jackpot.mode + '&';
		url += 's' + Jackpot.seed + '&';
		url += 'n' + escape(Jackpot.names) + '&';
		var shaObj = new jsSHA(url, "TEXT");
		var hash = shaObj.getHash("SHA-1", "HEX");
		url += 'k' + hash + '&';
		
		return url;
	},
	
	initialPosition: function(){
		km.seed(Jackpot.seed.toString());
		Jackpot.cicle = 0;
    	if( Crafty('Ball').length > 0 ) {
    		 for(var i=0; i<Jackpot.players.length; i++){
    			 Jackpot.players[i].destroy();
    		 }
    	}
    	for(var i=0; i<Jackpot.people.length; i++){
    		var balls = Jackpot.people[i]._balls;
    		while(balls.length > 0){
    			ball = balls.pop();
    			ball.destroy();
    		}
    		while(Jackpot.people[i]._display.length > 0){
    			display = Jackpot.people[i]._display.pop();
    			display.destroy();
    		}
    		Jackpot.people[i] = null;
    	}
    	Jackpot.people = [];
    	Jackpot.names.sort(function(a,b){return b.toUpperCase()>a.toUpperCase()?-1:1;});
		Jackpot.players = [];
		
		for(i=0; i<Jackpot.names.length;i++){
    		Jackpot.createPlayer(Jackpot.names[i], i);
		}
		Jackpot.prizes = Math.min(Jackpot.people.length - 1, Jackpot.prizes);
		Crafty("txtPrizes").text(Jackpot.prizes);

	    var touching = true;
	    var cicles = 0;
	    
	    while(touching && cicles < 10 ){
	    	touching = false;
		    for(var i=0; i<Jackpot.players.length; i++){
				for(var j=i; j<Jackpot.players.length; j++){
					if( Jackpot.isCollided( Jackpot.players[i], Jackpot.players[j]) ) {
						ball = Jackpot.players[i];
						ball.p.x = km.randomInt(Jackpot.left + ball.r, Jackpot.W - Jackpot.right - ball.r);
						ball.p.y = km.randomInt(Jackpot.top + ball.r, Jackpot.H - Jackpot.bottom - ball.r);
						ball.x = ball.p.x - ball.r;
						ball.y = ball.p.y - ball.r;
						touching = true;
					}
				}
		    }
		    cicles++;
	    }
	    Jackpot.updateDisplay();
	},
	
	createHudArena: function(){
		Jackpot.pause = true;
		Jackpot.playing = false;
		Jackpot.finish = false;
		
		Crafty.e("2D,DOM,FPS,Text")
		.attr({maxValues:10, x:50, y: 35, w:250 })
		.bind("MessureFPS",function(fps){
	        this.text("fps: "+fps.value);
	        this.textColor('#c1c1c1');
		});
		Crafty.e("2D, DOM, Text, cicle").attr({ x:50, y: 23, w:100 })
			.text('c: '+Jackpot.cicle)
			.textColor("#c1c1c1")
			.bind('EnterFrame', Jackpot.update);

		Crafty.e("2D, Text, HTML, dspDead")
			.attr({x: 300, y: Jackpot.H-45, w: Jackpot.W - 330 })
			.text('')
			.textFont({size: '12px', family:'tahoma', weight: 'bold'})
			.css({'text-align':'left'})
			.textColor("#d1d1d1");		
		
		Crafty.e('2D, Text, DOM, txtRemaining')
			.attr({x: 14, y: Jackpot.H - 240, w: 85})
			.text(Jackpot.people.length)
			.textFont({family: 'impact', size: '40px', weight:'bold'})
			.textColor('#ffffff')
			.css({'text-align':'right'});
			
		Crafty.e('2D, Text, DOM, txtPrizes')
			.attr({x: 114, y: Jackpot.H - 240, w: 65})
			.text(Jackpot.prizes)
			.textFont({family: 'impact', size: '40px', weight:'bold'})
			.textColor('#ffffff')
			.css({'text-align':'right'});
		
		Crafty.e('2D, Text, DOM, txtLifes')
			.attr({x: 204, y: Jackpot.H - 240, w: 40})
			.text(Jackpot.life)
			.textFont({family: 'impact', size: '40px', weight:'bold'})
			.textColor('#ffffff')
			.css({'text-align':'right'});
					
		//PLAY
		Crafty.e("Button, bt_play")
			.attr({x: 109, y:Jackpot.H-129, w: 64, h: 64})
			.bind("Click", function(){
		    	Jackpot.pause = !Jackpot.pause;
		    	Jackpot.playing = !Jackpot.playing;
		    	this.toggleComponent('bt_play','bt_pause');
			});
		//TAG
		Crafty.e("Button, bt_tag")
			.attr( { x : 70, y : Jackpot.H-105, w : 22, h : 22} )
			.setType('bt_tag')
		    .bind('Click', function(){
		    	Jackpot.options.label = !Jackpot.options.label;
		    	if(Jackpot.options.label){
		    		Crafty('Ball').each(function(i){
		    			if(this._ballType != 'cueBall'){
		    				this._children[0].attr({visible: true});
		    			}
		    		});
		    	} else {    	
		    		Crafty('Ball').each(function(i){
		    			this._children[0].attr({visible: false});
		    		});
		    	}
		    });
		Crafty.e("Button, bt_menu")
			.attr( { x : 220, y : Jackpot.H-70, w : 64, h : 64} )
			.setType('bt_menu')
			.bind('Click', function(){
				window.location = window.location.href.split('?')[0]; 
				Crafty.scene("splash");
			});
		Crafty.e("2D, DOM, Text")
		.attr({x: 225, y: Jackpot.H-35, w: 50})
		.text("menu")
		.textFont({family: 'tahoma', size: '12px'})
		.textColor("#a1a1a1")
		.css({'text-shadow':'1px 1px 0px #ffffff'});
		
		//RANDOM
		if(!Jackpot.replay){
			Crafty.e("Button, bt_random")
				.attr( { x : 188, y : Jackpot.H-105, w : 22, h : 22} )
				.setType('bt_random')
				//.areaMap(polygon)
			    .bind('Click', function(){
					Jackpot.pause = true;
					Jackpot.playing = false;
					Jackpot.finish = false;
			    	Jackpot.seed = Date.now();
			    	Jackpot.initialPosition();
			    	Crafty("Draggable").visible = false;
			    });
		}else{
			Crafty.e("2D, Canvas, bt_random_disable").attr( { x : 188, y : Jackpot.H-105, w : 22, h : 22} );
		}
		
		//premios
		if(!Jackpot.replay){
			Crafty.e("Button, bt_up")
				.attr( { x : 130, y : Jackpot.H-165, w : 22, h : 22} )
				.setType('bt_up')
			    .bind('Click', function(){
			    	if(Jackpot.playing) return;
			    	Jackpot.prizes +=1;
			    	Jackpot.prizes = Math.min(Jackpot.prizes, Jackpot.playersInGame()-1);		
			    	Crafty("txtPrizes").text(Jackpot.prizes);
			    });
			
			Crafty.e("Button, bt_down")
			.attr( { x : 130, y : Jackpot.H-50, w : 22, h : 22} )
			.setType('bt_down')
			.bind('Click', function(){
				if(Jackpot.playing) return;
				Jackpot.prizes -=1;
				Jackpot.prizes = Math.max(1, Jackpot.prizes);		
				Crafty("txtPrizes").text(Jackpot.prizes);
			});
			
			Crafty.e("Button, bt_seed")
			.attr( { x : 20, y : Jackpot.H-165, w : 64, h : 64} )
			.setType('bt_seed')
			.bind('Click', function(){
				resp = prompt("Digite a chave geradora para o sorteio:");
				if( km.util.isSet(resp)){
					Jackpot.seed = resp;
					Jackpot.initialPosition();
				}
			});
			Crafty.e("2D, DOM, Text")
			.attr({x: 15, y: Jackpot.H-125, w: 50})
			.text("chave")
			.textFont({family: 'tahoma', size: '12px'})
			.textColor("#a1a1a1")
			.css({'text-shadow':'1px 1px 0px #ffffff', 'text-align': 'center'});
			
			Crafty.e("Button, bt_plus")
				.attr( { x : 20, y : Jackpot.H-95, w : 30, h : 30} )
				.setType('bt_plus')
				.bind('Click', function(){
					Jackpot.pause = true;
					Jackpot.playing = false;
					Jackpot.finish = false;
					Jackpot.life++;
					Jackpot.seed = Date.now();
					Jackpot.initialPosition();
					Crafty("txtLifes").text(Jackpot.life);
				});
			
			Crafty.e("Button, bt_minus")
				.attr( { x : 20, y : Jackpot.H-65, w : 30, h : 30} )
				.setType('bt_minus')
				.bind('Click', function(){
					Jackpot.pause = true;
					Jackpot.playing = false;
					Jackpot.finish = false;
					Jackpot.life--;
					Jackpot.life = Math.max(1,Jackpot.life);
					Jackpot.seed = Date.now();
					Jackpot.initialPosition();
					Crafty("txtLifes").text(Jackpot.life);
				});
			
			Crafty.e("Checkbox, bt_cops")
				.attr( { x : 220, y : Jackpot.H-165, w : 64, h : 64} )
				.setToggleSprite('bt_cops', 'bt_zombi')
				.setValue(true)
				.bind('Click', function(){
					Jackpot.mode = this._value?1:2;
				});
			Crafty.e("2D, DOM, Text")
			.attr({x: 190, y: Jackpot.H-125, w: 100})
			.text("modo")
			.textFont({family: 'tahoma', size: '12px'})
			.textColor("#a1a1a1")
			.css({'text-shadow':'1px 1px 0px #ffffff', 'text-align': 'center'});
			
			Crafty.e("2D, DOM, Text")
				.attr({x: 27, y: Jackpot.H-35})
				.text("life")
				.textFont({family: 'tahoma', size: '12px'})
				.textColor("#a1a1a1")
				.css({'text-shadow':'1px 1px 0px #ffffff'});
				
		}else{
			Crafty.e("2D, Canvas, bt_up_disable").attr( { x : 130, y : Jackpot.H-165, w : 22, h : 22} );
			Crafty.e("2D, Canvas, bt_down_disable").attr( { x : 130, y : Jackpot.H-50, w : 22, h : 22} );
		}
	}

	
};//end jackpot

/**
 * Player 
 * */
function Player(){
	this._balls = [];
	this._display = [];
};
Player.prototype = {
	
	setName: function(n){ 
		this.name = n; 
	},
	addBall: function(b){ 
		this._balls.push(b); 
		return this._balls.length; 
	},
	addDisplayer: function(d){ 
		this._display.push(d); 
		return this._display.length; 
	},
	lifes: function(){ 
		if(Jackpot.mode == 1) return this._balls.length;

		var lifes = 0;
		for(var d=0; d<this._balls.length; d++){
			if(this._balls[d]._ballType != "cueBall")
				lifes++;
		}
		return lifes;
	},
	die: function(ball){ 
		var index = this._balls.indexOf(ball); 
		if(index < 0) return; 
		this._balls[index].destroy(); 
		this._balls.splice(index, 1);
	},
};

/*Player.prototype.setName = function(n){ this.name = n; };
Player.prototype.addBall = function(b){ this._balls.push(b); return this._balls.length; };
Player.prototype.addDisplayer = function(d){ this._display.push(d); return this._display.length; };
Player.prototype.lifes = function(){ 
	if(Jackpot.mode == 1) return this._balls.length;

	var lifes = 0;
	for(var d=0; d<this._balls.length; d++){
		if(this._balls[d]._ballType != "cueBall")
			lifes++;
	}
	return lifes;
};
Player.prototype.die = function(ball){ var index = this._balls.indexOf(ball); if(index < 0) return; this._balls[index].destroy(); this._balls.splice(index, 1);};
*/
function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
	Jackpot.names = [];	
    var f = evt.target.files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	      var contents = e.target.result;
	      var texto = contents.split("\n");
	      Jackpot.names = texto;
	      Jackpot.names.sort();
	      loadNamesToField();
      };
      r.readAsText(f);
    }
    
    document.getElementById('cr-stage').focus();
}

function loadNamesToField(){
	var names = '';
	for(var i=0; i<Jackpot.names.length; i++){
		names += Jackpot.names[i].trim() + ', ';
	}
	document.getElementById('nameOfPlayers').value = names;
}
