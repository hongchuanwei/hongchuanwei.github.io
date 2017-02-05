$(document).ready( function() {
  
    var index;
    
    $("#a_nav_publications").css({
	"background-color": NAV_BG_COLOR_SELECTED,
	"color": "white"
    });

    $(".div_bibtex" ).each( function(index) {
	$(this).attr("id", "div_bibtex"+index);
    });

    $(".btn_bibtex").each( function(index) {
	$(this).attr("id", "btn_bibtex"+index);
    });
    
    $( ".btn_bibtex" ).each(function( index ) {
	$( "#btn_bibtex"+index ).click( function() {
	    $( "#div_bibtex"+index ).slideToggle();
	});
    });

    $('[data-toggle="tooltip"]').tooltip({html:true});   

});
