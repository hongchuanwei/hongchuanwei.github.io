$(document).ready( function() {
  
    var index;
    
    $("#a_nav_publications").css({
	"background-color": NAV_BG_COLOR_SELECTED,
	"color": "white"
    });

   
    $( ".btn_bibtex" ).each(function( index ) {
	$( "#btn_bibtex"+(index+1) ).click( function() {
	    $( "#div_bibtex"+(index+1) ).slideToggle();
	});
    });

});
