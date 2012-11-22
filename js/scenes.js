Crafty.scene("loading", function() {

	Crafty.load(["images/jackpot_1280x800.png", "images/jackpot_1280x1024.png", "images/splash_800x500.png", "images/ball3.png", 
				 "images/explosions2.png", "images/start.png", "images/buttons.png"], function() {
		setTimeout(function() {
			Crafty.scene("splash");
		}, 100);
	});

	Crafty.audio.add("hit", "sounds/hit.wav");
	Crafty.audio.add("ploc", "sounds/kill2.wav");
	Crafty.audio.add("go", "sounds/go.wav");
		
	Crafty.sprite(192, 40, "images/menu.png", {
		mn_inicio:    [0,0],
		mn_inicio_on: [1,0],
		mn_opcoes:    [0,1],
		mn_opcoes_on: [1,1],
		mn_ajuda:     [0,2],
		mn_ajuda_on:  [1,2],
		mn_credito:   [0,3],
		mn_credito_on:[1,3],
		mn_voltar:    [0,4],
		mn_voltar_on: [1,4]
	});
	
	Crafty.sprite(74, 74, "images/start.png", {
		bt_start:  [0,0],
		bt_start_over:  [1,0],
		bt_start_clicked:  [2,1],
		bt_start_on:  [3,1]
	});
	
	Crafty.sprite(34, 34, "images/buttons.png", {
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
	
	Crafty.sprite(26, 26, "images/ball3.png", {
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
		
		cueBall: [5,0],
		ball: [5,5]
	});
});


Crafty.scene("splash", function() {
	Crafty.viewport.scale(window.innerHeight/600);
	var bg = Crafty.e("2D, DOM, Image, Mouse")
		.image("images/splash_800x500.png", "no-repeat")
	Crafty.background(bg);
	Crafty.e("2D, DOM, Button, mn_inicio")
		.attr({x: 304, y: 350})
		.bind('Click', function(){ Crafty.scene("jackpot") }); 
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
	var img = "images/jackpot_1280x800";// + Crafty.viewport.width + "x" + Crafty.viewport.height;
	var bg = Crafty.e("2D, DOM, Image").attr({
		w : Crafty.viewport.width,
		h : Crafty.viewport.height
	}).image(img + ".png", "no-repeat");

	Crafty.e("2D, DOM, Text, cueBallTotal")
		.attr({ x: 340, y: UJAPP.H-60, w: 40, h: 30 })
		.css({"font-family":"impact", "font-size":"24pt", "Color":"#fff", "text-align":"right"})

	Crafty.e("2D, DOM, bt_cueball, Button")
		.attr( { x : 640, y : UJAPP.H-90, w : 34, h : 34} )
		.bind("Click", function()
			{
				var e = Crafty.e("Ball, cueBall").attr({ x:700, y:400});
				e.p.x = 700;
				e.p.y = 400;
				e.type = UJAPP.KILLER;
				UJAPP.players.push(e);
				Crafty("cueBallTotal").text(Crafty("cueBall").length);
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
	
	Crafty("cueBallTotal").text(Crafty("cueBall").length);
});