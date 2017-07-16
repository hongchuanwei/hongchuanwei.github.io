/**
 * This is the model of the TicTacToe game
 * @param {enum Piece} First piece to be played
 * @param {enum Piece} Piece used by player
 */

function TTTModel (firstPiece, playerPiece) {
	/******* properties *******/
	this.__winningPatterns = [
      0x1c0,   // 0b111 000 000 (row 2)
      0x038,   // 0b000 111 000 (row 1)
      0x007,   // 0b000 000 111 (row 0)
      0x124,   // 0b100 100 100 (col 2)
      0x092,   // 0b010 010 010 (col 1)
      0x049,   // 0b001 001 001 (col 0)
      0x111,   // 0b100 010 001 (diagonal)
      0x054    // 0b001 010 100 (opposite diagonal)
	];
	/**
	 * bit i*3+j=1: position (row i, col j) taken by X; 0 otherwise
	 */
	this.__XPattern = 0;
	/**
	 * bit i*3+j=1: position (row i, col j) taken by O; 0 otherwise
	 */
	this.__OPattern = 0;
	/**
	 * number of piece set
	 */
	this.__nPieceSet = 0;
	/**
	 * Who moves first
	 */
	this.__firstPiece = firstPiece;
	/**
	 * Player's piece
	 */
	this.__playerPiece = playerPiece;
	/**
	 * last piece played
	 */
	this.__lastPiece = null;

	/******* Public methods *******/
	/**
	 * Resets the game state 
	 */
	this.reset = function reset() {
		this.__XPattern = 0;
		this.__OPattern = 0;
		this.__nPieceSet = 0;
		this.__lastPiece = null;
	};

	/**
	 * Get the state of the game
	 * @returns {GameState} State of the game
	 */ 
	this.getGameState = function getGameState() {

		if(this.__lastPiece == Piece.X && this.__isWinner( this.__XPattern) ) {
			return GameState.X_WIN;
		} else if (this.__lastPiece==Piece.O && this.__iWinner( this.__OPattern)) {
			return GameState.O_WIN;
		}
		// no one wins and out of step, then draw
		if( this.__isDraw(this.__XPattern | this.__OPattern) ) return GameState.DRAW;
		// otherwise, game goes on
		return GameState.CONTINUE;
	};

	/**
	 * Get the piece on board
	 * @param {int} i Row index
	 * @param {int} j Column index
	 * @returns {Piece} piece 
	 */
	this.getPiece = function getPiece(i, j) {
		if( i<0 || i>=3 || j<0 || j>=3 ) return Piece.INVALID;
		if( (this.__XPattern >> (i*3 + j)) & 1 == 1) return Piece.X;
		if( (this.__OPattern >> (i*3 + j)) & 1 == 1) return Piece.O;
		return Piece.E;
	};

	/**
	 * Set piece in board
	 * @param {int} i Row index
	 * @param {int} j Column index
	 * @param {Piece} piece Piece to be set
	 * @returns {boolean} true if success, false if fail
	 */
	this.setPiece = function setPiece(i, j, piece) {
		if( piece != this.getNextPiece() ) return false;
		if( i<0 || i>=3 || j<0 || j>=3 ) return false;
		if( this.__nPieceSet >= 9 ) return false;
		if( (this.__XPattern | this.__OPattern) >> (i*3+j) == 1 ) return false;
		
		if(piece == Piece.X) {
			this.__XPattern |= (1 << (i*3 + j) );
		} else {
			this.__OPattern |= (1 << (i*3 + j) );
		}
		
		this.__lastPiece = piece;
		this.__nPieceSet++;
		return true;
	};

	/**
	 * get next piece to be placed
	 * returns {Piece} next piece to be placed
	 */
	this.getNextPiece = function getNextPiece() {
		if( this.__lastPiece == null ) return this.__firstPiece;
		if( this.__lastPiece == Piece.X) return Piece.O;
		if( this.__lastPiece == Piece.O) return Piece.X;
		return Piece.INVALID;
	};

	/******* Private methods *******/
	/**
	 * Determine if a pattern wins the game
	 * @param {int} pattern a pattern
	 * @return {boolean} if this pattern wins the game
	 */
	this.__isWinner = function IsWinner(pattern) {
		for (var i=0; i < this.__winningPatterns.length; i++) {
			var aWinningPattern = this.__winningPatterns[i];
			if ((aWinningPattern & pattern) == aWinningPattern) {
				return true;
			}
		}
		return false;
	};

    /**
	 * Determin if a state is draw
	 * @param pattern all positions taken by pieces
	 * @return if game is a draw
	 */
	this.__isDraw = function IsDraw(allPattern) {
		if(allPattern == 0b111111111) {
			return true;
		} else {
			return false;
		}
	};
}
