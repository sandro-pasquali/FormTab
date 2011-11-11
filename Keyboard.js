function $Keyboard()
  {
    return;
  }
  
$Keyboard.prototype.map = new Array();

$Keyboard.prototype.start = function()
  {
    document.onkeydown = this.processEvent;
	return;
  }

$Keyboard.prototype.defineRange = function(start,finish,handler)
  {
    for(i=start; i<=finish; i++)
	  {
        this.map[i] = eval(handler);
	  }
	return;
  }  

$Keyboard.prototype.defineKey = function(code,handler)
  {
    this.map[code] = eval(handler);
	return;
  }
  
$Keyboard.prototype.processEvent = function() 
  {
    var e = window.event;
    var kc = e.keyCode;
	var ob = $Keyboard.prototype;
	
	var mod = (e.altKey) ? 1 : (e.ctrlKey) ? 2 : (e.shiftKey) ? 3 : null;
	
	if(ob.map[kc])
	  {
	    ob.map[kc](mod,kc);
		return false;
	  }
    else
	  {
	    return true;
	  }
  }
