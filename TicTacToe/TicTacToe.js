
/* TicTacToe Game control */
$(new function() {

	/******* Constants *******/
	// Player's piece.
	const PLAYER_PIECE = Piece.X;
	// AI's piece.
	const AI_PIECE = Piece.O;
	// Animation duration
	const ANIMATION_DURATION = 400;

	/******* Properties *******/
	// If the game has started
	this.__isGameStarted = false;
	// If canvas has been clicked and is handling stuff
	this.__isBoardClicked = false;
	// Who plays first. Default is player
	this.__firstPiece = PLAYER_PIECE;
	// Model of the game. Default is Player moves first
	this.__model = new TTTModel(this.__firstPiece, PLAYER_PIECE);
	// View of the game.
	this.__board = new TTTBoard();
	// AI
	this.__AI = new TTTAI(this.__model);
	// The container div
	this.__containerDiv = $("#div-TicTacToe");
	// The restart button
	this.__resetDiv = $("#div-restart");
	// The computer first button
	this.__ObuttonDiv = $("#div-obutton");
	// The player first button
	this.__XButtonDiv = $("#div-xbutton");

	/******* Delegatess *******/
	// Canvas clicking delegate
	this.__onCanvasClicked = onCanvasClicked.bind(this);
	// reset delegate
	this.__onResetClicked = reset.bind(this);
	// Computer button delegate
	this.__onOButtonClicked = setAIFirst.bind(this);
	// Obutton mouseenter delegate
	this.__onOButtonEnter = onObuttonEnter.bind(this);
	// Obutton mouseleave delegate
	this.__onOButtonLeave = onObuttonLeave.bind(this);

	/******* Initialization *******/
	$("#div-TTTcontainer-left").height(Math.max(600, ($(window).height()-50)*0.8));
	this.__containerDiv.append( this.__board.canvas );
	this.__board.canvas.bind("click", this.__onCanvasClicked);

	this.__resetDiv.bind("click", this.__onResetClicked);

	this.__ObuttonDiv.bind("click", this.__onOButtonClicked);
	this.__ObuttonDiv.bind("mouseenter", this.__onOButtonEnter);
	this.__ObuttonDiv.bind("mouseleave", this.__onOButtonLeave);

	this.__XButtonDiv.addClass("div-button-active");



	/******* Methods *******/
	/**
	 * Resets game
	 */
	function reset() {
		this.__isGameStarted = false;
		this.__isBoardClicked = false;
		if ( this.__firstPiece === AI_PIECE ) {
			// always assumes player plays first
			this.__firstPiece = PLAYER_PIECE;
			this.__model = new TTTModel(this.__firstPiece, PLAYER_PIECE);
			this.__AI = new TTTAI(this.__model);
		}
		this.__ObuttonDiv.bind("click", this.__onOButtonClicked);
		this.__ObuttonDiv.bind("mouseenter", this.__onOButtonEnter);
		this.__ObuttonDiv.bind("mouseleave", this.__onOButtonLeave);

		this.__XButtonDiv.addClass("div-button-active");
		this.__ObuttonDiv.removeClass("div-button-active");

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

		let gameState = model.getGameState();

		if (gameState !== GameState.CONTINUE) { return; }

		if (this.__isBoardClicked === true) { return; }

		this.__isBoardClicked = true;

		let nextPiece = model.getNextPiece();

		let isPieceSetSuccess = model.setPiece(i, j, nextPiece);

		if (isPieceSetSuccess) {
			if (!this.__isGameStarted) {
				this.__isGameStarted = true;
				this.__ObuttonDiv.unbind("click", this.__onOButtonClicked);
				this.__ObuttonDiv.unbind("mouseenter", this.__onOButtonEnter);
				this.__ObuttonDiv.unbind("mouseleave", this.__onOButtonLeave);
			}
			this.__XButtonDiv.removeClass("div-button-active");
			this.__ObuttonDiv.addClass("div-button-active");

			board.drawPiece(i, j, nextPiece);

			setTimeout(function() {
				gameState = model.getGameState();
				if (gameState != GameState.CONTINUE) {
					board.playGGAnimation(gameState, this.__model.getWinningPosition());
				} else {
					let nextPos = this.__AI.bestMove();
					let nextPiece = this.__model.getNextPiece();
					let isPieceSetSuccess = this.__model.setPiece(nextPos.xPos, nextPos.yPos, nextPiece);
					if (!isPieceSetSuccess) { alert("sth wrong with AI"); }

					this.__board.drawPiece(nextPos.xPos, nextPos.yPos, nextPiece);

					this.__XButtonDiv.addClass("div-button-active");
					this.__ObuttonDiv.removeClass("div-button-active");

					setTimeout(function(){
						gameState = this.__model.getGameState();
						if (gameState != GameState.CONTINUE) {
							// play game ending movie
							board.playGGAnimation(gameState, this.__model.getWinningPosition());
						} else {
							this.__isBoardClicked = false;
						}
					}.bind(this),  ANIMATION_DURATION);
				}
			}.bind(this),  ANIMATION_DURATION);
		};
	}

	/**
	 * Handler for the computer button
	 */
	function setAIFirst() {
		// update game related logic
		if (this.__isGameStarted) { return; }
		this.__isGameStarted = true;
		this.__ObuttonDiv.addClass("div-button-active");
		this.__ObuttonDiv.unbind("click", this.__onOButtonClicked);
		this.__ObuttonDiv.unbind("mouseenter", this.__onOButtonEnter);
		this.__ObuttonDiv.unbind("mouseleave", this.__onOButtonLeave);
		this.__isBoardClicked = true;

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

		this.__XButtonDiv.addClass("div-button-active");
		this.__ObuttonDiv.removeClass("div-button-active");

		setTimeout(function(){
			this.__isBoardClicked = false;
		}.bind(this),  ANIMATION_DURATION);
	}

	/**
	 * Handler for Obutton mouseenter effect
	 */
	function onObuttonEnter() {
		this.__XButtonDiv.removeClass("div-button-active");
		this.__ObuttonDiv.addClass("div-button-active");
	}
	/**
	 * Handler for Obutton mouseleave effect
	 */
	function onObuttonLeave() {
		this.__XButtonDiv.addClass("div-button-active");
		this.__ObuttonDiv.removeClass("div-button-active");
	}

});
