/**
 * This is the view of the TicTacToe game
 */

class TTTBoard {


	/******* constructor *******/
	constructor() {
		this.BOARD_LENGTH = 450; // board length in pixel
		this.WELL_LINE_WIDTH = 10;
		this.WELL_STROKE_STYLE = "rgba(166, 166, 166, 0.7)"; // gray
		this.PIECE_LINE_WIDTH = 10;
		this.X_STROKE_STYPE = "rgba(255, 80, 80, 0.7)";
		this.O_STROKE_STYPE = "rgba(255, 204, 153, 0.7)";
		this.__canvas = $(document.createElement("canvas")); // jquery object
		this.__canvas.attr({width: this.BOARD_LENGTH, height: this.BOARD_LENGTH});

		this.__ctx = this.__canvas.get(0).getContext("2d");
		this.__drawWell();
	}


	/******* Methods *******/
	/**
	 * Getter of canvas
	 * returns {jQuery Object} Canvas object
	 */
	get canvas() {
		return this.__canvas;
	}

	/**
	 * reset board
	 */
	reset() {
		this.__ctx.clearRect(0, 0, this.__canvas.get(0).width, this.__canvas.get(0).height);
		this.__drawWell();
	}
	/**
	 * Draw a piece at ith row and jth column
	 * @param {number} i - Row index
	 * @param {number} j - Column index
	 * @param {Piece} piece - Type of piece
	 */
	drawPiece(i, j, piece) {
		if (i<0 || i>=3 || j<0 || j>=3) { return; }
		let xPos = this.BOARD_LENGTH/3*i;
		let yPos = this.BOARD_LENGTH/3*j;
		switch (piece) {
			case Piece.X:
			    this.__drawX(xPos, yPos);
			    break;
			case Piece.O:
			    this.__drawO(xPos, yPos);
			    break;
			default:
			    break;
		}
	}
	/**
	 * blur the canvas
	 */
	blurCanvas() {
		this.__canvas.addClass("div-Canvas-Blur");
	}
	/**
	 * Draw the # in board
	 */
	__drawWell() {
		let ctx = this.__ctx;
		ctx.lineWidth = this.WELL_LINE_WIDTH;
		ctx.strokeStyle = this.WELL_STROKE_STYLE;
		ctx.beginPath();
		// horizontal lines
		for (let i=1; i<3; i++) {
			ctx.moveTo(0, this.BOARD_LENGTH/3*i);
			ctx.lineTo(this.BOARD_LENGTH, this.BOARD_LENGTH/3*i);
		}
		// vertical lines
		for (let i=1; i<3; i++) {
			ctx.moveTo(this.BOARD_LENGTH/3*i, 0);
			ctx.lineTo(this.BOARD_LENGTH/3*i, this.BOARD_LENGTH);
		}
		ctx.stroke();
	}


	/**
	 * Draws piece X
	 * @param {number} xPos - X position of top left corner of piece
	 * @param {number} yPos - Y position of top left corner of piece
	 */
	__drawX(xPos, yPos) {
		let ctx = this.__ctx;

		ctx.translate(xPos, yPos);
		ctx.lineWidth = this.PIECE_LINE_WIDTH;
		ctx.strokeStyle = this.X_STROKE_STYPE;
		ctx.beginPath();
		ctx.moveTo(this.BOARD_LENGTH/3/6, this.BOARD_LENGTH/3/6);
		ctx.lineTo(this.BOARD_LENGTH*5/18, this.BOARD_LENGTH*5/18);
		ctx.moveTo(this.BOARD_LENGTH/3/6, this.BOARD_LENGTH*5/18);
		ctx.lineTo(this.BOARD_LENGTH*5/18, this.BOARD_LENGTH/3/6);
		ctx.stroke();
		ctx.translate(-xPos, -yPos);
	}
	/**
	 * Draws piece O
	 * @param {number} xPos - X position of top left corner of piece
	 * @param {number} yPos - Y position of top left corner of piece
	 */
	__drawO(xPos, yPos) {
		let ctx = this.__ctx;

		ctx.translate(xPos, yPos);
		ctx.lineWidth = this.PIECE_LINE_WIDTH;
		ctx.strokeStyle = this.O_STROKE_STYPE;
		ctx.beginPath();

		ctx.arc(this.BOARD_LENGTH/6, this.BOARD_LENGTH/6, this.BOARD_LENGTH/9,
				0, 2*Math.PI);

		ctx.stroke();
		ctx.translate(-xPos, -yPos);
	}
}
