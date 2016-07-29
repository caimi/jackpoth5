Crafty.scene('arena', function() {
	/*Crafty.e("Alert, Draggable").attr({z: 100})
	.bind('FinishGame', function(){
		if(!Jackpot.replay){
			/*var corpo = 'Para divulgar o sorteio, selecione e copie (CTRL+C) a seguinte url:<br><input style="border: none; width: 90%; padding: 12px; margin: 10px; type="text" onclick="this.select();" value="{0}?{1}"></input>'.format(Jackpot.dominio,Jackpot.generateReplayUrl() );
			var replay = Jackpot.dominio + "?" + Jackpot.generateReplayUrl();
			var voltar = Jackpot.dominio;
			var replaceAlert = '<div class="alert" style="margin-top: 250px" ><div class="titulo">Game over!!!</div><div class="corpo">{0}<br>ou se preferir, click em <br><a class="botao" href="{1}">replay</a> <a class="botao" href="{2}">restart</a></div></div>'.format(corpo, replay, voltar);
			this._msg = replaceAlert;
			this.setAlert(replaceAlert);
			this.replace('<div class="alert" style="margin-top: 250px" ><div class="titulo">Game over!!!</div><div class="corpo">{0}<br>ou se preferir, click em <br><a class="botao" href="{1}">replay</a> <a class="botao" href="{2}">restart</a></div></div>'	);
		}
	})
	.unbind('Click')
	.bind("MouseDown", function(){
		this.startDrag();
	})
	.bind("MouseUp", function(){
		this.stopDrag();
	});
	*/
	Crafty.e("2D, DOM, HTML, Draggable, Mouse")
	.attr({x: (Jackpot.W*0.3)/2 + 100, y:200, w:Jackpot.W*0.7, h: 200, z: 100})
	.bind('FinishGame', function(){
		var corpo = 'Para divulgar o sorteio, selecione e copie (CTRL+C) a seguinte url:<br><input style="border: none; width: 90%; padding: 12px; margin: 10px; type="text" onclick="this.select();" value="{0}?{1}"></input>'.format(Jackpot.dominio,Jackpot.generateReplayUrl() );
		var replay = Jackpot.dominio + "?" + Jackpot.generateReplayUrl();
		var voltar = Jackpot.dominio;
		var replaceAlert = '<div class="alert"><div class="titulo">Game over!!!</div><div class="corpo">{0}<br>ou se preferir, click em <br><a class="botao" href="{1}">replay</a> <a class="botao" href="{2}">restart</a></div></div>'.format(corpo, replay, voltar);
		this.replace(replaceAlert);
		this.visible = true;
	})
	.bind("MouseDown", function(){
		this.startDrag();
	})
	.bind("MouseUp", function(){
		this.stopDrag();
	});
	Crafty("Draggable").visible = false;
	Jackpot.createResponsiveArena();
	Jackpot.createHudArena();
	Jackpot.initialPosition();
}); //end scene

