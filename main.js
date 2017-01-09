var LI_COLOR = "rgb(0,127,176)";   // LinkedIn color
var FB_COLOR = "rgb(57, 90, 147)"; // Facebook color
var TT_COLOR = "rgb(0, 162, 236)"; // Twitter color
var GP_COLOR = "rgb(223, 66, 60)";
$(document).ready(function(){
    // weibo hover effect
    $("#i_weibo").hover(
	function(){ $(this).attr("src", "imgs/weibo-color-128.png") },
	function(){ $(this).attr("src", "imgs/weibo-black-32.png") }
    );
    
    // fb hover effect
    $("#i_facebook").hover(
	function(){ $(this).css({"color": FB_COLOR}) },
	function(){ $(this).css({"color": "black"}) }
    );

    // twitter hover effect
    $("#i_twitter").hover(
	function(){ $(this).css({"color": TT_COLOR}) },
	function(){ $(this).css({"color": "black"}) }
    );

    // google plus hover effect
    $("#i_google_plus").hover(
	function(){ $(this).css({"color": GP_COLOR}) },
	function(){ $(this).css({"color": "black"}) }
    );
});



