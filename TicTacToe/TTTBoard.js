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
		this.X_STROKE_STYPE = "rgb(255, 132, 132)";
		this.O_STROKE_STYPE = "rgba(255, 204, 153, 0.7)";
		this.__canvas = $(document.createElement("canvas")); // jquery object
		this.__canvas.addClass("canvas-TicTacToe");
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
		let x0 = this.BOARD_LENGTH/3/6 + xPos;
		let y0 = this.BOARD_LENGTH/3/6 + yPos;
		let x1 = this.BOARD_LENGTH*5/18 + xPos;
		let y1 = this.BOARD_LENGTH*5/18 + yPos;
		this.__drawLine(x0, y0, x1, y1, this.PIECE_LINE_WIDTH, this.X_STROKE_STYPE, 300);
		x0 = this.BOARD_LENGTH*5/18 + xPos;
		y0 = this.BOARD_LENGTH/3/6 + yPos;
		x1 = this.BOARD_LENGTH/3/6 + xPos;
		y1 = this.BOARD_LENGTH*5/18 + yPos;
		this.__drawLine(x0, y0, x1, y1, this.PIECE_LINE_WIDTH, this.X_STROKE_STYPE, 300);
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

	/**
	 * Draws a line with duration
	 */
	__drawLine(x0, y0, x1, y1, lineWidth2, strokeStyle2, duration) {

		let start = new Date().getTime();
		let end = start + duration;
		let ctx = this.__ctx;
		let lastProgress = 0;
		ctx.lineWidth = lineWidth2;
		ctx.strokeStyle = strokeStyle2;

		let step = function () {
			let x2 = (x1 - x0)*lastProgress + x0;
			let y2 = (y1 - y0)*lastProgress + y0;

			let timestamp = new Date().getTime();
			let progress = Math.min((duration - (end - timestamp)) / duration, 1);
			let x3 = (x1 - x0)*progress + x0;
			let y3 = (y1 - y0)*progress + y0;
			lastProgress = progress;

			ctx.beginPath();
			ctx.moveTo(x0, y0);
			ctx.lineTo(x3, y3);
			ctx.stroke();

			if (progress < 1) { requestAnimationFrame(step); }
		}
		step();
	}
}
