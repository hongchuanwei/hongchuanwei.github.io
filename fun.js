
// window.gameIdx = 0; // index of game to be shown

$(document).ready(function() {
	
	this.gameIdx = 0;
	
	$("#div-middle-top").html(this.gameIdx); 
	
	$("#carousel-l").click(leftArrowClicked.bind(this,-1));
	$("#carousel-r").click(leftArrowClicked.bind(this,1));
	
	function leftArrowClicked(increment) {
		this.gameIdx += increment;
		$("#div-middle-top").html(this.gameIdx); 
	}

});


