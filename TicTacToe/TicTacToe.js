
/* TicTacToe Game control */
$(new function() {

	/******* Constants *******/
	/**
	 * Player's piece.
	 */
	const PLAYER_PIECE = Piece.X;
	/**
	 * AI's piece.
	 */
	const AI_PIECE = Piece.O;

	/******* Properties *******/
	/**
	 * Who plays first. Default is player
	 */
	this.__firstPiece = PLAYER_PIECE;
	/**
	 * Model of the game. Default is Player moves first
	 */
	this.__model = new TTTModel(this.__firstPiece, PLAYER_PIECE);
	/**
	 * View of the game.
	 */
	this.__board = new TTTBoard();
	/**
	 * The container div
	 */
	this.__containerDiv = $("#div-TicTacToe");
	/**
     * The restart button
	 */
	this.__resetDiv = $("#div-restart");

	/******* Delegatess *******/
	/**
	 * Canvas clicking delegate
	 */
	this.__onCanvasClicked = onCanvasClicked.bind(this);
	/**
	 * reset delegate
	 */
	this.__onResetClicked = reset.bind(this);

	this.__containerDiv.append( this.__board.canvas );
	this.__board.canvas.bind("click", this.__onCanvasClicked);

	this.__resetDiv.bind("click", this.__onResetClicked);



	/******* Methods *******/
	/**
	 * Resets game
	 */
	function reset() {
	 	this.__model.reset();
		this.__board.reset();
	}

	/**
	 * Handler for the mouse click event
	 * @param {Object} e - Mouse click event
	 */
	function onCanvasClicked(e) {
		let xPos = e.pageX - this.__containerDiv.offset().left;
		let yPos = e.pageY - this.__containerDiv.offset().top;

		let board = this.__board;
		let model = this.__model;
		let AI = this.__AI;

		let i = Math.floor( xPos*3/board.BOARD_LENGTH );
		let j = Math.floor( yPos*3/board.BOARD_LENGTH );

		let boardState = model.getGameState();

		if (boardState !== GameState.CONTINUE) { return; }

		let nextPiece = model.getNextPiece();

		let isPieceSetSuccess = model.setPiece(i, j, nextPiece);

		if (isPieceSetSuccess) {
			board.drawPiece(i, j, nextPiece);

			boardState = model.getGameState();

			if (boardState != GameState.CONTINUE) {
				// play game ending movie
				alert("player wins or draw");
			} else {
				let nextPos = AI.bestMove(model);
				nextPiece = model.getNextPiece();
				isPieceSetSuccess = model.setPiece(nextPos.xPos, nextPos.yPos, nextPiece);
				if (!isPieceSetSuccess) { alert("sth wrong with AI"); }
				boardState = model.getGameState();
				if (boardState != GameState.CONTINUE) {
					// play game ending movie
					alert("computer wins or draw");
				}
			}
		}
	}


});
