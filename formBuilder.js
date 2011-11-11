
var tabList = new Array();

var formOffBorder = '2px #000000 solid';
var formOnBorder = '2px #ff0000 solid';
var tabOffBack = '#c0c0c0';
var tabOnBack = '#ff0000';
var tabOffBorder = '1px #000000 solid';
var tabOnBorder = '1px #ff0000 solid';

var numString = '';
var tabStartNum = null;
var tabsOn = false;
var curPos = 0;
var lastPos = 0;

function readForm(N)
  {
    if(N)
      {
	    tabStartNum = N-1;
	    tabsOn = true;
      }
	  
	for(i=0;i<document.forms.length;i++)
	  {
	    var F = document.forms[i];
		for(x=0; x < F.elements.length; x++)
		  {
		    var E = F.elements[x];
			if(E.type.toLowerCase() != 'hidden')
			  {
                if(N)
				  {
				    E.outerHTML = '<SPAN ID="F'+x+'"  STYLE="top:0;height:18;background-color:'+tabOffBack+';padding:2px;border:'+tabOffBorder+';font-family:Verdana,Arial;font-weight:bold;font-size:10px;color:#000000;">' + N + '</SPAN>' + E.outerHTML;
					++N;
				  }
		        E = F.elements[x]; // changed, so update ref
				E.style.border = formOffBorder;
	            var bl = E.type.toLowerCase();
                if(bl == 'select-one')
			      {
			        E.onmousedown = function(){};
			      }
			    var tL = tabList.length;
				tabList[tL] = new Object();
				tabList[tL].fRef = E;
				if(tabsOn)
				  {
				    tabList[tL].tRef = document.all['F'+x];
				  }
			  } 
		  }
	  }
	updatePosition(0);
	return;
  }

function shiftPosition(val)
  {
    lastPos = curPos;
    var nP = curPos + val;
	curPos = (nP>tabList.length-1)
	         ? 0
			 : (nP<0)
			   ? tabList.length-1
			   : nP;

	updatePosition();
	return;
  }  
  
function updatePosition()
  {
    // turn off last
    tabList[lastPos].fRef.style.border = formOffBorder;
	if(tabsOn)
	  {
	    with(tabList[lastPos+tabStartNum].tRef.style)
	      {
		    border = tabOffBorder;
		    backgroundColor = tabOffBack;
	      }
	  }

	// turn on current
    tabList[curPos].fRef.focus();
    tabList[curPos].fRef.style.border = formOnBorder;
	if(tabsOn)
	  {
	    with(tabList[curPos+tabStartNum].tRef.style)
	      {
		    border = tabOnBorder;
		    backgroundColor = tabOnBack;
	      }
	  }
	return;
  }  
  
function setupKeyboard()
  {
    KEYBOARD = new $Keyboard();
	KEYBOARD.defineKey(9,'tabHandler');
	KEYBOARD.defineKey(13,'enterHandler');
	KEYBOARD.defineKey(37,'tabHandler');
	KEYBOARD.defineKey(39,'tabHandler');
	KEYBOARD.defineRange(48,57,'numHandler');
	KEYBOARD.start();  
	return;
  }

function tabHandler(mod,k)
  {
  	var tempPos = (mod==3||k==37) ? shiftPosition(-1) : shiftPosition(1);
    return;
  }

function numHandler(mod,k)
  {
    if(mod==3 && tabsOn)
	  {
        numString+=(k-48).toString();
	  }
	return;
  }

function enterHandler()
  {
    if(numString)
	  {
	    lastPos = curPos;
	    curPos = parseInt(numString)-tabStartNum-1;
	    updatePosition();
		numString = '';
	  }
    else if(tabList[curPos].fRef)
	  {
	    var ty = tabList[curPos].fRef.type.toLowerCase();
		switch(ty)
		  {
		    case 'checkbox':
			  tabList[curPos].fRef.checked 
			  = (tabList[curPos].fRef.checked==true) ? false : true;
			break;
			
		    case 'radio':
			  tabList[curPos].fRef.checked 
			  = (tabList[curPos].fRef.checked==true) ? false : true;
			break;
			
		    case 'select-one':

			break;			
			
			default:
			break;
		  }
	  }
	return;
  } 