
/* TicTacToe Game control */
$(new function() {
	
	/******* Constants *******/
	/**
	 * Player's piece. 
	 */
	const PLAYER_PIECE = Piece.X;
	/**
	 * AI's piece.
	 */
	const AI_PIECE = Piece.O;
	
	/******* Properties *******/
	/**
	 * Who plays first. Default is player
	 */
	this.__firstPiece = PLAYER_PIECE;
	/**
	 * Model of the game. Default is Player moves first 
	 */
	this.__model = new TTTModel(this.__firstPiece, PLAYER_PIECE);
	

	this.__board = new TTTBoard();

	/******* Methods *******/
	
		


	let containerDiv = $("#div-TicTacToe");
	containerDiv.append( this.__board.canvas );
	

	
	// Initialize game states
	//reset.apply(this);





	/******* Methods *******/
	/*function reset() {
	 	this.test = "aaaa";
	}*/





});
