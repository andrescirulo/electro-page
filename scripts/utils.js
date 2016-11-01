electroPageApp.factory('$utils', function() {
     
    var factory = {}; 
 
    factory.html2rgb = function (color)
    {
    	var rgb=new Object();
    	if (color.substr(0,1) == '#')
    	{
    		color = color.substr(1);
    	}
    	if (color.length == 6){
    		rgb.r=color.substr(0,2);
    		rgb.g=color.substr(2,2);
    		rgb.b=color.substr(4);
    	}
    	else if (color.length == 3){
    		rgb.r=color.substr(0,1) + color.substr(0,1);
    		rgb.g=color.substr(1,1) + color.substr(1,1);
    		rgb.b=color.substr(2) + color.substr(2);
    	}
    	else{
    		return false;
    	}
    	rgb.r=parseInt(rgb.r, 16);
    	rgb.g=parseInt(rgb.g, 16);
    	rgb.b=parseInt(rgb.b, 16);

    	return rgb;
    };
 
    factory.rgb2html = function(r, g, b)
    {
    	rString = r.toString(16);
    	gString = g.toString(16);
    	bString = b.toString(16);
    	
    	return '#' + factory.pad(rString,2) + factory.pad(gString,2) + factory.pad(bString,2);
    };
 
    factory.modificarColor = function (colorHTML,factor){
    	var rgb=factory.html2rgb(colorHTML);
    	rgb.r+=factor;
    	rgb.g+=factor;
    	rgb.b+=factor;
    	if (rgb.r<0){
    		rgb.r=0;
    	}
    	if (rgb.g<0){
    		rgb.g=0;
    	}
    	if (rgb.b<0){
    		rgb.b=0;
    	}
    	if (rgb.r>255){
    		rgb.r=255;
    	}
    	if (rgb.g>255){
    		rgb.g=255;
    	}
    	if (rgb.b>255){
    		rgb.b=255;
    	}
    	return factory.rgb2html(rgb.r,rgb.g,rgb.b);
    };
    
    factory.pad = function(val, len, car) {
    	val = String(val);
    	car = car || '0';
    	while (val.length < len) {val = car + val;}
    	return val;
    };
    
    factory.tiempoDesde = function(fecha){
    	var ahora=new Date();
    	var segundos=(ahora.getTime() - fecha.getTime())/1000;
    	if (segundos<60){
    		return "Hace unos instantes";
    	}
    	else if (segundos<3600){
    		var min=Math.floor(segundos/60.0);
    		if (min==1){
    			return "Hace un minuto";
    		}
    		else{
    			return "Hace " + min + " minutos";
    		}
    	}
    	else if(segundos<(3600*24)){
    		var horas=Math.floor(segundos/3600.0);
    		if (horas==1){
    			return "Hace una hora";
    		}
    		else{
    			return "Hace " + horas + " horas";
    		}
    	}
    	else{
    		var dias=Math.floor(segundos/(3600.0*24));
    		if (dias==1){
    			return "Hace un día";
    		}
    		else{
    			return "Hace " + dias + " dias";
    		}
    	}
    };
    
    factory.tiempoEntre = function(d1,d2){
    	    var t2 = d2.getTime();
    	    var t1 = d1.getTime();
    	    var difDays=parseFloat((t2-t1)/(24*3600*1000));
    	    var difHours=0;
    	    if (difDays>1){
    		    if (Math.floor(difDays)<difDays){
    		    	difHours=(difDays-Math.floor(difDays))*24;
    		    	difDays=Math.floor(difDays);
    		    	return difDays + "d " + Math.ceil(difHours) + "h";
    		    }
    		    else{
    		    	return difDays + "d";
    		    }
    	    }
    	    else{
    	    	var difMins=0;
    	    	difHours=(difDays-Math.floor(difDays))*24;
    	    	if (Math.floor(difHours)<difHours){
    	    		difMins=(difHours-Math.floor(difHours))*60;
    	    		difHours=Math.floor(difHours);
    		    	return difHours + "h " + Math.ceil(difMins) + "m";
    		    }
    		    else{
    		    	return difHours + "h";
    		    }
    	    }
    };
    
    factory.getArrayIndex = function(array,elem,key){
    	if (key==null){
	    	for (var i=0;i<array.length;i++){
	    		if (array[i]==elem){
	    			return i;
	    		}
	    	}
    	}
    	else{
    		for (var i=0;i<array.length;i++){
	    		if (array[i][key]==elem[key]){
	    			return i;
	    		}
	    	}
    	}
    	return -1;
    };
    
    factory.getItem = function(array,key,value){
		for (var i=0;i<array.length;i++){
    		if (array[i][key]==value){
    			return array[i];
    		}
    	}
    	return null;
    };
    
    
    factory.scrollToTop = function(callback){
    	$(factory.getTagForScroll()).animate({scrollTop:0}, 'slow',callback);
    }

    factory.getTagForScroll = function(){
    	if ($('body').scrollTop()>0){
    		return "body";
    	}
    	else{
    		return "html";
    	}
    }
    
    return factory;
});





