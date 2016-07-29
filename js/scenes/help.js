Crafty.scene("help", function() {
	Crafty.e("2D, Canvas, bg_splash").attr({w: Crafty.viewport.width, h: Crafty.viewport.height});
	Jackpot.createResponsiveBoard();
	
	Crafty.e("Alert").attr({z: 100});
	
	Jackpot.createMenu("help");
	Crafty.e("Text, HTML").attr({x: (Crafty.viewport.width/2)-50, y: 145}).textFont({'size':'30px', 'family':'Tahoma', 'weight':'bold'}).text('Ajuda').textColor('#AF6014').css({'text-shadow':'1px 1px #666666'});
			
	//Crafty.e("Checkbox").attr({x:Jackpot.board.w-300, y: Jackpot.board.h-Jackpot.board.y-30}).setValue(false);
	
	var html =
			"<div class='container'>" +
			"<div class='toggle-box'>" +
			"<div class='title'><div class='topic-icon'><i class='fa fa-info'></i></div><span>O que é? E como Funciona?</span><i class='fa fa-chevron-down caret'></i></div>" +
			"<div class='body'>" +
			"<p>Esta aplicação foi desenvolvida pensando em tornar mais divertido o ato de sortear uma coisa ou pessoa. " +
			" A ideia é ir eliminando os participantes, um a um, até sobrar uma quantidade equivalente ao número de prêmios configurado no início da rodada.</p>" +
			"<p>Após o sorteio será gerado um link, que poderá ser divulgado aos participantes. Estes poderão rever o replay do sorteio.</p></div></div>" +
			"<div class='toggle-box'>" +
			"<div class='title'><div class='topic-icon'><i class='fa fa-th-large'></i></div><span>Modos de Sorteio</span><i class='fa fa-chevron-down caret'></i></div>" +
			"<div class='body'>" +
			"<p>Os modos de sorteio disponível são o <b>Polícia e Ladrão</b> e o modo <b>Zumbi</b>.</p>" +
			"<p>No modo <b>Polícia e Ladrão</b>, os participantes vão sendo eliminados por bolas brancas até sobrar apenas o equivalente a quantidade de prêmios selecionada." +
			"Uma nova bola branca é adicionada no centro da arena a cada 5s, com uma velocidade e direção aleatória. O jogador é desclassificado ao encostar em uma bola branca.</p>" +
			"<p>Já no modo <b>Zumbi</b>, quando a bola zumbi toca as outras, estas então tornam-se também zumbis. Ganha os últimos sobreviventes.</p>" +
			"</div>" +
			"</div>" +
			"<div class='toggle-box'>" +
			"<div class='title'><div class='topic-icon'><i class='fa fa-key'></i></div><span>Chave de Sorteio (seed)</span><i class='fa fa-chevron-down caret'></i></div>" +
			"<div class='body'><p>Para aumentar o suspense do sorteio, é possível condicioná-lo com uma chave, ou em linguagem nerd, uma semente de aleatoriedade (seed). Por exemplo, você poderia associar a chave com os números do sorteio da megasena ou da loteria federal. " +
			"<br>Use a criatividade! É possível associar a qualquer número. " +
			"<ul><li>A número dos carros na ordem de chegada de uma corrida de formula 1.</li>" +
			"<li>Aos sorteios conbinadas dos números da megasena, quina, loterial federal, etc...</li>" +
			"<li>Se for fazer o sorteio ao vivo, solicite que a plateia diga os números. Data de nascimentos, telefones, CPF, etc...</li></ul>" +
			"</p>" +
			"<p>Para incluir a chave, clique no ícone no formato de chave. Digite o número escolhido e clique em Play. </p>" +
			"<p><b>IMPORTANTE:</b> Deixe para incluir a chave após configurar todas as outras opções do sorteio. </p>" +
			"</div>" +
			"</div>" +			
			"<div class='toggle-box'>" +
			"<div class='title'><div class='topic-icon'><i class='fa fa-users'></i></div><span>Incluindo os participantes</span><i class='fa fa-chevron-down caret'></i></div>" +
			"<div class='body'><img src='images/help/help-01.png' align='left' style='margin: 10px'><p>Digite os nomes dos participantes, ou selecione um arquivo com os seus nomes. Os nomes devem ser separador por vírgula ( <b style='font-size: 1.5em'>,</b> ) " +
			"e não pode haver nomes repetidos.</p><p>Para facilitar, após entrar os nomes uma primeira vez, eles ficam como padrão no campo, facilitando novos sorteios.</p>" +
			"</div>" +
			"</div>" +
			"<div class='toggle-box'>" +
			"<div class='title'><div class='topic-icon'><i class='fa fa-play'></i></div><span>Configurando o Sorteio</span><i class='fa fa-chevron-down caret'></i></div>" +
			"<div class='body'><img src='images/help/help-02.png' align='left' style='margin: 10px'><p>Veja na imagem como cada botão altera a forma de sorteio.</p>" +
			"</div>" +
			"</div>" +
			"<div class='toggle-box'>" +
			"<div class='title'><div class='topic-icon'><i class='fa fa-gears'></i></div><span>Opções</span><i class='fa fa-chevron-down caret'></i></div>" +
			"<div class='body'><p>Existem algumas configurações possíveis. Na página de <b>Opções</b> <i class='fa fa-gear'></i> você poderá configurar tanto a aparência quanto a comportamento do sorteio.</p>" +
			"</div>" +
			"</div>" +

			"</div>";
	
	Crafty.e("help, HTML").attr({x:75, y: 210}).replace(html);
	
    $("div.toggle-box").click( function(){
       //$("div.toggle-box div.body").hide();
       $(this).children("div.body").toggle(); 
       $(this).children("div.title").children("i.caret").toggleClass("fa-chevron-down fa-chevron-up");
    });
	
    $("div.toggle-box").css('width', Crafty.viewport.width - 195);
    $("div.container").css('max-height', Crafty.viewport.height - 375);
    
	//Crafty.e("ToggleBox").attr({x:75, y: 225}).setTitle('Testes').setBody('tutorial').setWidth((Crafty.viewport.width - 200) / 2);
	
	/*Jackpot.names = [];
	var scale = 1;//Crafty.viewport.width / 800;
	Crafty.e("2D, Canvas, bg_splash").attr({w: Crafty.viewport.width, h: Crafty.viewport.height});
	Crafty.e("2D, Canvas, bg_logo").attr({x:(Crafty.viewport.width-800)/2, y: 30, w: 800, h: 300});
	//Crafty.viewport.scale(window.innerHeight/600);
	var rep = [];
	var names = [];

	Crafty.e("Alert").attr({z: 100});
	
	Crafty.e("Button, mn_voltar")
	.attr({x: (Crafty.viewport.width)/2-300, y: Crafty.viewport.height-75})
	.setType('mn_voltar')
	.bind('Click', function(){
		Crafty.scene("splash");
	});
	
	Crafty.e("Button, mn_proximo")
		.attr({x: (Crafty.viewport.width)/2+100, y: Crafty.viewport.height-75})
		.setType('mn_proximo')
		.bind('Click', function(){ 
			Jackpot.names = [];
			var rep = [];
			var names = [];
			var lines = document.getElementsByTagName('TEXTAREA')[0].value;
	
			if(lines != ''){
				var texto = lines.split(",");
				for(i=0; i<texto.length; i++)
					if(texto[i].trim() != '')
						Jackpot.names.push(texto[i].trim());
			}

			if(Jackpot.names.length == 0) {
				Crafty("Alert").setAlert('A lista de nomes não foi carregada.');
				return;
			}
			
			for(i=0; i<Jackpot.names.length; i++){
				var name = Jackpot.names[i].trim().toUpperCase();
				if(names.indexOf(name)>0){
					rep.push(name);
				}
				names.push(name);
			}
			
			if(rep.length > 0){
				Crafty("Alert").setAlert('A lista contém os seguites nomes repetidos: ' + rep);
				return
			}
			Crafty.scene("arena")
		}); 
	
	Crafty.e('2D, DOM, Text')
		.attr({x: 400, y: 365, w: Crafty.viewport.width-500})
		.text('Selecione um arquivo com nomes separados por vírgula, ou digite eles no campo abaixo.')
		.textColor('#63200e')
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'})
		
	Crafty.e('2D, DOM, HTML')
		.attr({x: 25, y: 360, w: 250})
		.replace('<div id="upload-file-container"><input id="fileinput" type="file" name="photo" /></div>');  
    
	document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
	
	Crafty.e("HTML, Keyboard, names")
		.attr({x: 25, y: 400, w: 250})
		.replace("<form><textarea id='nameOfPlayers' placeholder='player1, player2' style='width: {0}px; height: {1}px;'></textarea></form>".format(Crafty.viewport.width-50, Crafty.viewport.height-500))
*/
	
});