// Constants
NUM_GAMES = 2;



$(function() {

	// properties 
	this.gameIdx = 0;
	this.containerDiv = $("#div-container");
	this.carouselLeft = $("#carousel-l");
	this.carouselRight = $("#carousel-r");

	// callback functions 

	//this.initialize();
	
	 

	this.containerDiv.html( this.gameIdx );	

	this.carouselLeft.click(arrowClicked.bind(this,-1));
	this.carouselRight.click(arrowClicked.bind(this,1)); 


	function initialize() {
	}

	function arrowClicked(increment) {
		this.gameIdx += increment;
		this.gameIdx %= NUM_GAMES;
		this.containerDiv.html( this.gameIdx );
	}

});



