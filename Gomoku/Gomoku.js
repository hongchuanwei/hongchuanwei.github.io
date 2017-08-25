/* Gomoku Game control */
$(new function() {
    /******* Constants *******/
    const GRID_SIZE = 15;

    /******* Properties *******/
    this.__containerDiv = $("#div-Gomoku");
    this.__board = new GomokuBoard($("#div-middle-top").height(), GRID_SIZE); // SVG group
    this.__currentPiece = GomokuPiece.Black; // assumes black goes first
    this.__model = new GomokuModel(GomokuPiece.Black, GRID_SIZE);
    this.__model.initialize();
    //this.__AI = new GomokuAI();

    /******* Delegates *******/
    // Canvas clicking delegate
    this.__onPieceClicked = onPieceClicked.bind(this);

    /******* Initialization *******/
    this.__containerDiv.append(this.__board.getSVG());
    this.__board.addPieceListener(this.__onPieceClicked);

    /******* Private functions *******/
    /**
	 * Handler for the mouse click event
     * @param {number} i - Row index
     * @param {number} j - Column index
	 * @param {Object} e - Mouse click event
	 */
	function onPieceClicked(i, j, e) {
        this.__board.showPiece(i, j, this.__currentPiece);
        this.__model.setPiece(i, j, this.__currentPiece);
        if (this.__model.isWinner(i, j, this.__currentPiece)) {
            alert( this.__currentPiece);
        }
        this.__currentPiece = this.__model.getOpponent(this.__currentPiece);
        this.__board.changePieceColor(this.__currentPiece);

    }

});
