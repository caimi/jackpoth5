Crafty.scene("check", function() {
	//Crafty.viewport.scale(window.innerHeight/600);
	var bg = Crafty.e("2D, Canvas, Image, Mouse")
		.image("images/splash_800x500.png", "no-repeat");
	Crafty.background(bg);

	Jackpot.createResponsiveBoard();
	
	var x = 50,
	    y = 250,
		w = 150;
	
	Crafty.e("2D, Text, DOM")
		.attr({x: x, y: y, w: w})
		.text("Setter:")
		.textColor("#a1a1a1")
		.css({'text-align':'right'})
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'});
	Crafty.e("Checkbox")
		.attr({x: x+w+10, y: y-5})
		.setValue(Crafty.support.setter);
	y += 35;
	Crafty.e("2D, Text, DOM")
		.attr({x: x, y: y, w: w})
		.text("Define Property:")
		.textColor("#a1a1a1")
		.css({'text-align':'right'})
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'});
	Crafty.e("Checkbox")
		.attr({x: x+w+10, y: y-5})
		.setValue(Crafty.support.defineProperty);
	y += 35;		
	Crafty.e("2D, Text, DOM")
		.attr({x: x, y: y, w: w})
		.text("Audio:")
		.textColor("#a1a1a1")
		.css({'text-align':'right'})
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'});
	Crafty.e("Checkbox")
		.attr({x: x+w+10, y: y-5})
		.setValue(Crafty.support.audio);	
	y += 35;		
	Crafty.e("2D, Text, DOM")
		.attr({x: x, y: y, w: w})
		.text("Prefix:")
		.textColor("#a1a1a1")
		.css({'text-align':'right'})
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'});
	Crafty.e("Checkbox")
		.attr({x: x+w+10, y: y-5})
		.setValue(Crafty.support.prefix);	
	y += 35;		
	Crafty.e("2D, Text, DOM")
		.attr({x: x, y: y, w: w})
		.text("Version Name:")
		.textColor("#a1a1a1")
		.css({'text-align':'right'})
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'});
	Crafty.e("2D, Text, DOM")
		.attr({x: x+w+10, y: y, w: w})
		.text(Crafty.support.versionName)
		.textColor("#a1a1a1")
		.css({'text-align':'left'})
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'});
	y += 35;		
	Crafty.e("2D, Text, DOM")
		.attr({x: x, y: y, w: w})
		.text("Version:")
		.textColor("#a1a1a1")
		.css({'text-align':'right'})
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'});
	Crafty.e("2D, Text, DOM")
		.attr({x: x+w+10, y: y, w: w})
		.text(Crafty.support.version)
		.textColor("#a1a1a1")
		.css({'text-align':'left'})
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'});		
	x = 350;
	y = 250;
	Crafty.e("2D, Text, DOM")
		.attr({x: x, y: y, w: w})
		.text("Canvas:")
		.textColor("#a1a1a1")
		.css({'text-align':'right'})
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'});
	Crafty.e("Checkbox")
		.attr({x: x+w+10, y: y-5})
		.setValue(Crafty.support.canvas);		
	y += 35;
	Crafty.e("2D, Text, DOM")
		.attr({x: x, y: y, w: w})
		.text("WebGl:")
		.textColor("#a1a1a1")
		.css({'text-align':'right'})
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'});
	Crafty.e("Checkbox")
		.attr({x: x+w+10, y: y-5})
		.setValue(Crafty.support.webgl);		
	y += 35;		
	Crafty.e("2D, Text, DOM")
		.attr({x: x, y: y, w: w})
		.text("CSS 3D Transform:")
		.textColor("#a1a1a1")
		.css({'text-align':'right'})
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'});
	Crafty.e("Checkbox")
		.attr({x: x+w+10, y: y-5})
		.setValue(Crafty.support.css3dtransform);		
	y += 35;		
	Crafty.e("2D, Text, DOM")
		.attr({x: x, y: y, w: w})
		.text("Device Orientation:")
		.textColor("#a1a1a1")
		.css({'text-align':'right'})
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'});
	Crafty.e("Checkbox")
		.attr({x: x+w+10, y: y-5})
		.setValue(Crafty.support.deviceorientation);		
	y += 35;		
	Crafty.e("2D, Text, DOM")
		.attr({x: x, y: y, w: w})
		.text("Device Motion:")
		.textColor("#a1a1a1")
		.css({'text-align':'right'})
		.textFont({family: 'tahoma', size: '14px', weight: 'bold'});
	Crafty.e("Checkbox")
		.attr({x: x+w+10, y: y-5})
		.setValue(Crafty.support.devicemotion);	
});