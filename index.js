
var colors = ["red", "green", "blue","yellow"];

// change "home" background and color, and remove other nav colors
$(document).ready(function(){  

    $("#a_nav_header").css({
	"background-color": NAV_BG_COLOR_SELECTED,
	"color": "white"
    });

    // The blinking cursor
    toggleCursor(0);

    function toggleCursor(isToggled) {
	var bgColor, ftColor;
	if(isToggled===0) {
	    bgColor = "#e52662";
	    ftColor = "white";
	    isToggled = 1;
	} else {
	    bgColor = "white";
	    ftColor = "#e52662";
	    isToggled = 0;
	}
	$("#div-cursor").css({
	    "background-color": bgColor,
	    "color": ftColor,
	});
	setTimeout(toggleCursor, 1500, isToggled);
    };

    // The flipping letters
    if (!String.format) {
	String.format = function(format) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    return format.replace(/{(\d+)}/g, function(match, number) { 
		return typeof args[number] != 'undefined'
		    ? args[number] 
		    : match
		;
	    });
	};
    }

    

    var textForDisplay = "This is my website";
    var i;
    for(i of textForDisplay) {
	$("#p-colorful").append(String.format('<span class="span-color">{0}</span>', i));
    }

    var color="red";
   
    $(".span-color").each(function() {
	$(this).mouseenter(function(){
	    $(this).css({
		"background-color": colors[Math.floor((Math.random() * 4))],
		"display": "inline-block",
		"position": "relative",
		"left": "10px",
		"top": "20px"
	    });
	});
    });

});
