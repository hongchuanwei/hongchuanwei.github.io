/**
 * This is the AI of the TicTacToe game
 */

class TTTAI {


	/******* constructor *******/
	/**
     * @param model TTTModel model of the game
	 */
	constructor(model) {
		this.MIN_SCORE = -20;
		this.MAX_SCORE = 20;
		this.__model = model;
	}

	/******* methods *******/
	/**
	 * AI interface
	 */
	bestMove() {
		//let pos = this.__randomAlgorithm();
		//let pos = this.__miniMaxAlgorithm();
		let pos = this.__miniMaxAlgorithmDepth();
		return pos;
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

	/**
	 * @param integers
	 * @return the max value in the array of integers
	 */
	__maxValue(integers) {
		let max = integers[0];

		for (let i = 0; i < integers.length; i++) {
			if (integers[i] > max) {
				max = integers[i];
			}
		}
		return max;
	}

	/**
	 * @param integers
	 * @return the min value in the array of integers
	 */
	__minValue(integers) {
		let min = integers[0];
		for (let i = 0; i < integers.length; i++) {
			if (integers[i] < min) {
				min = integers[i];
			}
		}
		return min;
	}

	/**
	 * Random algorithm, assumes X goes first
	 * @return Pos position object
	 *   6 | 7 | 8
	 *  -----------
	 *   3 | 4 | 5
	 *  -----------
	 *   0 | 1 | 2
	 */  
	__randomAlgorithm () {
		let model = this.__model;
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
	 * MiniMax algorithm, AI plays O
	 * @return Pos position object
	 */
	__miniMaxAlgorithm() {
		let model = this.__model;
		let XPattern = model.getXPattern();
		let OPattern = model.getOPattern();

		let allPattern = XPattern | OPattern;
		let movingBit = 1;
        let maxScore = -Number.MAX_VALUE;
		let pos = 1;
		let bestPos = -1;
		// get all moves scores for pos not set
		for(let i =0; i<9; i++) {
			if( (allPattern & movingBit) == 0 ) {
				let score = this.__getScore( XPattern, OPattern | movingBit, true);
		
				if(score > maxScore ) {
					maxScore = score;
					bestPos = pos;
				}
			}
			movingBit = movingBit << 1;
			pos ++;
		}
		return this.__convertPosToXY(bestPos - 1);
	}
	
	/**
	 * Helper function that gets the score of a single move, AI is O
	 * @param XPattern Positions taken by X: bit i*3+j = 1 : position row i col j taken by X, 0 otherwise
	 * @param OPattern Positions taken by O: bit i*3+j = 1 : position row i col j taken by O, 0 otherwise
	 * @param Xturn if current move is made by X
	 * @return score by current move
	 */
	__getScore(XPattern, OPattern, Xturn) {
		// base cases
		
		let model = this.__model;
		
		if( model.isWinner(XPattern)) { return this.MIN_SCORE; }
		if( model.isWinner(OPattern)) { return this.MAX_SCORE; }
		if( model.isDraw( XPattern|OPattern )) { return 0; }
		
		let allPattern = XPattern | OPattern;
		let movingBit = 1;
        let scores = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		// get all moves scores for pos not set
		for(let i =0; i<9; i++) {
			if( (allPattern & movingBit) == 0 ) {
				// update score
				if(Xturn) {
					scores[i] = this.__getScore( XPattern | movingBit, OPattern, false);
				} else {
					scores[i] = this.__getScore( XPattern, OPattern | movingBit, true);
				}
			}
			movingBit = movingBit << 1;
		}

		if(Xturn) {
			return this.__minValue( scores );
		} else {
			return this.__maxValue( scores );
		}
	}

	/**
	 * MiniMax algorithm, AI plays O
	 * @return position object
	 */
	__miniMaxAlgorithmDepth() {
		let model = this.__model;
		let XPattern = model.getXPattern();
		let OPattern = model.getOPattern();

		let allPattern = XPattern | OPattern;
		let movingBit = 1;
        let maxScore = -Number.MAX_VALUE;
		let pos = 1;
		let bestPos = -1;
		// get all moves scores for pos not set
		for(let i =0; i<9; i++) {
			if( (allPattern & movingBit) == 0 ) {
				let score = this.__getScoreDepth( XPattern, OPattern|movingBit, true, 0);
				if(score > maxScore ) {
					maxScore = score;
					bestPos = pos;
				}
			}
			movingBit = movingBit << 1;
			pos ++;
		}
		return this.__convertPosToXY(bestPos-1);
	}

	/**
	 * Helper function that gets the score of a single move, AI is O
	 * @param XPattern Positions taken by X: bit i*3+j = 1 : position row i col j taken by X, 0 otherwise
	 * @param OPattern Positions taken by O: bit i*3+j = 1 : position row i col j taken by O, 0 otherwise
	 * @param Xturn if current move is made by X
	 * @param depth depth of iterations, longer is better
	 * @return score by current move
	 */
	__getScoreDepth(XPattern, OPattern, Xturn, depth) {

		let model = this.__model;

		// base cases
		if(model.isWinner(XPattern)) { return this.MIN_SCORE + depth; }
		if(model.isWinner(OPattern)) { return this.MAX_SCORE - depth; }
		if(model.isDraw( XPattern|OPattern )) { return depth; }
		
		let allPattern = XPattern | OPattern;
		let movingBit = 1;
        let scores = new Array(9).fill(0);
		// get all moves scores for pos not set
		for(let i =0; i<9; i++) {
			scores[i] = Xturn ? Number.MAX_VALUE : -Number.MIN_VALUE;
			if( (allPattern & movingBit) == 0 ) {
				// update score
				if(Xturn) {
					scores[i] = this.__getScoreDepth( XPattern | movingBit, OPattern, false, depth++);
				} else {
					scores[i] = this.__getScoreDepth( XPattern, OPattern | movingBit, true, depth++);
				}
			}
			movingBit = movingBit << 1;
		}

		if(Xturn) {
			return this.__minValue( scores );
		} else {
			return this.__maxValue( scores );
		}
	}
}
