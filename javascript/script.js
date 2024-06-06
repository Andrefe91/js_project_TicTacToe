function createPlayer (name, number) {
    let symbol = number > 1 ? 'O' : 'X';

    return {
        name: name,
        symbol: symbol
    };
};

const Board = (function () {
    let turnNumber = 0;
    let state = [["_","_","_"],["_","_","_"],["_","_","_"]];
    const getTurnNumber = () => turnNumber;
    const move = (player, coordinates) => {
        if (valid(coordinates)) { //Only apply the move if it's a valid one
            state[coordinates[0]][coordinates[1]] = player.symbol;
            turnNumber++;
        } else {
            console.log("Invalid move");
        };
    };
    const valid = (coordinates) => (
        (( coordinates[0] < 3 && coordinates[1] < 3) && (state[coordinates[0]][coordinates[1]] == "_") ) ? true : false
    );
    const winCondition = function () { // Check for the win condition
        //Checking rows and columns
        for (let i = 0; i < state.length; i++) {
            if ((state[i][0] == state[i][1]) && (state[i][0] == (state[i][2])) && (["X","O"].includes(state[i][0]))) {
              return state[i][0]
            } else if ((state[0][i] == state[1][i]) && (state[0][i] == (state[2][i])) && (["X","O"].includes(state[0][i]))){
              return state[0][i]
            };
        };

        // Cheking the diagonals
        if ((state[0][0] == state[1][1]) && (state[0][0] == (state[2][2])) && (["X","O"].includes(state[0][0]))) {
            return state[0][0]
        } else if ((state[0][2] == state[1][1]) && (state[0][2] == (state[2][0])) && (["X","O"].includes(state[0][2]))) {
            return state[0][2]
        } else {
          return false
        };
    };
    const prettyPrint = () => {
        for (let i = 0; i < 3; i++) {
            console.log(`${state[i][0]} ${state[i][1]} ${state[i][2]}`)
        };
    };
    return {state, move, valid, winCondition, getTurnNumber, prettyPrint};
})();

// Note: The `turn` property on the returned object is set to the initial value of the `turn` variable at the time the IIFE
// executes, which is 0. This value does not automatically update when the internal `turn` variable changes because it's
// a primitive value, not a reference to the internal turn variable. Essentially, you're copying the value of `turn` into
// the returned object, not maintaining a reference to the internal variable. To ensure the turn property on the returned
// object always reflect the current value of the internal `turn` variable, you should use a getter method.


const Game = ( function () {
    let player1 = createPlayer("Player 1", 1);
    let player2 = createPlayer("Player 2", 2);

    const definePlayers = () =>{
        //Call for first player
        player1.name = prompt("Player 1 name");
        //Call for second player
        player2.name = prompt("Player 2 name");
    };
    const getPlayers = () => [player1, player2];
    const  makeMove= (coordinates) => {
        if ((Board.getTurnNumber() % 2) == 0) {
            Board.move(player1, coordinates);
        } else {
            Board.move(player2, coordinates)
        };
        Board.prettyPrint();
    };
    const checkWinner = () => {
        if (Board.winCondition() == "X") {
            console.log(`${player1.name} wins!`);
        } else if (Board.winCondition() == "O") {
            console.log(`${player2.name} wins!`);
        } else if (Board.getTurnNumber() == 9) {
            console.log("It's a draw!");
        } else {
            console.log("No winner yet!");
        };
    };
    const getTurnMark = () => {
        if ((Board.getTurnNumber() % 2) == 0) {
            return "X";
        } else {
            return "O";
        };
    };
    return {definePlayers, getPlayers, makeMove, checkWinner, getTurnMark};
}) ();

