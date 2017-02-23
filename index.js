
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
			bgColor = "transparent";
			ftColor = "#e52662";
			isToggled = 0;
		}
		$("#div-cursor").css({
			"background-color": bgColor,
			"color": ftColor,
		});
		setTimeout(toggleCursor, 1500, isToggled);
    };
	
	drawDescription();

	bounceBubbles();

});
