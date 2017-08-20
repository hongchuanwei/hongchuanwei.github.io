/**
 * This is the Gomoku board. In charge of drawing.
 * @param {number} boardLength - Size of board in px
 * @param {number} gridSize - Number of grids in board
 */
GomokuBoard = function fun$Gomoku$GomokuBoard(boardLength, gridSize) {
    this.__SVGUtility = new SVGUtility();
    this.__boardLength = boardLength;
    this.__gridSize = gridSize;
}

GomokuBoard.prototype = {
    // SVG element
    __svgGroup: null,
    // Board SVG element
    __board: null,
    // Constants
    __constants: {
        boardBackgroundClass: "GomokuBoardBackground",
        boardLineClass: "GomokuBoardLine",
        boardBaorderClass: "GomokuBoardBoarder",
        boardDotClass: "GomokuBoardDot",
    },

    /**
     * Returns the SVG element. At least draws the board.
     * @return {SVGElement} The SVG element containing board and pieces
     */
    getSVG: function getSVG() {
        if (!this.__svgGroup) {
            this.__svgGroup = this.__SVGUtility.createSVG(this.__boardLength, this.__boardLength);
        }

        if (!this.__board) {
            this.__svgGroup.appendChild(this.__createBoard());
        }

        return this.__svgGroup;
    },

    /**
     * Returns board.
     * @return {SVGGroupElement} The SVG group element of board
     */
    __createBoard: function createBoard() {
        if (this.__board) { return this.__board; }
        this.__board = this.__SVGUtility.createGroup();

        // the board background
        let rect = this.__SVGUtility.createRectangle(0, 0, this.__boardLength,
            this.__boardLength, this.__constants.boardBackgroundClass);
        this.__board.appendChild(rect);

        // Plot the grid lines
        let stripSize = this.__boardLength/(this.__gridSize+1);
        let startPos = stripSize;
        let endPos = this.__boardLength - stripSize;
        for (let i=0; i<this.__gridSize; i++) {
            let pos = (i+1)*stripSize;
            let hLine = this.__SVGUtility.createLine(startPos, pos, endPos, pos, this.__constants.boardLineClass);
            this.__board.appendChild(hLine);
            let vLine = this.__SVGUtility.createLine(pos, startPos, pos, endPos, this.__constants.boardLineClass);
            this.__board.appendChild(vLine);
        }

        // Plot the boarder
        let gap = stripSize/5;
        let boarder = this.__SVGUtility.createRectangle(startPos-gap, startPos-gap,
            endPos-startPos+2*gap, endPos-startPos+2*gap, this.__constants.boardBaorderClass);
        this.__board.appendChild(boarder);

        // plot the dots. In theory gridSize should be odd number
        let dotR = stripSize/15;
        let dotPos = Math.floor(this.__gridSize/4) * stripSize;
        let dotPosArr = [[startPos + dotPos, startPos + dotPos],
                         [startPos + dotPos, endPos - dotPos],
                         [endPos - dotPos, startPos + dotPos],
                         [endPos - dotPos, endPos - dotPos]];
        if (this.__gridSize%2 === 1) {
            dotPosArr.push([this.__boardLength/2, this.__boardLength/2]);
        }

        for (let i=0; i<dotPosArr.length; i++) {
            let dot = this.__SVGUtility.createCircle(dotPosArr[i][0],dotPosArr[i][1],
                dotR, this.__constants.boardDotClass);
            this.__board.appendChild(dot);
        }
        return this.__board;
    }
}
