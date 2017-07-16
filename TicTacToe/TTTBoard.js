/**
 * This is the view of the TicTacToe game
 */

function TTTBoard() {
	this.__canvas = $(document.createElement("canvas"));
	this.__canvas.attr("class", "TTTCanvas");

	this.get_canvas = function () {
		return this.__canvas;
	};

	this.__testDiv = $(document.createElement("div"));
	this.__testDiv.html("lalal");
	this.get_div = function() {
		return this.__testDiv;
	};
	
}
