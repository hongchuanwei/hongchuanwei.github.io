// Constants
var GAME_URL = [
	"TicTacToe/TicTacToe.html",
	"Gomoku/Gomoku.html"
];
var NUM_GAMES = GAME_URL.length;

$(function() {

	// properties
	this.gameIdx = 0;
	this.containerDiv = $("#div-container");
	this.carouselLeft = $("#carousel-l");
	this.carouselRight = $("#carousel-r");


	this.containerDiv.load(GAME_URL[this.gameIdx]);

	this.carouselLeft.click(arrowClicked.bind(this,-1));
	this.carouselRight.click(arrowClicked.bind(this,1));


	function arrowClicked(increment) {
		this.gameIdx += increment;
		this.gameIdx = ((this.gameIdx % NUM_GAMES) + NUM_GAMES) % NUM_GAMES; // fix for js module
		this.containerDiv.load(GAME_URL[this.gameIdx]);
	}

});
