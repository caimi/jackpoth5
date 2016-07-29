Crafty.scene("splash", function() {
	Crafty.e("2D, Canvas, bg_splash").attr({w: Math.max( Crafty.viewport.width, 800), h: Math.max(Crafty.viewport.height, 600)});
	//Crafty.e("2D, Canvas, Tween, bg_logo").attr({x:(Crafty.viewport.width-800)/2+360, y: 280, w: 80, h: 30})
	Crafty.e("2D, Canvas, Tween, bg_logo")
	.attr({x:(Crafty.viewport.width-80)/2, y: (Crafty.viewport.height-300)/2, w: 80, h:30})
	//.attr({x:(Crafty.viewport.width)/2-40, y: (Crafty.viewport.height)/2-15, w: 80, h: 30})
	.origin("center")
	.tween({x:(Crafty.viewport.width-800)/2, y: 50, w: 800, h:300, rotation: 0 }, 50);

	var x = (Crafty.viewport.width-190)/2;
	var y = 500;
	
	Crafty.e("Button, Tween, mn_inicio")
		.attr({x: 0, y: y-120, w: 192, h:40})
		.setType('mn_inicio')
		.bind('Click', function(){ Crafty.scene("names"); })
		.tween({x:x, y: y-120, w: 190, h:40, rotation: 0 }, 500);
	Crafty.e("Button, Tween, mn_opcoes")
		.attr({x: Crafty.viewport.width, y: y-120, w: 192, h:40})
		.setType('mn_opcoes')
		.bind('Click', function(){ Crafty.scene("conf"); })
		.tween({x:x, y: y-80, w: 190, h:40, rotation: 0 }, 300);
	Crafty.e("Button, Tween, mn_ajuda")
		.attr({x: 0, y: y-120, w: 192, h:40})
		.setType('mn_ajuda')
		.bind('Click', function(){ Crafty.scene("help"); })
		.tween({x:x, y: y-40, w: 190, h:40, rotation: 0 }, 500);
	Crafty.e("Button, Tween, mn_credito")
		.attr({x: Crafty.viewport.width, y: y-120, w: 192, h:40})
		.setType('mn_credito')
		.bind('Click', function(){ Crafty.scene("credits"); })
		.tween({x:x, y: y, w: 190, h:40, rotation: 0 }, 400);
	
});