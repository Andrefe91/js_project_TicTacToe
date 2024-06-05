function createPlayer (name, number) {
    let symbol = number > 1 ? 'O' : 'X';

    return {
        name: name,
        symbol: symbol
    };
};

const Board = (function () {
    let turn = 0;
    let board = [["","",""],["","",""],["","",""]];
    const move = (player, coordinates) => (
        board[coordinates[0]][coordinates[1]] = player.symbol
    );
    const valid = (coordinates) => (
        board[coordinates[0]][coordinates[1]] == "" ? true : false
    );
    const winCondition = function () { // Check for the win condition
        //Checking rows and columns
        for (let i = 0; i < board.length; i++) {
            if ((board[i][0] == board[i][1]) && (board[i][0] == (board[i][2])) && (["X","O"].includes(board[i][0]))) {
              return true
            } else if ((board[0][i] == board[1][i]) && (board[0][i] == (board[2][i])) && (["X","O"].includes(board[0][i]))){
              return true
            };
        };

        // Cheking the diagonals
        if ((board[0][0] == board[1][1]) && (board[0][0] == (board[2][2])) && (["X","O"].includes(board[0][0]))) {
            return true
        } else if ((board[0][2] == board[1][1]) && (board[0][2] == (board[2][0])) && (["X","O"].includes(board[0][2]))) {
            return true
        } else {
          return false
        };
    };
    return {turn, board, move, valid, winCondition};
})();

