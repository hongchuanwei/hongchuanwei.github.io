
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
	 * If the game has started
	 */
	this.__isGameStarted = false;
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
	 * AI
	 */
	this.__AI = new TTTAI(this.__model);
	/**
	 * The container div
	 */
	this.__containerDiv = $("#div-TicTacToe");
	/**
     * The restart button
	 */
	this.__resetDiv = $("#div-restart");
	/**
	 * The computer first button
	 */
	this.__computerDiv = $("#div-obutton");

	/******* Delegatess *******/
	/**
	 * Canvas clicking delegate
	 */
	this.__onCanvasClicked = onCanvasClicked.bind(this);
	/**
	 * reset delegate
	 */
	this.__onResetClicked = reset.bind(this);
	/**
	 * Computer button delegate
	 */
	this.__onComputerClicked = setAIFirst.bind(this);

	this.__containerDiv.append( this.__board.canvas );
	this.__board.canvas.bind("click", this.__onCanvasClicked);

	this.__resetDiv.bind("click", this.__onResetClicked);

	this.__computerDiv.bind("click", this.__onComputerClicked);

	/******* Methods *******/
	/**
	 * Resets game
	 */
	function reset() {
		this.__isGameStarted = false;
		if ( this.__firstPiece !== AI_PIECE ) {
			// always assumes player plays first
			this.__firstPiece = PLAYER_PIECE; 
			this.__model = new TTTModel(this.__firstPiece, PLAYER_PIECE);
			this.__AI = new TTTAI(this.__model);
		}
		
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
				let nextPos = AI.bestMove();
				nextPiece = model.getNextPiece();
				isPieceSetSuccess = model.setPiece(nextPos.xPos, nextPos.yPos, nextPiece);
				if (!isPieceSetSuccess) { alert("sth wrong with AI"); }

				board.drawPiece(nextPos.xPos, nextPos.yPos, nextPiece);

				boardState = model.getGameState();
				if (boardState != GameState.CONTINUE) {
					// play game ending movie
					alert("computer wins or draw");
				}
			}
		}
	}

	/**
	 * Handler for the computer button
	 */
	function setAIFirst() {
		if (this.__isGameStarted) { return; }
		this.__isGameStarted = true;

		// update model and AI
		this.__firstPiece = AI_PIECE; 
		this.__model = new TTTModel(this.__firstPiece, PLAYER_PIECE);
		this.__AI = new TTTAI(this.__model);

		// make the first move
		let nextPos = this.__AI.bestMove(AIAlgorithm.RANDOM);
		let nextPiece = this.__model.getNextPiece();
		
		let isPieceSetSuccess = this.__model.setPiece(nextPos.xPos, nextPos.yPos, nextPiece);
		if (!isPieceSetSuccess) { alert("sth wrong with AI"); }

		this.__board.drawPiece(nextPos.xPos, nextPos.yPos, nextPiece);
	}

});
