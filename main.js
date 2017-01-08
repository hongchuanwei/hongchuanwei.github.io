$(document).ready(function(){
    $("#a_LI").hover(
	function(){
            $(this).css({
		"color": LI_COLOR,
	    })
	},
	function(){
	    $(this).css({
		"color": "black",
	    })
	}
    );
});

var LI_COLOR = "rgb(0,127,176)";

