/**
 * This is the Gomoku Model
 */
GomokuModel = function fun$Gomoku$GomokuModel() {
}

GomokuModel.prototype = {
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








}
