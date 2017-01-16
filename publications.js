$(document).ready( function() {
    var iPaper = 1;
    var btnSelector, divSelector;
    $("#a_nav_publications").css({
	"background-color": NAV_BG_COLOR_SELECTED,
	"color": "white"
    });

    /*$("#btn_bibtex1").click( function() {
	$("#div_bibtex1").toggle();
    });*/
    
    for(iPaper = 1; iPaper<=1; iPaper++) {
	btnSelector = "#btn_bibtex" + iPaper;
	divSelector = "#div_bibtex" + iPaper;
	$( btnSelector ).click( function() {
	    $(divSelector).toggle();
	})
    }

});
