Crafty.scene("conf", function() {
	Crafty.e("2D, Canvas, bg_splash").attr({w: Crafty.viewport.width, h: Crafty.viewport.height});
	Jackpot.createResponsiveBoard();
	
	Crafty.e("Alert").attr({z: 100});

	Jackpot.createMenu("conf");
	Crafty.e("Text, HTML").attr({x: (Crafty.viewport.width/2)-50, y: 145}).textFont({'size':'30px', 'family':'Tahoma', 'weight':'bold'}).text('Opções').textColor('#AF6014').css({'text-shadow':'1px 1px #666666'});
	var x = 60;
	var y = 230;
	//var options = km.store.get('options');

	Crafty.e("2D, DOM, HTML, Text")
		.attr({x: x, y: y, w: 200})
		.text('Mostrar label ao iniciar?')
		.textFont({family:'tahoma', size: '18px'})
		.textColor('#888888')
		.css({'text-align':'right'});
	Crafty.e("Checkbox, optLabel")
		.attr({x:x+210, y: y})
		.setValue(Jackpot.options.label)
		.bind('Click', function(){
			Jackpot.options.label = this._value;
		});

	Crafty.e("2D, DOM, HTML, Text")
		.attr({x: x, y: y+40, w: 200})
		.text('Tamanho do label:')
		.textFont({family:'tahoma', size: '18px'})
		.textColor('#888888')
		.css({'text-align':'right'});
	Crafty.e("2D, Canvas, Image, bgLabel")
		.attr({ x:x+210, y: y+37, w: 200, h: 30}  )
		.image("images/field-bg.png", "no-repeat");

	Crafty.e("2D, DOM, Text, Mouse, optLabelSize")
		.attr({x: x+215, y: y+40, w: 200, h:20, value: 0})
		.text( Jackpot.tagFontSize[Jackpot.options.labelFont.id] )
		.textFont({ family:'tahoma', size: '18px' })
		.textColor('#87480C')
		.bind('Click', function(){
			this.value++;
			if(this.value > 2) this.value = 0;
			this.text( Jackpot.tagFontSize[this.value] );
			Jackpot.options.labelFont.size = 12 + (2*this.value) + 'px';
			Jackpot.options.labelFont.id = this.value;
		});

	Crafty.e("2D, Canvas, Image, bgLabel")
		.attr({ x:x+210, y: y+37, w: 200, h: 30}  )
		.image("images/field-bg.png", "no-repeat");
	
	Crafty.e("2D, DOM, HTML, Text")
		.attr({x: x, y: y+80, w: 200})
		.text('Label em negrito?')
		.textFont({family:'tahoma', size: '18px'})
		.textColor('#888888')
		.css({'text-align':'right'});
	Crafty.e("Checkbox, optLabelWeight")
		.attr({x:x+210, y: y+80})
		.setValue(Jackpot.options.labelFont.weight)
		.bind('Click', function(){
			Jackpot.options.labelFont.weight = this._value;
		});
	Crafty.e("2D, DOM, HTML, Text")
		.attr({x: x, y: y+120, w: 200})
		.text('Velocidade das bolas')
		.textFont({family:'tahoma', size: '18px'})
		.textColor('#888888')
		.css({'text-align':'right'});
	
	Crafty.e("2D, DOM, Text, Mouse, optVelocity")
		.attr({x: x+215, y: y+120, w: 200, h:20, value: 0})
		.text( Jackpot.tagVelocity[Jackpot.options.vmax - 1] )
		.textFont({ family:'tahoma', size: '18px' })
		.textColor('#87480C')
		.bind('Click', function(){
			this.value++;
			if(this.value > 2) this.value = 0;
			this.text( Jackpot.tagVelocity[this.value] );
			Jackpot.options.vmax = 1 + (1*this.value);
			Jackpot.vmax = Jackpot.options.vmax;
		});
	
});