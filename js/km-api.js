var km = {
	random: function(min, max){
		var r = Math.random();
		return r*(max - min) + min ;
	},
	randomInt: function(min, max){
		return parseInt(km.random(min, max).toFixed(0));
	},
	seed: function(seed){
		console.log("seed mudou");
		return Math.seedrandom(seed.toString());
	},
	
	urlToString: function(url){
		var str = unescape(url);
		str = str.replace('&','');
		return str;
	},
	
	/**
	 * LOCAL E SESSION STORE
	 * */
	store: {
		set: function(key, value){
			localStorage[key] = JSON.stringify(value);
		}, 
		get: function(key){
			var value = localStorage[key];
			if(value == null)
				return null;
			
			return JSON.parse( value );
		}, 
		del: function(key){
			localStorage.removeItem(key);
		},
		setCache: function(key, value){
			sessionStorage[key] =  JSON.stringify(value);
		}, 
		getCache: function(key){
			var value = sessionStorage[key];
			if(value == null)
				return null;
			
			return JSON.parse( value );
		},
		delCache: function(key){
			sessionStorage.removeItem(key);
		}
	},
	
	string:{
		isEmpty: function(t){
			if(t == null || t=='')
				return true;
			return false;
		}
	},
	
	util:{
		isSet: function(param){
			return param != null && param != undefined && param != "undefined";
		}
	},
	
	format:{
		toTime: function(s){
			var hours   = Math.floor(s / 3600);
		    var minutes = Math.floor((s - (hours * 3600)) / 60);
		    var seconds = s - (hours * 3600) - (minutes * 60);
		    var time = '';
		    //if (hours   < 10) {hours   = "0"+hours;}
		    if (minutes < 10) {minutes = "0"+minutes;}
		    if (seconds < 10) {seconds = "0"+seconds;}
		    if(hours == 0){
		    	time = minutes+':'+seconds;
		    }else{
		    	time = hours+':'+minutes+':'+seconds;
		    }
		    return time;
		},
		toMoney: function(value){
			var tmp = value.toString();  
	        tmp = tmp.subject.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	  
	        return 'R$ '+ tmp;  
		},
		withPoints: function(value){
			 return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
	}
	
};

/*
 *
 */
function formatTime(s){
	var hours   = Math.floor(s / 3600);
    var minutes = Math.floor((s - (hours * 3600)) / 60);
    var seconds = s - (hours * 3600) - (minutes * 60);
    var time = '';
    //if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    if(hours == 0){
    	time = minutes+':'+seconds;
    }else{
    	time = hours+':'+minutes+':'+seconds;
    }
    return time;
}

function getMoney( str )  
{  	
        return parseInt( str.replace(/[\D]+/g,'') );  
}  
function formatReal( int )  
{  
        var tmp = int+'';  
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");  
        if( tmp.length > 6 )  
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");  
  
        return tmp;  
}

function formatNumberWithSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function locale(){
	return PMT.i18n.ptBR;
}

/**
 * use
 * "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")
 */
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}
/**
 * hex — a hex color value such as “#abc” or “#123456″ (the hash is optional)
 * lum — the luminosity factor, i.e. -0.1 is 10% darker, 0.2 is 20% lighter, etc.
 *
 */
function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}