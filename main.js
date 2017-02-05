var LI_COLOR = "rgb(0,127,176)";   // LinkedIn color
var FB_COLOR = "rgb(57, 90, 147)"; // Facebook color
var TT_COLOR = "rgb(0, 162, 236)"; // Twitter color
var GP_COLOR = "rgb(223, 66, 60)"; // Google plus color
var WB_TEXT = "&title=Hongchuan's website";
var TT_TEXT = "&amp;text=Hongchuan's%20website%20&amp;hashtags=hongchuanwebsite";
var FB_TEXT = "&description=Hongchuan's website";
var SHARE_BTN_DEFAULT_COLOR = "gray";
var NAV_BG_COLOR_SELECTED = "rgb(199,0,57)";
var NAV_BG_COLOR_DEFAULT = "rgb(34,34,34)";
var NAV_FONT_COLOR_DEFAULT = "rgb(157, 157, 157)";

$(document).ready(function(){
    // insert current url to share buttons
    var url = window.location.href;
    var pathname = window.location.pathname;

    $("#a_weibo").attr("href", "http://service.weibo.com/share/share.php?url=" + url + WB_TEXT);
    $("#a_twitter").attr("href", "https://twitter.com/share?url=" + url + TT_TEXT);
    $("#a_google_plus").attr("href","https://plus.google.com/share?url="
			     + "http%3A%2F%2F" + "hongchuanwei.com"
			     + pathname + "%3Fa%3Db%26c%3Dd");
    $("#a_facebook").attr("href", "http://www.facebook.com/sharer.php?u=" + url + FB_TEXT);

    // weibo hover effect
    $("#i_weibo").hover(
	function(){ $(this).attr("src", "imgs/weibo-color-128.png") },
	function(){ $(this).attr("src", "imgs/weibo-gray-32.png") }
    );
    
    // fb hover effect
    $("#i_facebook").hover(
	function(){ $(this).css({"color": FB_COLOR}) },
	function(){ $(this).css({"color": SHARE_BTN_DEFAULT_COLOR}) }
    );

    // twitter hover effect
    $("#i_twitter").hover(
	function(){ $(this).css({"color": TT_COLOR}) },
	function(){ $(this).css({"color": SHARE_BTN_DEFAULT_COLOR}) }
    );

    // google plus hover effect
    $("#i_google_plus").hover(
	function(){ $(this).css( {"color": GP_COLOR} ) },
	function(){ $(this).css( {"color": SHARE_BTN_DEFAULT_COLOR} ) }
    );
        
});



