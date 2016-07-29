Crafty.scene("names", function() {
	var alert;
	alert = Crafty.e("2D, DOM, HTML, Draggable, Mouse")
	.attr({x: 50, y:200, w:Jackpot.W-150, h: 200, z: 1000})
	.bind('Click', function(){
		this.visible = false;
	})
	.bind("MouseDown", function(){
		this.startDrag();
	})
	.bind("MouseUp", function(){
		this.stopDrag();
	});
	
	Crafty.e("2D, Canvas, bg_splash").attr({w: Crafty.viewport.width, h: Crafty.viewport.height});
	Jackpot.createResponsiveBoard();
	
	Crafty.e('2D, DOM, HTML')
		.attr({x: Jackpot.board.x+20, y: Jackpot.board.y+103, w: 250})
		.replace('<div id="upload-file-container"><input id="fileinput" type="file" name="photo" /></div>');  

	document.getElementById('fileinput').addEventListener('change', readSingleFile, false);

	var names = km.store.getCache('namesList');
	names = km.string.isEmpty(names)?'':names;
	Crafty.e("HTML, Keyboard, names")
		.attr({x: Jackpot.board.x+20, y: Jackpot.board.y+140, w: Jackpot.board.w-75, z: 1000})
		.replace("<form><textarea id='nameOfPlayers' placeholder='participante 1, participante 2, participante 3, ...' style='width: {0}px; height: {1}px; z-index: 1001'>{2}</textarea></form>".format(Jackpot.board.w-133, Jackpot.board.h-300, names));

	Jackpot.createMenu("names");
	
	Crafty.e("Button, bt_go")
		.attr({x: Jackpot.board.x+Jackpot.board.w/2-58, y:Jackpot.board.y+Jackpot.board.h-140})
		.setType('bt_go')
		.bind('Click', function(){
			Jackpot.names = [];
			var rep = [];
			var names = [];
			var lines = document.getElementsByTagName('TEXTAREA')[0].value;
	
			if(lines != ''){
				var texto = lines.split(",");
				for(var i=0; i<texto.length; i++)
					if(texto[i].trim() != '')
						Jackpot.names.push(texto[i].trim());
			}
	
			if(Jackpot.names.length == 0) {
//				Crafty.e("Alert").attr({z: 100}).setAlert('A lista de nomes não foi carregada.');
				alert.attr({x: 50, y: (Crafty.viewport.height-200)/2});
				alert.replace('<div class="alert"><div class="titulo">Atenção</div><div class="corpo">{0}<br></div><div class="botao"><span>OK</span></div></div>'.format('A lista de nomes não foi carregada.'));
				alert.visible=true;
				return;
			}
			
			for(i=0; i<Jackpot.names.length; i++){
				var name = Jackpot.names[i].trim().toUpperCase();
				if(names.indexOf(name)>=0){
					rep.push(name);
				}
				names.push(name);
			}
			
			if(rep.length > 0){
				//Crafty.e("Alert").attr({z: 100}).setAlert('A lista contém os seguites nomes repetidos: ' + rep);
				//alert('A lista contém os seguites nomes repetidos: ' + rep);
				alert.attr({x: 50, y: 250});
				alert.replace('<div class="alert"><div class="titulo">Atenção</div><div class="corpo">{0}<br></div><div class="botao"><span>OK</span></div></div>'.format('A lista contém os seguites nomes repetidos: ' + rep));
				alert.visible=true;
				return
			}
			km.store.setCache('namesList', lines);
			Crafty.scene("arena");
		}); 
	
	Crafty.e("2D, DOM, Image").attr({ x:Jackpot.board.x+25, y:Jackpot.board.y+145, w:30, h:Jackpot.board.h-300, z:1000}).image("images/brilho.png", "repeat");
	Crafty.e("2D, DOM, Image").attr({ x:Jackpot.board.w-57, y:Jackpot.board.h-105, w:30, h:Jackpot.board.h-300, z:1000, rotation: 180}).image("images/brilho.png", "repeat");

	Crafty.viewport.reload();
});