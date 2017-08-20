/* Gomoku Game control */
$(new function() {
    /******* Properties *******/
    this.__containerDiv = $("#div-Gomoku");

    this.__board = new GomokuBoard($("#div-middle-top").height(), 15);

    this.__containerDiv.append(this.__board.getSVG());

    /******* test functions *******/


});
