/**
 * This is the Gomoku board. In charge of drawing.
 * @param {number} boardLength - Size of board in px
 * @param {number} gridSize - Number of grids in board
 */
GomokuBoard = function (boardLength, gridSize) {
    this.__SVGUtility = new SVGUtility();
    this.__ArrayUtility = new ArrayUtility();
    this.__boardLength = boardLength;
    this.__gridSize = gridSize;
}

GomokuBoard.prototype = {
    // SVG element
    __svgGroup: null,
    // Board SVG element
    __board: null,
    // pieces
    __pieces: null,
    // keep track of placed pieces for graphing
    __piecePlaced: [],
    // Constants
    __constants: {
        boardBackgroundClass: "GomokuBoardBackground",
        boardLineClass: "GomokuBoardLine",
        boardBaorderClass: "GomokuBoardBoarder",
        boardDotClass: "GomokuBoardDot",
        pieceBlackHiddenClass: "GomokuPieceBlackHidden",
        pieceWhiteHiddenClass: "GomokuPieceWhiteHidden",
        pieceBlackClass: "GomokuPieceBlack",
        pieceWhiteClass: "GomokuPieceWhite",
        pieceCurrentClass: "GomokuPieceCurrent"
    },

    get_board: function getBoard() {
        return this.__board;
    },

    get_pieces: function getPieces() {
        return this.__pieces;
    },

    /**
     * Add handlers to the click event for all hidden pieces
     * @param {Function} callBackFcn - Event handler
     */
    addPieceListener: function addPieceListener(callBackFcn) {
        for (let i=0; i<this.__gridSize; i++) {
            for (let j=0; j<this.__gridSize; j++) {
                this.__pieces[i][j].addEventListener("click", callBackFcn.bind(null, i, j));
            }
        }
    },
    /**
     * Show the piece
     * @param {number} i - Row index
     * @param {number} j - Column index
     * @param {boolean} isBlack - True if shown as black piece
     */
    showPiece: function showPiece(i, j, isBlack) {
        let prevPieceClass = (isBlack) ? this.__constants.pieceBlackHiddenClass : this.__constants.pieceWhiteHiddenClass;
        this.__pieces[i][j].classList.remove(prevPieceClass);
        let pieceClass = isBlack ? this.__constants.pieceBlackClass : this.__constants.pieceWhiteClass;
        // remove indicating ring from last piece and add it to current piece
        if (this.__piecePlaced.length > 0) {
            let lastPiecePos = this.__piecePlaced[this.__piecePlaced.length-1];
            this.__pieces[lastPiecePos[0]][lastPiecePos[1]].classList.remove(this.__constants.pieceCurrentClass);
        }
        this.__piecePlaced[this.__piecePlaced.length] = [i,j];
        this.__pieces[i][j].classList.add(pieceClass, this.__constants.pieceCurrentClass);
    },
    changePieceColor: function changePieceColor(isBlack) {
        let prevPieceClass = (!isBlack) ? this.__constants.pieceBlackHiddenClass : this.__constants.pieceWhiteHiddenClass;
        let pieceClass = isBlack ? this.__constants.pieceBlackHiddenClass : this.__constants.pieceWhiteHiddenClass;

        for (let i=0; i<this.__gridSize; i++) {
            for (let j=0; j<this.__gridSize; j++) {
                if (this.__pieces[i][j].classList.contains(prevPieceClass)) {
                    this.__pieces[i][j].classList.remove(prevPieceClass);
                    this.__pieces[i][j].classList.add(pieceClass);
                }
            }
        }
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

        // create pieces
        if (!this.__pieces) {
            this.__pieces = this.__ArrayUtility.createArray(this.__gridSize, this.__gridSize);
        }
        let pieceR = stripSize/8*3.7;
        for (let i=0; i<this.__gridSize; i++) {
            let xPos = (i+1)*stripSize;
            for (let j=0; j<this.__gridSize; j++) {
                let yPos = (j+1)*stripSize;
                this.__pieces[i][j] = this.__SVGUtility.createCircle(xPos, yPos,
                    pieceR, this.__constants.pieceBlackHiddenClass);
                this.__board.appendChild(this.__pieces[i][j]);
            }
        }
        return this.__board;
    },
}
