/**
 * This is the Gomoku AI
 */
GomokuAI = function fun$Gomoku$GomokuAI() {
    this.__allPatterns = this.__findAllPatterns();

}

GomokuAI.prototype = {
    // patterns of interest. 1 - tabke by us; 0 not taken; -1 - taken by opponent
    __pattern: {
        "win": [ [1,1,1,1,1] ],
        "unCovered4": [ [0, 1, 1, 1, 1, 0] ],
        "unCovered3": [ [0, 1, 1, 1, 0, 0],
                        [0, 0, 1, 1, 1, 0],
                        [0, 1, 0, 1, 1, 0],
                        [0, 1, 1, 0, 1, 0] ],
        "unCovered2": [ [0, 0, 1, 1, 0, 0],
                        [0, 1, 0, 1, 0, 0],
                        [0, 0, 1, 0, 1, 0],
                        [0, 1, 1, 0, 0, 0],
                        [0, 0, 0, 1, 1, 0],
                        [0, 1, 0, 0, 1, 0] ],
        "covered4":   [ [-1, 1, 0, 1, 1, 1],
                        [-1, 1, 1, 0, 1, 1],
                        [-1, 1, 1, 1, 0, 1],
                        [-1, 1, 1, 1, 1, 0],
                        [0, 1, 1, 1, 1, -1],
                        [1, 0, 1, 1, 1, -1],
                        [1, 1, 0, 1, 1, -1],
                        [1, 1, 1, 0, 1, -1] ],
        "covered3":   [ [-1, 1, 1, 1, 0, 0],
                        [-1, 1, 1, 0, 1, 0],
                        [-1, 1, 0, 1, 1, 0],
                        [0, 0, 1, 1, 1, -1],
                        [0, 1, 0, 1, 1, -1],
                        [0, 1, 1, 0, 1, -1],
                        [-1, 1, 0, 1, 0, 1, -1],
                        [-1, 0, 1, 1, 1, 0, -1],
                        [-1, 1, 1, 0, 0, 1, -1],
                        [-1, 1, 0, 0, 1, 1, -1] ],
    },

    // all the patterns including those for the opponent
    __allPatterns: null,

    /******* Value function related *******/
    /**
     * Helper function that makes pattern for the opponent
     */
    __findAllPatterns: function fun$Gomoku$findAllPatterns() {
        let allPatterns = [this.__pattern.win, this.__pattern.unCovered4,
            this.__pattern.unCovered3, this.__pattern.unCovered2,
            this.__pattern.covered4, this.__pattern.covered3];
        for (let k = 0; k < allPatterns.length; k++) {
            let temp = [];
            for (let j = 0; j < allPatterns[k].length; j++) {
                var tmp = [];
                for (var i = 0; i < allPatterns[k][j].length; i++) {
                    tmp[i] = -allPatterns[k][j][i];
                }
                temp.push(tmp);
            }
            for (var m = 0; m < temp.length; m++) {
                allPatterns[k].push(temp[m]);
            }
        }
        return allPatterns;
    },

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

    /**
     * Helper function that finds one array in another array. Maybe change to KMP
     */
    __isInArray: function fun$Gomoku$isInArray(arr, inArr) {
        var fCount = arr.length;
        var sCount = inArr.length;
        var k;
        for (var i = 0; i <= fCount - sCount; i++) {
            k = 0;
            for (var j = 0; j < sCount; j++) {
                if (arr[i + j] == inArr[j]) k++;
                else break;
            }
            if (k == sCount) return true;
        }
        return false;
    },

    /**
     * Helper function that finds if an array is in another list of arrays
     */
    __isInArrays: function fun$Gomoku$isInArrays(combos, arr) {
        for (var i = 0; i < combos.length; i++) {
            if (this.__isInArray(arr, combos[i])) { return true; }
        }
        return false;
    },

    /******* Strategy related *******/
    /**
     * Gets the positions worth exploring. Sacrifice space for time and simplicity,
     * since the matrix is not big. Otherwise, could use object as hashmap.
     */
    __updateCandidatePosMatrix: function fun$Gomoku$upcateCandidateMatrix(i, j) {
        // Remove the new placed piece
        if (this.__candidates[i][j] === 1) {
            this.__candidates[i][j] = 0;
        }

        // Update candidates in the ring of the new placed piece
        var children = [];
        var candidates = [];
        // Find the candidates around already placed pieces!
        for (var i = 0; i < cellsCount; i++) {
          for (var j = 0; j < cellsCount; j++) {
            if (parent[i][j] != 0) { // if ocupied
              for (var k = i - ring; k <= i + ring; k++) {
                for (var l = j - ring; l <= j + ring; l++) {
                  if (k >= 0 && l >= 0 && k < cellsCount && l < cellsCount) { // is there repeated computation here?
                    if (parent[k][l] == 0) {
                      var curPoint = [k, l]; // [x, y]
                      var flag = isAllSatisfy(candidates, curPoint[0], curPoint[1]);
                      if (flag) candidates.push(curPoint);
                    }
                  }
                }
              }
            }
          }
        }

        return children;
      };

}
