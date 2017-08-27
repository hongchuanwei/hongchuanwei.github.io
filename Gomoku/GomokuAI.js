/**
 * This is the Gomoku AI
 * @param {GomokuModel} model - model of the game
 */
GomokuAI = function fun$Gomoku$GomokuAI(model, ringR) {
	this.__model = model;
    this.__isFirstGameMove = (this.__model.get_AIPiece() === GomokuPiece.Black);
    this.__ringR = ringR;
}

GomokuAI.prototype = {
    // keep track of placed
    __candidateMatrix: null,

    initialize: function fun$GomokuAI$initialize() {
        let gridSize = this.__model.get_gridSize();
        this.__candidateMatrix = ArrayUtility.prototype.createArray(gridSize, gridSize);
        for (let i=0; i<gridSize; i++) {
            for (let j=0; j<gridSize; j++) {
                this.__candidateMatrix[i][j] = false;
            }
        }
    },
    /******* Value function related *******/
    /**
     * finds the value of a new placed piece
     */
    __getPosValue: function fun$GomokuAI$getPosValue(arr1, arr2, arr3, arr4) {
        var w = 0, u2 = 0, u3 = 0, u4 = 0, c3 = 0, c4 = 0;
        var allArr = [arr1, arr2, arr3, arr4]; // pattern of all directions
        for (var i = 0; i < allArr.length; i++) {
            if (this.__model.isWin(allArr[i])) {
                w++;
                continue;
            }
            if (this.__model.isCovered4(allArr[i])) {
                c4++;
                continue;
            }
            if (this.__model.isCovered3(allArr[i])) {
                c3++;
                continue;
            }
            if (this.__model.isUnCovered4(allArr[i])) {
                u4++;
                continue;
            }
            if (this.__model.isUnCovered3(allArr[i])) {
                u3++;
                continue;
            }
            if (this.__model.isUnCovered2(allArr[i])) {
                u2++;
            }
        }
        return this.__getComboValue(w, u2, u3, u4, c3, c4);
    },

    /**
     * Magic value function
     */
    __getComboValue: function fun$GomokuAI$findComboValue(w, u2, u3, u4, c3, c4) {
        if (w > 0) return 1000000000;
        if (u4 > 0) return 100000000;
        if (c4 > 1) return 10000000;
        if (u3 > 0 && c4 > 0) return 1000000;
        if (u3 > 1) return 100000;

        if (u3 == 1) {
            if (u2 == 3) return 40000;
            if (u2 == 2) return 38000;
            if (u2 == 1) return 35000;
            return 3450;
        }

        if (c4 == 1) {
            if (u2 == 3) return 4500;
            if (u2 == 2) return 4200;
            if (u2 == 1) return 4100;
            return 4050;
        }

        if (c3 == 1) {
            if (u2 == 3) return 3400;
            if (u2 == 2) return 3300;
            if (u2 == 1) return 3100;
        }

        if (c3 == 2) {
            if (u2 == 2) return 3000;
            if (u2 == 1) return 2900;
        }

        if (c3 == 3) {
            if (u2 == 1) return 2800;
        }

        if (u2 == 4) return 2700;
        if (u2 == 3) return 2500;
        if (u2 == 2) return 2000;
        if (u2 == 1) return 1000;
        return 0;
    },

    /**
     * Let AI get informed with the player's move
     */
    getInformed: function fun$GomokuModel$getInformed(i, j) {
        this.__updateCandidateMatrix(i, j, this.__model.get_placedPosMatrix());
    },

    /******* Strategy related *******/
    /**
     * This is the heuristic algorithm. Returns the next position.
     */
    heuristicAlgorithm: function fun$GomokuAI$heuristicAlgorithm() {
        let bestMove = [];
        let gridSize = this.__model.get_gridSize();
        let AIPiece = this.__model.get_AIPiece();
        let placedPosMatrix = this.__model.get_placedPosMatrix();
        if (this.__isFirstGameMove) {
            //make a move in the center
            this.__isFirstGameMove = false;
            let movePos = Math.floor(gridSize/2);
            bestMove = [movePos, movePos];
        } else {
            let bestScore = -Number.MAX_VALUE;
            for (let i=0; i<gridSize; i++) {
                for (let j=0; j<gridSize; j++) {
                    if (this.__candidateMatrix[i][j]) {
                        let heuristicScore = this.__getScoreHeuristic(i, j, AIPiece);
                        if (heuristicScore > bestScore) {
                            bestScore = heuristicScore;
                            bestMove = [i, j];
                        }
                    }
                }
            }
        }

        // update candidate matrix
        this.__updateCandidateMatrix(bestMove[0], bestMove[1], placedPosMatrix);

        return bestMove;
    },

    /**
     * Get score using heuristic algorithm
     */
    __getScoreHeuristic: function fun$GomokuAI$heuristicScore(i, j, piece) {
		var playerVal = this.__getPosValue(
            this.__model.getPattern(i, j, 1, 0, piece),
			this.__model.getPattern(i, j, 0, 1, piece),
			this.__model.getPattern(i, j, 1, 1, piece),
			this.__model.getPattern(i, j, 1,-1, piece)
        );

		let opponentPiece = this.__model.getOpponent(piece);
		var opponentVal = this.__getPosValue(
			this.__model.getPattern(i, j, 1, 0, opponentPiece),
			this.__model.getPattern(i, j, 0, 1, opponentPiece),
			this.__model.getPattern(i, j, 1, 1, opponentPiece),
			this.__model.getPattern(i, j, 1,-1, opponentPiece)
        );
		return 2*playerVal + opponentVal;
	},

    /**
     * Gets the positions worth exploring. Sacrifice space for time and simplicity,
     * since the matrix is not big. Otherwise, could use object as hashmap.
     */
    __updateCandidateMatrix: function fun$GomokuAI$upcateCandidateMatrix(i, j, placedPosMatrix) {
        this.__candidateMatrix[i][j] = false;
		// adding new candidates around the placed piece
		for (let di=-this.__ringR; di<=this.__ringR; di++) {
			for (let dj=-this.__ringR; dj<=this.__ringR; dj++) {
                if (di===0 && dj===0) { continue; }
				let ii = i+di, jj=j+dj;
				if (ii<0 || ii>=this.__model.get_gridSize() || jj<0 || jj>=this.__model.get_gridSize() ) {
					continue;
				}
				let isCandidate = (placedPosMatrix[ii][jj]===GomokuPiece.None) ? true: false;
				this.__candidateMatrix[ii][jj] = isCandidate;
			}
		}
	},

	/**
     * Recovers the positions worth exploring for backtracking purpose.
     */
	__recoverCandidatePosMatrix: function fun$GomokuAI$recoverCandidatePosMatrix(i, j, placedPosMatrix) {
		// remove the piece
		placedPosMatrix[i][j] = GomokuPiece.None;

		// remove candidates if they are there only because the removed piece
		for (let di=-this.__ringR; di<=this.__ringR; di++) {
			for (let dj=-this.__ringR; dj<=this.__ringR; dj++) {
				let ii = i+di, jj=j+dj;
				if (ii<0 || ii>=this.__model.get_gridSize() || jj<0 || jj>=this.__model.get_gridSize() ) {
					continue;
				}
				let isCandidate = false;
				for (let dk=-this.__ringR; dk<=this.__ringR; dk++) {
					for (let dl=-this.__ringR; dl<=this.__ringR; dl++) {
						let kk=ii+dk, ll=jj+dl;
						if (kk<0 || kk>=this.__model.get_gridSize() ||
							ll<0 || ll>=this.__model.get_gridSize() ) {
							continue;
						}
						if (placedPosMatrix[kk][ll] !== GomokuPiece.None) {
							isCandidate = true;
							break;
						}
					}
				}
				this.__candidateMatrix[ii][jj] = isCandidate;
			}
		}
	},




}
