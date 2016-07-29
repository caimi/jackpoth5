Crafty.scene("credits", function() {
	Crafty.e("2D, Canvas, bg_splash").attr({w: Crafty.viewport.width, h: Crafty.viewport.height});
	Jackpot.createResponsiveBoard();
	
	Crafty.e("Alert").attr({z: 100});

	Jackpot.createMenu("credits");
	Crafty.e("Text, HTML").attr({x: (Crafty.viewport.width/2)-60, y: 145}).textFont({'size':'30px', 'family':'Tahoma', 'weight':'bold'}).text('Créditos').textColor('#AF6014').css({'text-shadow':'1px 1px #666666'});			
	
	var width = Crafty.viewport.width - 210;
	var height = Crafty.viewport.height - 400;
	html = '<div style="overflow: auto; height:' + height + 'px; width: ' + width + 'px; border: 0px solid red; text-align: center; font-family: \'Days One\', sans-serif; font-size: 24px; color:#fbcd38; text-shadow: 1px 2px 2px #63200e">' +
		   '<span style="">Conceito, Design e Programação</span><br>' +
		   '<span style="font-size: 30px; color: white">Carlos Henrique Caimi</span><br>' +
		   '<span style="font-size: 14px; color: #AF6014; text-shadow: none; font-weight: 400">(<a style="color: #AF6014; text-decoration:none" href="mailto:carlos@caimi.com.br">carlos@caimi.com.br</a>)</span><p></p>' +
		   '<span style="">Pesquisas, Protótipos e Apoio</span><br>' +
		   '<span style="font-size: 30px; color: white">Lucas de Carvalho Bueno Santos</span><br>' +
		   '<span style="font-size: 14px; color: #AF6014; text-shadow: none; font-weight: 400">(<a style="color: #AF6014; text-decoration:none" href="https://github.com/beothorn" target="_new">https://github.com/beothorn</a>)</span><p></p>' +
		   '<span style="">Bibliotecas</span><br>' +
		   '<span style="font-size: 20px; color: white">Crafty </span>' +
		   '<span style="font-size: 14px; color: #AF6014; text-shadow: none; font-weight: 400">(<a style="color: #AF6014; text-decoration:none" href="http://craftyjs.com" target="_new">http://craftyjs.com</a>)</span><br>' +
		   '<span style="font-size: 20px; color: white">JQuery </span>' +
		   '<span style="font-size: 14px; color: #AF6014; text-shadow: none; font-weight: 400">(<a style="color: #AF6014; text-decoration:none" href="http://jquery.com/" target="_new">http://jquery.com/</a>)</span><br>' +
		   '<span style="font-size: 20px; color: white">David Bau - random seeds </span>' +
		   '<span style="font-size: 14px; color: #AF6014; text-shadow: none; font-weight: 400">(<a style="color: #AF6014; text-decoration:none" href="https://github.com/davidbau/seedrandom" target="_new">https://github.com/davidbau/seedrandom</a>)</span><br>' +
		   '<span style="font-size: 20px; color: white">Brian Turek - SHA1 </span>' +
		   '<span style="font-size: 14px; color: #AF6014; text-shadow: none; font-weight: 400">(<a style="color: #AF6014; text-decoration:none" href="http://caligatio.github.io/jsSHA/" target="_new">http://caligatio.github.io/jsSHA/</a>)</span><br>' +
		   '<span style="font-size: 20px; color: white">Font-Awesome </span>' +
		   '<span style="font-size: 14px; color: #AF6014; text-shadow: none; font-weight: 400">(<a style="color: #AF6014; text-decoration:none" href="http://fortawesome.github.io/Font-Awesome/" target="_new">http://fortawesome.github.io/Font-Awesome/</a>)</span><p></p>' +
		   
		   '</div>';
	
	Crafty.e("credits, HTML").attr({x:100, y: 210, w: width}).replace(html);
});