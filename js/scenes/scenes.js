Crafty.scene('old', function() {
	//Crafty.viewport.scale(window.innerWidth/Jackpot.W);
	var img = "images/jackpot_1280x800-2";// + Crafty.viewport.width + "x" + Crafty.viewport.height;
	var bg = Crafty.e("2D, Canvas, Image").attr({
		w : Crafty.viewport.width,
		h : Crafty.viewport.height
	}).image(img + ".png", "no-repeat");

	Crafty.e("2D,DOM,FPS,Text").attr({maxValues:10, x:210, y: 45, w:100 }).bind("MessureFPS",function(fps){
        this.text("fps: "+fps.value); //Display Current FPS
        this.css({"text-shadow":"#222222 1px 1px 1px"});
        this.textFont({family:'tahoma', size:'14px', weight: 'bold'});
        this.textColor('#c1c1c1');
      }).bind('KeyDown', function(e){
			if(e.key == Crafty.keys['SPACE']){
				Crafty(Crafty('Ball')[0]).destroy();
			} 
		    else if(e.key == Crafty.keys['PAGE_UP']){
		     	this.v.x = 0;
		     	this.v.y = -1;
		     }
			else if(e.key == Crafty.keys['ENTER']){
				 for(i=0; i<1;i++){
					 var indice = Crafty.math.randomInt(1,30);
					 indice = Crafty.math.randomInt(1,4);
					 x = (Jackpot.W - Jackpot.left - Jackpot.right)/2 + Jackpot.left;
					 y = (Jackpot.H - Jackpot.top - Jackpot.bottom)/2 + Jackpot.top;
					 Jackpot.players.push( Crafty.e('Ball, cueBall').setPosition(x,y).setBallType('cueBall'));
						Crafty('ent').text(Crafty("Ball").length);
				}	
			};
		})
		.bind('EnterFrame', Jackpot.update);

    for(i=1; i<=20;i++){
    	ball = Crafty.e('Ball, ball'+ (i%50));
    	ball.setBallType('ball' + (i%50));
		Jackpot.players.push( ball );
	}	

    Crafty.e("2D,DOM,Text,ent").attr({x:30, y:735, w:75}).text(Crafty("Ball").length).textColor('#f1f1f1').css({'text-align':'right', 'text-shadow': '2px 2px 2px #000000'}).textFont({size:'35px', family:'impact'});
});

