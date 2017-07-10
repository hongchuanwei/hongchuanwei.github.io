
/* TicTacToe Game */
$(function() {

	// Properties
	this.__model = new TTTModel(Piece.O);

	// Add event listener
	$("#div-TicTacToe").html(this.__model.getNextPiece());
	
	// Initialize game states
	//reset.apply(this);

	/* Methods */
	/*function reset() {
	 	this.test = "aaaa";
	}*/



});
