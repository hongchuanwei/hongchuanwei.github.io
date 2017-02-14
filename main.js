// footer colors and constants
var SN_COLOR = [
    "rgb(213, 43, 42)", // weibo color
    "rgb(0, 162, 236)", // twitter color
    "rgb(223, 66, 60)", // google color
    "rgb(57, 90, 147)", // facebook color
];
var FOOTER_COLOR = "rgb(238, 238, 238)";
var WB_TEXT = "&title=Hongchuan's website";
var TT_TEXT = "&amp;text=Hongchuan's%20website%20&amp;hashtags=hongchuanwebsite";
var FB_TEXT = "&description=Hongchuan's website";
var SHARE_BTN_DEFAULT_COLOR = "gray";
// navigator colors
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
    if(url==="http://hongchuanwei.com/"){
	$("#fb-like").attr("data-href", url + "index.html");
    }
    
    

    // span hover effect
    $(".div-share a span").each(function(index){
	var tmpColor = SN_COLOR[index];
	$(this).hover(
	    function(){
		$(this).children().css({"color": "white"}); // the icon is the only child
		$(this).css({"background-color": tmpColor})
	    },
	    function(){
		$(this).children().css({"color": SHARE_BTN_DEFAULT_COLOR}); 
		$(this).css({"background-color": FOOTER_COLOR})
	    }
	);
    });

});



