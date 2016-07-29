Crafty.scene('replay', function() {
	try{
		Jackpot.initializeReplay();	
	}catch(err){
		alert(err + '\nVocê será direcionado para a página inicial.');
		window.location.href = Jackpot.dominio;
		Crafty.scene('splash');
		return;
	}
	var left = window.innerWidth - Jackpot.W;
	var top =  window.innerHeight - Jackpot.H;
	var style = '';
	if(top>0)
		style += parseInt(top/2)+'px ';
	else
		style += '0px ';
	if(left>0)
		style += parseInt(left/2)+'px ';
	else
		style += '0px ';
			
	document.getElementById("cr-stage").style.left = parseInt(left/2)+'px';
	document.getElementById("cr-stage").style.top = parseInt(top/2)+'px';
	
	Crafty.e('2D, Text, DOM')
		.attr({x: 30, y: 50, w: 200, z:100})
		.text('REPLAY<br>REPLAY<BR>REPLAY<br>REPLAY<BR>REPLAY<br>')
		.textFont({family: 'impact', size: '80px', weight:'bold'})
		.textColor('#ffffff', 0.2)
		.css({'text-align':'center'});
	km.seed(Jackpot.seed.toString());
	Jackpot.createResponsiveArena();
	Jackpot.createHudArena();
	Jackpot.initialPosition();
	Crafty.viewport.reload();
}); //end scene
