function createPlayer (name, number) {
    let symbol = number > 1 ? 'O' : 'X';

    return {
        name: name,
        symbol: symbol
    };
};

const Board = (function () {
    let turn = 0;
    let state = [["","",""],["","",""],["","",""]];
    const getTurn = () => turn;
    const move = (player, coordinates) => {
        if (valid(coordinates)) { //Only apply the move if it's a valid one
            state[coordinates[0]][coordinates[1]] = player.symbol;
            turn++;
        };
    };
    const valid = (coordinates) => (
        state[coordinates[0]][coordinates[1]] == "" ? true : false
    );
    const winCondition = function () { // Check for the win condition
        //Checking rows and columns
        for (let i = 0; i < state.length; i++) {
            if ((state[i][0] == state[i][1]) && (state[i][0] == (state[i][2])) && (["X","O"].includes(state[i][0]))) {
              return true
            } else if ((state[0][i] == state[1][i]) && (state[0][i] == (state[2][i])) && (["X","O"].includes(state[0][i]))){
              return true
            };
        };

        // Cheking the diagonals
        if ((state[0][0] == state[1][1]) && (state[0][0] == (state[2][2])) && (["X","O"].includes(state[0][0]))) {
            return true
        } else if ((state[0][2] == state[1][1]) && (state[0][2] == (state[2][0])) && (["X","O"].includes(state[0][2]))) {
            return true
        } else {
          return false
        };
    };
    return {state, move, valid, winCondition, getTurn};
})();

// Note: The `turn` property on the returned object is set to the initial value of the `turn` variable at the time the IIFE
// executes, which is 0. This value does not automatically update when the internal `turn` variable changes because it's
// a primitive value, not a reference to the internal turn variable. Essentially, you're copying the value of `turn` into
// the returned object, not maintaining a reference to the internal variable. To ensure the turn property on the returned
// object always reflect the current value of the internal `turn` variable, you should use a getter method.


const Game = ( function () {
    const definePlayers = 
}) ();