/*
Crafty.scene("splash", function() {
	Crafty.viewport.scale(window.innerHeight/600);
	var bg = Crafty.e("2D, DOM, Image, Mouse")
		.image("images/splash_800x500.png", "no-repeat")
	Crafty.background(bg);
	Crafty.e("2D, DOM, Button, mn_inicio")
		.attr({x: 304, y: 350})
		.bind('Click', function(){ Crafty.scene("names") }); 
	Crafty.e("2D, DOM, Button, mn_opcoes")
		.attr({x: 304, y: 390})
		.line(1)
		.bind('Click', function(){ Crafty.scene("opcoes") }); 
	Crafty.e("2D, DOM, Button, mn_ajuda")
		.attr({x: 304, y: 430})
		.line(2)
		.bind('Click', function(){ Crafty.scene("ajuda") }); 
	Crafty.e("2D, DOM, Button, mn_credito")
		.attr({x: 304, y: 470})
		.line(3)
		.bind('Click', function(){ Crafty.scene("creditos") }); 
		
	UJAPP.players = [];
	UJAPP.display = {
		players: 0,
		remaning:0,
		newBall: 5,
		cueBall: 0,
		prizes: 1
	};
});

Crafty.scene("names", function() {
	Crafty.viewport.scale(window.innerHeight/600);
	var bg = Crafty.e("2D, DOM, Image, Mouse")
		.image("images/splash_800x500.png", "no-repeat")
	Crafty.background(bg);
	Crafty.e("2D, DOM, Button, mn_proximo")
		.attr({x: 304, y: 550})
		.line(5)
		.bind('Click', function(){ 
			UJAPP.names = linesToArray(document.getElementsByTagName('TEXTAREA')[0].value); 
			UJAPP.display.players = UJAPP.names.length; 
			UJAPP.display.remaning = UJAPP.names.length; 
			Crafty.scene("jackpot") 
		}); 
	Crafty.e("HTML, Keyboard")
		.attr({x: 25, y: 310})
		.replace("<form><textarea style='background-color: 0.1; border:0; width: 400px; height: 200px; font-size:12px; background-color: none'>Adriano\nAntonio\nArbo\nCaimi\nChristiano\nCristina\nDouglas\nFlavio\nGabriel\nGaranhani\nGrazi\nGuilherme\nIgor\nLau\nLeonardo\nLucas Fogaça\nLucas Santos\nMarcia\nMatias\nNodari\nOlavo\n</textarea></form>")
	UJAPP.players = [];

});

Crafty.scene("opcoes", function() {
	Crafty.viewport.scale(window.innerHeight/600);
	var bg = Crafty.e("2D, DOM, Image, Mouse")
		.image("images/splash_800x500.png", "no-repeat")
	Crafty.background(bg);
	Crafty.e("2D, DOM, Button, mn_voltar")
		.attr({x: 25, y: 550})
		.line(4)
		.bind('Click', function(){ Crafty.scene("splash") }); 
});

Crafty.scene("ajuda", function() {
	Crafty.viewport.scale(window.innerHeight/600);
	var bg = Crafty.e("2D, DOM, Image, Mouse")
		.image("images/splash_800x500.png", "no-repeat")
	Crafty.background(bg);
	Crafty.e("2D, DOM, Button, mn_voltar")
		.attr({x: 25, y: 550})
		.line(4)
		.bind('Click', function(){ Crafty.scene("splash") }); 
	Crafty.e("2D, DOM, Text")
		.text("<p>Esta aplicação foi desenvolvida pensando em tornar mais divertido o ato de sortear uma coisa ou pessoa. " +
		      "A idéia é ir eliminando os participantes, um a um, até sobrar uma quantidade equivalente ao número de premios "+
		      "configurado no início, ou durante a rodada.</p>"+
		      "<p>Por exemplo, para adicionar mais diversão é possível definir 10 prêmios. Quando sobrarem apenas 10 " +
		      "participantes o Ultimante Jackpot irá pausar o jogo. Nesse caso, é possível diminuir a quantidade de prêmios para 1, e " +
		      "continuar a eliminar os participantes até restar apenas um ganhador.</p>"+
		      "<p>No momento, o único modo de jogo é o \"Last man standing\", ou seja, os participantes vão sendo eliminados pelas "+
		      "bolas brancas até sobrar apenas um. Uma nova bola branca é adicionada no centro da arena a cada 10s, com uma " +
		      "velocidade e direção aleatória. O jogador morre ao encostar em uma bola branca. No inicio do jogo cada " +
		      "participante é posicionado aleatóriamente na arena, com uma velocidade e direção também aleatória.</p>"
		)
		.css({"font-size":"10pt", "color": "#63200E", "font-family":"verdana", "text-shadow":"#d1d1d1 1px 1px 1px"})
		.attr({x: 50, y: 300, w:700, h: 300});
});

Crafty.scene("creditos", function() {
	Crafty.viewport.scale(window.innerHeight/600);
	var bg = Crafty.e("2D, DOM, Image, Mouse")
		.image("images/splash_800x500.png", "no-repeat")
	Crafty.background(bg);
	Crafty.e("2D, DOM, Button, mn_voltar")
		.attr({x: 25, y: 550})
		.line(4)
		.bind('Click', function(){ Crafty.scene("splash") }); 
	Crafty.e("2D, DOM, Text")
		.text("<b>Game Design, Programador e Design Gráfico</b> <br> Carlos Henrique Caimi<p><b>Biblioteca</b> " + 
			  "<br>Crafty - javaScript Game Engine <br>http://craftyjs.com")
		.css({"font-size":"10pt", "color": "#63200E", "font-family":"verdana", "text-shadow":"#d1d1d1 1px 1px 1px", "text-align":"center"})
		.attr({x: 50, y: 350, w:700, h: 300});
});


Crafty.scene("jackpot", function() {
	Crafty.viewport.scale(window.innerWidth/1280);
	var img = "images/jackpot_1280x800-2";// + Crafty.viewport.width + "x" + Crafty.viewport.height;
	var bg = Crafty.e("2D, DOM, Image").attr({
		w : Crafty.viewport.width,
		h : Crafty.viewport.height
	})
	.bind('EnterFrame', update)
	.image(img + ".png", "no-repeat");

	Crafty.e("2D, DOM, Text, dspPlayer")
		.attr({ x: 62, y: UJAPP.H-60, w: 40, h: 30 })
		.css({"font-family":"impact", "font-size":"24pt", "Color":"#fff", "text-align":"right"})
		.text(UJAPP.display.players);
	Crafty.e("2D, DOM, Text, dspRemaning")
		.attr({ x: 160, y: UJAPP.H-60, w: 40, h: 30 })
		.css({"font-family":"impact", "font-size":"24pt", "Color":"#fff", "text-align":"right"})
		.text(UJAPP.display.remaning);
	Crafty.e("2D, DOM, Text, dspNewBall")
		.attr({ x: 260, y: UJAPP.H-60, w: 40, h: 30 })
		.css({"font-family":"impact", "font-size":"24pt", "Color":"#fff", "text-align":"right"})
		.text(UJAPP.display.newBall);
	Crafty.e("2D, DOM, Text, dspCueBall")
		.attr({ x: 340, y: UJAPP.H-60, w: 40, h: 30 })
		.css({"font-family":"impact", "font-size":"24pt", "Color":"#fff", "text-align":"right"})
		.text(UJAPP.display.cueBall);
	Crafty.e("2D, DOM, Text, dspPrizes")
		.attr({ x: 420, y: UJAPP.H-60, w: 40, h: 30 })
		.css({"font-family":"impact", "font-size":"24pt", "Color":"#fff", "text-align":"right"})
		.text(UJAPP.display.prizes);

	Crafty.e("2D, DOM, bt_cueball, Button")
		.attr( { x : 640, y : UJAPP.H-90, w : 34, h : 34} )
		.bind("Click", function()
			{
				newCueBall();
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
		.line(4)
		.bind("Click", function(){
			var ent = Crafty("Player");
			for(i=0; i < ent.length; i++){
				Crafty.e("ball"+(i+1)).showLabel(); 
			}
		});
	Crafty.e("2D, DOM, bt_add, Button")
		.attr( { x : 800, y : UJAPP.H-90, w : 34, h : 34} )
		.bind("Click", function()
		{
			if(UJAPP.display.prizes < UJAPP.display.remaning)
				UJAPP.display.prizes++;
			Crafty("dspPrizes").text(UJAPP.display.prizes);
		})
		.line(5);
	Crafty.e("2D, DOM, bt_remove, Button")
		.attr( { x : 840, y : UJAPP.H-90, w : 34, h : 34} )
		.bind("Click", function()
		{
			if(UJAPP.display.prizes > 1)
				UJAPP.display.prizes--;
			Crafty("dspPrizes").text(UJAPP.display.prizes);
		})		
		.line(6);
	Crafty.e("2D, DOM, bt_menu, Button")
		.attr( { x : 880, y : UJAPP.H-90, w : 34, h : 34} )
		.bind("Click", function(){ Crafty.scene("splash");})
		.line(7);
		
	Crafty.e("2D, DOM, bt_start, Button")
		.attr( { x : 520, y : UJAPP.H-90, w : 74, h : 74} )
		.bind("Click", function(){
			if(UJAPP.PAUSE && UJAPP.display.remaning <= UJAPP.display.prizes) return; 
			pause();
		})
		.setModeOnOff(true)
		.setModeOver(false);
			    Crafty.e("2D,DOM,FPS,Text").attr({maxValues:10, x: 205, y: 45, w:150, h: 20 }).bind("MessureFPS",function(fps){
      this.text("fps: "+fps.value); //Display Current FPS
      this.css({"font-size":"14px", "font-weight":"bold", "text-shadow":"#222222 1px 1px 1px"});
      this.textColor('#a1a1a1');
    })
	
	for (var i = 0; i < UJAPP.names.length; i++){
		UJAPP.players[i] = {};
		UJAPP.players[i].ball = ( Crafty.e("Ball, Player, ball" + ((i % 30)+1)) );
		UJAPP.players[i].ball.setName( UJAPP.names[i] );
		UJAPP.players[i].name = UJAPP.names[i];
		UJAPP.players[i].color = UJAPP.colors[i%30];
		UJAPP.players[i].ball.status = UJAPP.READY;
		UJAPP.players[i].board = Crafty.e("2D, DOM, Text, BoardNames")
			.attr({x: 25, y:75+(i*16), w:200, h: 20})
			.css({"font-size":"14px", "text-shadow":"#a1a1a1 1px 1px 1px", "text-shadow":"#111 1px 1px 1px"})
			.textColor(UJAPP.colors[i%30])
			.text(function(){return UJAPP.names[i]});
	}
});*/
