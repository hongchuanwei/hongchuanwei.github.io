/**
 * This is the AI of the TicTacToe game
 */

class TTTAI {


	/******* constructor *******/
	constructor(model) {
		this.MIN_SCORE = -20;
		this.MAX_SCORE = 20;
	}

	/******* methods *******/
	/**
	 * AI interface
	 * @param model TTTModel model of the game
	 */
	bestMove(model) {
		let pos = this.__randomAlgorithm(model);
		return pos;
	}

	/**
	 * Random algorithm, assumes X goes first
	 * @param model TTTModel model of the game
	 * @return Pos position object
	 *   6 | 7 | 8
	 *  -----------
	 *   3 | 4 | 5
	 *  -----------
	 *   0 | 1 | 2
	 */  
	__randomAlgorithm (model) {
		let XPattern = model.getXPattern();
		let OPattern = model.getOPattern();
		let numPiece = model.getNumPiecePlayed();

		let allPattern = XPattern | OPattern;
		if( allPattern >= 0b111111111 ) { return -1; } // board is full
		// get a random position

		let numEmpty = 9 - numPiece;

		let numPos = Math.floor(Math.random() * numEmpty + 1);
		let movingBit = 1;
		let pos = 0;
		while( numPos > 0 ) {
			if( ( movingBit & allPattern ) == 0 ) { numPos--; }
			movingBit = movingBit << 1;
			pos += 1;
		}
		return this.__convertPosToXY(pos-1);
	}
	
	/**
	 * Converts position to x y object
	 * @param pos position of piece: 0~8
	 * @return posObj position object
	 */
	__convertPosToXY(pos) {
		let posObj = {};
		posObj.xPos = Math.floor(pos/3);
		posObj.yPos = pos % 3;
		return posObj;
	} 
	
}
