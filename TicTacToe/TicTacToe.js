
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
	
	//containerDiv.click(__onCanvasClicked);
	containerDiv.bind("click", {board: this.__board}, __onCanvasClicked);
	// Initialize game states
	//reset.apply(this);





	/******* Methods *******/
	/*function reset() {
	 	this.test = "aaaa";
	}*/

	/**
	 * Handler for the mouse click event 
	 * @param {Object} e - Mouse click event
	 */
	function __onCanvasClicked(e) {
		let xPos = e.pageX - $(this).offset().left;
		let yPos = e.pageY - $(this).offset().top; 

		let board = e.data.board;
		
		let i = Math.floor( xPos*3/board.BOARD_LENGTH );
		let j = Math.floor( yPos*3/board.BOARD_LENGTH );

		
		board.drawPiece(i, j, Piece.O);
	}



});
