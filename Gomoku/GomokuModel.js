/**
 * This is the Gomoku Model
 */
GomokuPiece = {
    "Black": 1,
    "White": -1,
    "None": 0
}

GomokuModel = function fun$Gomoku$GomokuModel(playerPiece, gridSize) {
    this.__playerPiece = playerPiece;
    this.__gridSize = gridSize;
    this.__ArrayUtility = new ArrayUtility();
}

GomokuModel.prototype = {
    // last placed piece
    __lastPiece: null,


    initialize: function fun$GomokuModel$initiate() {
        this.__placedPosMatrix = this.__ArrayUtility.createArray(this.__gridSize, this.__gridSize);
        for (let i=0; i<this.__gridSize; i++) {
            for (let j=0; j<this.__gridSize; j++) {
                this.__placedPosMatrix[i][j] = GomokuPiece.None;
            }
        }
    },
    /**
     * Resets the game
     */
    reset: function fun$GomokuModel$reset() {
        this.__playerPiece = GomokuPiece.Black;
        this.__lastPiece = null;

        this.__placedPosMatrix = this.__ArrayUtility.createArray(this.__gridSize, this.__gridSize);
        for (let i=0; i<this.__gridSize; i++) {
            for (let j=0; j<this.__gridSize; j++) {
                this.__placedPosMatrix[i][j] = GomokuPiece.None;
            }
        }
    },

    /**
     * Gets the size of the board
     */
    get_gridSize: function fun$GomokuModel$getGridSize() {
        return this.__gridSize;
    },

    /**
     * Gets the game size
     */
    get_gameSize: function fun$GomokuModel$getGameSize() {
        return 5;
    },

    /**
     * Gets opponent's piece
     */
    getOpponent: function fun$GomokuModel$getOpponent(piece) {
        if (piece === GomokuPiece.Black) { return GomokuPiece.White; }
        if (piece === GomokuPiece.White) { return GomokuPiece.Black; }
        return GomokuPiece.None;
    },

    /**
     * Sets piece at [i, j]
     */
    setPiece: function fun$GomokuModel$setpiece(i, j, piece) {
        if (this.__placedPosMatrix[i][j] !== GomokuPiece.None) { return false; }
        if (this.__lastPiece && piece === this.__lastPiece) { return false; }
        this.__placedPosMatrix[i][j] = piece;
        this.__lastPiece = piece;
    },

    /**
     * Find if wins by placing piece at [i, j]
     */
    isWinner: function fun$GomokuModel$isWinner(i, j, piece) {
        let patterns = [this.__getPattern(i, j, 1, 0, piece),
            this.__getPattern(i, j, 0, 1, piece),
            this.__getPattern(i, j, 1, 1, piece),
            this.__getPattern(i, j, 1, -1, piece)];
        for (let i=0; i<patterns.length; i++) {
            if (this.__ArrayUtility.isAnyArraysInArray(this.__patterns.win, patterns[i])) {
                return true;
            }
        }
        return false;
    },

    /**
     * Get pattern in one of four directions. Need to look forward and backward.
     */
	__getPattern: function fun$GomokuModel$getCombo(i, j, dx, dy, piece) {
		var pattern = [piece];
		var gridSize = this.__gridSize; // board size
		var gameSize = this.__gridSize; // number of pieces to win
		// look in one direction
        for (var m = 1; m < gameSize; m++) {
			var nextX1 = i - dx * m;
			var nextY1 = j - dy * m;
			if (nextX1 >= gridSize || nextY1 >= gridSize || nextX1 < 0 || nextY1 < 0) {
				break;
			}
			var next1 = this.__placedPosMatrix[nextX1][nextY1];
			if (next1 == this.getOpponent(piece)) {
				pattern.unshift(next1); // add before
				break;
			}
			pattern.unshift(next1);
        }
		// look in the other direction
        for (var k = 1; k < gameSize; k++) {
			var nextX2 = i + dx * k;
			var nextY2 = j + dy * k;
			if (nextX2 >= gridSize || nextY2 >= gridSize || nextX2 < 0 || nextY2 < 0) {
				break;
			}
			var next2 = this.__placedPosMatrix[nextX2][nextY2];
			if (next2 == this.getOpponent(piece)) {
				pattern.push(next2); // add after
				break;
			}
			pattern.push(next2);
        }
        return pattern;
	},

    // patterns of interest. 1 - tabke by us; 0 not taken; -1 - taken by opponent
    __patterns: {
        "win": [ [1,1,1,1,1], [-1,-1,-1,-1,-1] ],
        "unCovered4": [ [0, 1, 1, 1, 1, 0], [0, -1, -1, -1, -1, 0] ],
        "unCovered3": [ [0, 1, 1, 1, 0, 0],
                        [0, 0, 1, 1, 1, 0],
                        [0, 1, 0, 1, 1, 0],
                        [0, 1, 1, 0, 1, 0],
                        [0, -1, -1, -1, 0, 0],
                        [0, 0, -1, -1, -1, 0],
                        [0, -1, 0, -1, -1, 0],
                        [0, -1, -1, 0, -1, 0] ],
        "unCovered2": [ [0, 0, 1, 1, 0, 0],
                        [0, 1, 0, 1, 0, 0],
                        [0, 0, 1, 0, 1, 0],
                        [0, 1, 1, 0, 0, 0],
                        [0, 0, 0, 1, 1, 0],
                        [0, 1, 0, 0, 1, 0],
                        [0, 0, -1, -1, 0, 0],
                        [0, -1, 0, -1, 0, 0],
                        [0, 0, -1, 0, -1, 0],
                        [0, -1, -1, 0, 0, 0],
                        [0, 0, 0, -1, -1, 0],
                        [0, -1, 0, 0, -1, 0] ],
        "covered4":   [ [-1, 1, 0, 1, 1, 1],
                        [-1, 1, 1, 0, 1, 1],
                        [-1, 1, 1, 1, 0, 1],
                        [-1, 1, 1, 1, 1, 0],
                        [0, 1, 1, 1, 1, -1],
                        [1, 0, 1, 1, 1, -1],
                        [1, 1, 0, 1, 1, -1],
                        [1, 1, 1, 0, 1, -1],
                        [1, -1, 0, -1, -1, -1],
                        [1, -1, -1, 0, -1, -1],
                        [1, -1, -1, -1, 0, -1],
                        [1, -1, -1, -1, -1, 0],
                        [0, -1, -1, -1, -1, 1],
                        [-1, 0, -1, -1, -1, 1],
                        [-1, -1, 0, -1, -1, 1],
                        [-1, -1, -1, 0, -1, 1] ],
        "covered3":   [ [-1, 1, 1, 1, 0, 0],
                        [-1, 1, 1, 0, 1, 0],
                        [-1, 1, 0, 1, 1, 0],
                        [0, 0, 1, 1, 1, -1],
                        [0, 1, 0, 1, 1, -1],
                        [0, 1, 1, 0, 1, -1],
                        [-1, 1, 0, 1, 0, 1, -1],
                        [-1, 0, 1, 1, 1, 0, -1],
                        [-1, 1, 1, 0, 0, 1, -1],
                        [-1, 1, 0, 0, 1, 1, -1],
                        [1, -1, -1, -1, 0, 0],
                        [1, -1, -1, 0, -1, 0],
                        [1, -1, 0, -1, -1, 0],
                        [0, 0, -1, -1, -1, 1],
                        [0, -1, 0, -1, -1, 1],
                        [0, -1, -1, 0, -1, 1],
                        [1, -1, 0, -1, 0, -1, 1],
                        [1, 0, -1, -1, -1, 0, 1],
                        [1, -1, -1, 0, 0, -1, 1],
                        [1, -1, 0, 0, -1, -1, 1] ],
    },
}
