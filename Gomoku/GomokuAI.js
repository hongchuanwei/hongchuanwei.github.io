/**
 * This is the Gomoku AI
 * @param {GomokuModel} model - model of the game
 */
GomokuAI = function fun$Gomoku$GomokuAI(model) {
    this.__allPatterns = this.__findAllPatterns();
	this.__model = model;
}

GomokuAI.prototype = {
    

    

    /******* Value function related *******/
    /**
     * finds the value of a new placed piece
     */
    __findPosValue = function fun$Gomoku$findPosValue(arr1, arr2, arr3, arr4) {
        var w = 0, u2 = 0, u3 = 0, u4 = 0, c3 = 0, c4 = 0;
        var allArr = [arr1, arr2, arr3, arr4]; // pattern of all directions
        for (var i = 0; i < allArr.length; i++) {
            if (this.__isInArrays(win, allArr[i])) {
                w++;
                continue;
            }
            if (this.__isInArrays(covered4, allArr[i])) {
                c4++;
                continue;
            }
            if (this.__isInArrays(covered3, allArr[i])) {
                c3++;
                continue;
            }
            if (this.__isInArrays(unCovered4, allArr[i])) {
                u4++;
                continue;
            }
            if (this.__isInArrays(unCovered3, allArr[i])) {
                u3++;
                continue;
            }
            if (this.__isInArrays(unCovered2, allArr[i])) {
                u2++;
            }
        }
        return this.__findComboValue(w, u2, u3, u4, c3, c4);
    },

    /**
     * Magic value function
     */
    __findComboValue: function fun$Gomoku$findComboValue(w, u2, u3, u4, c3, c4) {
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

    

    /******* Strategy related *******/
    /**
     * Gets the positions worth exploring. Sacrifice space for time and simplicity,
     * since the matrix is not big. Otherwise, could use object as hashmap.
     */
    __updateCandidatePosMatrix: function fun$Gomoku$upcateCandidateMatrix(i, j, piece) {
		// set the piece down
		this.__placedPosMatrix[i][j] = piece;
		
		// adding new candidates around the placed piece
		for (let di=-this.__ringR; di<=this.__ringR; di++) {
			for (let dj=-this.__ringR; dj<=this.__ringR; dj++) {
				let ii = i+di, jj=j+dj;
				if (ii<0 || ii>=this.__model.get_gridSize || 
					jj<0 || jj>=this.__model.get_gridSize) {
					break;
				}
				let isCandidate = this.__placedPosMatrix[ii][jj]!==GomokuPiece.None ? 0 : 1;
				this.__candidatePosMatrix[ii][jj] = isCandidate;
			}
		}
	},
    
	/**
     * Recovers the positions worth exploring for backtracking purpose.
     */
	__recoverCandidatePosMatrix: function fun$Gomoku$recoverCandidatePosMatrix(i, j) {
		// remove the piece
		this.__placedPosMatrix[i][j] = GomokuPiece.None;
		
		// remove candidates if they are there only because the removed piece
		for (let di=-this.__ringR; di<=this.__ringR; di++) {
			for (let dj=-this.__ringR; dj<=this.__ringR; dj++) {
				let ii = i+di, jj=j+dj;
				if (ii<0 || ii>=this.__model.get_gridSize || 
					jj<0 || jj>=this.__model.get_gridSize) {
					break;
				}
				let isCandidate = 0;
				for (let dk=-this.__ringR; dk<=this.__ringR; dk++) {
					for (let dl=-this.__ringR; dl<=this.__ringR; dl++) {
						let kk=ii+dk, ll=jj+dl;
						if (kk<0 || kk>=this.__model.get_gridSize || 
							ll<0 || ll>=this.__model.get_gridSize) {
							break;
						}
						if (this.__placedPosMatrix[kk][ll] !== GomokuPiece.None) {
							isCandidate = 1;
							break;
						}
					}
				}
				this.__candidatePosMatrix[ii][jj] = isCandidate;
			}
		}
	},
	
	

	__heuristicAlgorithm: function fun$Gomoku$heuristicAlgorithm(i, j, piece) {
		var playerVal = this.__findPosValue(
            this.__getPattern(i, j, 1, 0, piece),
			this.__getPattern(i, j, 0, 1, piece),
			this.__getPattern(i, j, 1, 1, piece),
			this.__getPattern(i, j, 1,-1, piece)
        );
		
		let opponentPiece = this.__model.getOpponent(piece);
		var opponentVal = this.__findPosValue(
			this.__getPattern(i, j, 1, 0, opponentPiece),
			this.__getPattern(i, j, 0, 1, opponentPiece),
			this.__getPattern(i, j, 1, 1, opponentPiece),
			this.__getPattern(i, j, 1,-1, opponentPiece)
        );
		return 2*playerVal + opponentVal;
	},
}
