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
		this.O_STROKE_STYPE = "rgb(255, 219, 183)";
		this.ANIMATION_DURATION = 300;
		this.__canvas = $(document.createElement("canvas")); // jquery object
		this.__canvas.addClass("canvas-TicTacToe");
		this.__canvas.attr({width: this.BOARD_LENGTH, height: this.BOARD_LENGTH});

		this.__ctx = this.__canvas.get(0).getContext("2d");
		this.__ctx.font = "60px Arial";

		this.__drawWell();
	}


	/******* Methods *******/
	/**
	 * Getter of canvas
	 * @return {jQuery Object} Canvas object
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
	 * Game end animation
	 * @param {TTTEnum.GameState} gameState - State of game
	 */
	playGGAnimation(gameState) {
		if (gameState === GameState.DRAW) {
			this.__ctx.clearRect(0, 0, this.__canvas.get(0).width, this.__canvas.get(0).height);
			this.__drawX(this.BOARD_LENGTH/4 - this.BOARD_LENGTH/6, this.BOARD_LENGTH/4);
			setTimeout(function() {
				this.__drawO(this.BOARD_LENGTH/4*3 - this.BOARD_LENGTH/6, this.BOARD_LENGTH/4);
				setTimeout(function() {
					this.__ctx.fillText("Draw!", 150, this.BOARD_LENGTH/4*3);
				}.bind(this), this.ANIMATION_DURATION);
			}.bind(this), this.ANIMATION_DURATION+50);
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
		this.__drawLine(x0, y0, x1, y1, this.PIECE_LINE_WIDTH, this.X_STROKE_STYPE,  this.ANIMATION_DURATION/2);
		setTimeout(function(){
			x0 = this.BOARD_LENGTH*5/18 + xPos;
			y0 = this.BOARD_LENGTH/3/6 + yPos;
			x1 = this.BOARD_LENGTH/3/6 + xPos;
			y1 = this.BOARD_LENGTH*5/18 + yPos;
			this.__drawLine(x0, y0, x1, y1, this.PIECE_LINE_WIDTH, this.X_STROKE_STYPE,  this.ANIMATION_DURATION/2);
		}.bind(this), this.ANIMATION_DURATION/2)
	}

	/**
	 * Draws piece O
	 * @param {number} xPos - X position of top left corner of piece
	 * @param {number} yPos - Y position of top left corner of piece
	 */
	__drawO(xPos, yPos) {
		let x = this.BOARD_LENGTH/6 + xPos;
		let y = this.BOARD_LENGTH/6 + yPos;
		let r = this.BOARD_LENGTH/9;
		this.__drawArc(x, y, r, 0, -2*Math.PI, true, this.PIECE_LINE_WIDTH, this.O_STROKE_STYPE, this. ANIMATION_DURATION);
	}

	/**
	 * Draws a line with duration
	 * @param {number} x0 - start x position of line
	 * @param {number} y0 - start y position of line
	 * @param {number} x1 - end x position of line
	 * @param {number} y1 - end y position of line
	 * @param {number} lineWidth - Line width
	 * @param {string} strokeStyle - stroke style
	 * @param {number} duration - duration in miliseconds
	 */
	__drawLine(x0, y0, x1, y1, lineWidth, strokeStyle, duration) {
		let start = new Date().getTime();
		let end = start + duration;
		let ctx = this.__ctx;
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;

		let step = function () {
			let timestamp = new Date().getTime();
			let progress = Math.min((duration - (end - timestamp)) / duration, 1);
			let x2 = (x1 - x0)*progress + x0;
			let y2 = (y1 - y0)*progress + y0;

			ctx.beginPath();
			ctx.moveTo(x0, y0);
			ctx.lineTo(x2, y2);
			ctx.stroke();

			if (progress < 1) { requestAnimationFrame(step); }
		};

		step();
	}

	/**
	 * Draws an arc with duration
	 * @param {number} x - The x-coordinate of the center of the circle
	 * @param {number} y - The y-coordinate of the center of the circle
	 * @param {number} r - The radius of the circle
	 * @param {number} sAngle - The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
	 * @param {number} eAngle - The end angle, in radians
	 * @param {boolean} counterclockwise - Specifies whether the drawing should be counterclockwise or clockwise.
	 *                                     False indicates clockwise, while true indicates counter-clockwise.
	 * @param {number} lineWidth - Line width
	 * @param {string} strokeStyle - stroke style
	 * @param {number} duration - duration in miliseconds
	 */
	__drawArc(x, y, r, sAngle, eAngle, counterclockwise, lineWidth, strokeStyle, duration) {
		let start = new Date().getTime();
		let end = start + duration;
		let ctx = this.__ctx;
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;

		let step = function () {
			let timestamp = new Date().getTime();
			let progress = Math.min((duration - (end - timestamp)) / duration, 1);

			let mAngle = (eAngle - sAngle)*progress + sAngle;
			ctx.beginPath();
			ctx.arc(x, y, r, sAngle, mAngle, counterclockwise);
			ctx.stroke();
			if (progress < 1) { requestAnimationFrame(step); }
		};
		step();
	}
}
