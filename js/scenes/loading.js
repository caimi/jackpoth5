Crafty.scene("loading", function() {
	Crafty.e("2D, DOM, Text, loading")
		.attr({x: window.innerWidth/2-100, y: window.innerHeight/2, w:200})
		.textFont({family: 'impact', size: '30px'})
		.textColor("#ffcc33")
		.css({'text-align':'center'});
	Crafty.e("ProgressBar")
		.attr({x: window.innerWidth/2-200, y: window.innerHeight/2+40})
		.setValue(0);
		
	Crafty.load(["images/bg_splash_800x600.png", "images/ball22x22.png", "images/buttons2.png",
				 "images/explosions2.png", "images/start.png", "images/buttons.png", "images/menu.png", "images/logo_uj.png",
				 "images/lobby_01.png", "images/lobby_02.png", "images/lobby_03.png", "images/lobby_04.png", "images/lobby_05.png",   
				 "images/lobby_06.png", "images/lobby_07.png", "images/lobby_08.png", "images/lobby_09.png", "images/lobby_10.png",   
				 "images/lobby_11.png", "images/lobby_12.png", "images/lobby_13.png", "images/lobby_14.png", "images/lobby_15.png",
				 "images/lobby_16.png", "images/lobby_17.png", "images/arena_01.png", "images/arena_02.png", "images/arena_04.png",
				 "images/arena_06.png", "images/arena_07.png", "images/arena_08.png", "images/arena_11.png", "images/arena_12.png",
				 "images/arena_13.png", "images/arena-bl.png", "images/arena-ml.png", "images/arena-tl.png", "images/board-bc.png",
				 "images/board-bl.png", "images/board-br.png", "images/board-mc.png", "images/board-ml.png", "images/board-mr.png",
				 "images/board-tc.png", "images/board-tl.png", "images/board-tr.png", "images/brilho.png", "images/separation.png"
				 ], 
		
				 function( ) {		
					setTimeout(function() {
						Jackpot.url = window.location.href;
						Jackpot.dominio = Jackpot.url.substring(Jackpot.url.indexOf('?'));
						if(Jackpot.url.indexOf('?') > -1){
							Crafty.scene("replay");
							return;
						}
						Crafty.scene("splash");
					}, 10);
				},
				function(e){
					// Crafty('loading').text("loading {0}% ".format(parseInt(e.percent)));
					Crafty('ProgressBar').setValue(parseInt(e.percent));
				} 
	);//crafty.load

	Crafty.audio.add("hit", "sounds/hit.wav");
	Crafty.audio.add("ploc", "sounds/kill2.wav");
	Crafty.audio.add("go", "sounds/go.wav");
	Crafty.audio.add("bite", "sounds/smash.wav");
	
	Crafty.sprite(1, 1, "images/brilho-field.png", {
		bg_brilho_field: [0,0]
	});
	
	Crafty.sprite(64, 64, "images/buttons2.png", {
		bt_previous:     [0,0],
		bt_previous_over:[1,0],
		bt_next:		 [3,0],
		bt_next_over:	 [2,0],
		bt_people:		 [0,1],
		bt_people_over:	 [1,1],
		bt_gear:		 [2,1],
		bt_gear_over:	 [3,1],
		bt_help:		 [0,2],
		bt_help_over:	 [1,2],
		bt_credits:		 [2,2],
		bt_credits_over: [3,2],
		bt_check:		 [0,3],
		bt_check_over:	 [0,3],
		bt_nocheck:		 [1,3],
		bt_play:		 [2,3],
		bt_pause:		 [3,3],
		bt_menu:		 [0,5],
		bt_menu_over:	 [1,5],
		bt_cops:		 [2,5],
		bt_zombi:		 [3,5],
		bt_menu_big:	 [0,6],
		bt_menu_big_over:[1,6],
		bt_seed:	     [2,6],
		bt_seed_over:    [3,6],
		bt_go:           [0,7],
		bt_go_over:      [1,7],
		
	});
	
	Crafty.sprite(22, 22, "images/buttons3.png", {
		bt_random:         [0,0],
		bt_random_over:    [1,0],
		bt_random_on:	   [2,0],
		bt_random_disable: [3,0],
		bt_tag:			   [0,1],
		bt_tag_over:	   [1,1],
		bt_tag_on:		   [2,1],
		bt_tag_disable:	   [3,1],
		bt_up:		       [0,2],
		bt_up_over:	       [1,2],
		bt_up_on:		   [2,2],
		bt_up_disable:     [3,2],
		bt_down:		   [0,3],
		bt_down_over:	   [1,3],
		bt_down_on:		   [2,3],
		bt_down_disable:   [3,3],
		bt_zumbi:		   [0,4],
		bt_zumbi_over:	   [1,4],
		bt_zumbi_on:	   [2,4],
		bt_zumbi_disable:  [3,4],		
		bt_refresh:		   [0,5],
		bt_refresh_over:   [1,5],
		bt_refresh_on:	   [2,5],
		bt_refresh_disable:[3,5]
		
	});
	
	Crafty.sprite(30, 30, "images/buttons4.png", {
		bt_plus:     [0,1],
		bt_plus_over:  [1,1],
		bt_minus:    [2,1],
		bt_minus_over: [3,1],
		bt_circle:   [1,0]
	});
	
	Crafty.sprite(192, 40, "images/menu.png", {
		mn_inicio:      [0,0],
		mn_inicio_over: [1,0],
		mn_opcoes:      [0,1],
		mn_opcoes_over: [1,1],
		mn_ajuda:       [0,2],
		mn_ajuda_over:  [1,2],
		mn_credito:     [0,3],
		mn_credito_over:[1,3],
		mn_voltar:      [0,4],
		mn_voltar_over: [1,4],
		mn_proximo:     [0,5],
		mn_proximo_over:[1,5]
	});
	
	Crafty.sprite(800, 600, "images/bg_splash_800x600.png", {
		bg_splash: [0,0]
	});
	Crafty.sprite(800, 290, "images/logo_uj.png", {
		bg_logo: [0,0]
	});
	
	Crafty.sprite(74, 74, "images/start.png", {
		bt_start:  [0,0],
		bt_start_over:  [1,0],
		bt_start_clicked:  [2,0],
		bt_start_on:  [3,0]
	});
	
	Crafty.sprite(32, 32, "images/explosions32.png", {
		explode: [0,0]
	});
	
	Crafty.sprite(34, 34, "images/buttons.png", {
		//bt_pause:  [0,0],
		//bt_pause_over:  [1,0],
		bt_cueball:  [0,1],
		bt_cueball_over:  [1,1],
		bt_sound:  [0,2],
		bt_sound_over:  [1,2],
		//bt_random: [0,3],
		//bt_random_over: [1,3],
		bt_label: [0,4],
		bt_label_over: [1,4],
		bt_add:[0,5],
		bt_add_over:[1,5],
		bt_remove:[0,6],
		bt_remove_over:[1,6],
		//bt_menu:[0,7],
		//bt_menu_over:[1,7]
	});
	
	Crafty.sprite(22, 22, "images/ball22x22.png", {
		ball0:  [0,1],
		ball1:  [1,1],
		ball2:  [2,1],
		ball3:  [3,1],
		ball4:  [4,1],
		ball5:  [5,1],
		ball6:  [6,1],
		ball7:  [7,1],
		ball8:  [8,1],
		ball9:  [9,1],
		ball10: [0,2],
		ball11: [1,2],
		ball12: [2,2],
		ball13: [3,2],
		ball14: [4,2],
		ball15: [5,2],
		ball16: [6,2],
		ball17: [7,2],
		ball18: [8,2],
		ball19: [9,2],
		ball20: [0,3],
		ball21: [1,3],
		ball22: [2,3],
		ball23: [3,3],
		ball24: [4,3],
		ball25: [5,3],
		ball26: [6,3],
		ball27: [7,3],
		ball28: [8,3],
		ball29: [9,3],
		ball30: [0,4],
		ball31: [1,4],
		ball32: [2,4],
		ball33: [3,4],
		ball34: [4,4],
		ball35: [5,4],
		ball36: [6,4],
		ball37: [7,4],
		ball38: [8,4],
		ball39: [9,4],
		ball40: [0,5],
		ball41: [1,5],
		ball42: [2,5],
		ball43: [3,5],
		ball44: [4,5],
		ball45: [5,5],
		ball46: [6,5],
		ball47: [7,5],
		ball48: [8,5],
		ball49: [9,5],
		ball50: [0,6],
		ball51: [1,6],
		ball52: [2,6],
		ball53: [3,6],
		ball54: [4,6],
		ball55: [5,6],
		ball56: [6,6],
		ball57: [7,6],
		ball58: [8,6],
		ball59: [9,6],
		ball60: [0,7],
		ball61: [1,7],
		ball62: [2,7],
		ball63: [3,7],
		ball64: [4,7],
		ball65: [5,7],
		ball66: [6,7],
		ball67: [7,7],
		ball68: [8,7],
		ball69: [9,7],
		ball70: [0,8],
		ball71: [1,8],
		ball72: [2,8],
		ball73: [3,8],
		ball74: [4,8],
		ball75: [5,8],
		ball76: [6,8],
		ball77: [7,8],
		ball78: [8,8],
		ball79: [9,8],
		ball80: [0,9],
		ball81: [1,9],
		ball82: [2,9],
		ball83: [3,9],
		ball84: [4,9],
		ball85: [5,9],
		ball86: [6,9],
		ball87: [7,9],
		ball88: [8,9],
		ball89: [9,9],
		
		cueBall: 	[0,0],
		cueBall2:	[1,0],
		zumbiBall1: [2,0],
		zumbiBall2: [3,0],
		zumbiBall3: [4,0],
		zumbiBall4: [5,0],
		blueBall: 	[6,0],
		redBall: 	[7,0],
		greenBall: 	[8,0],
		pinBall: 	[9,0]
	});
});