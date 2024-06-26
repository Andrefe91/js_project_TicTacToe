// import { createPlayer, Board, Game } from "./tictactoe";

//To delete and try later
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
    const reset = () => {
        state = [["_","_","_"],["_","_","_"],["_","_","_"]];
        turnNumber = 0;
    };
    return {state, move, valid, winCondition, getTurnNumber, prettyPrint, reset};
})();


const Game = ( function () {
    let player1 = createPlayer("Player 1", 1);
    let player2 = createPlayer("Player 2", 2);

    const definePlayers = () =>{
        //Call for first player
        player1.name = (prompt("Player 1 name") || "Player 1");
        //Call for second player
        player2.name = (prompt("Player 2 name") || "Player 2");
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
            alert(`${player1.name} wins!`);
            return true;
        } else if (Board.winCondition() == "O") {
            console.log(`${player2.name} wins!`);
            alert(`${player2.name} wins!`);
            return true;
        } else if (Board.getTurnNumber() == 9) {
            console.log("It's a draw!");
            alert("It's a draw!");
            return true;
        } else {
            console.log("No winner yet!");
            return false;
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
// The above is going to a module


// --------------------------------------------------------------------

//Calling the selectors
const turn = document.querySelector("#turn");
const setPlayer = document.querySelector("#set_name");
const restartGame = document.querySelector("#restart_game");
const cells = document.getElementsByClassName("cell"); //HTMLCollection array
const player1Name = document.querySelector("#p1_name");
const player2Name = document.querySelector("#p2_name");

// Event functions

function selectCell(event) {
        // Get coordinate and make move
        let position = event.target.getAttribute("position");
        event.target.innerHTML = `${Game.getTurnMark()}`;
        Game.makeMove([position[1],position[3]]);
        turn.innerHTML = (Board.getTurnNumber() + 1);

        // Remove class to make the selection invalid
        event.target.classList.add(`${Game.getTurnMark()}`); //Some style baby
        event.target.classList.remove("valid");
        event.target.removeEventListener("click", selectCell)
        let winner = Game.checkWinner();

        if (winner) { deactivateAll() }; //Finish the game
};

function deactivateAll() {
    console.log("Deactivating...")
    for (const cell of cells) {
        cell.classList.remove("valid");
    };
};

function reset() {
    Board.reset(); //Resert turn number and board
    turn.innerHTML = Board.getTurnNumber();

    for (const cell of cells) {
        cell.innerHTML = "_";
        cell.removeEventListener("click", selectCell);
        cell.classList.remove("X");
        cell.classList.remove("O");
        cell.classList.add("valid");
        cell.addEventListener("click", selectCell);
    };
};

//Adding the event listeners
setPlayer.addEventListener("click", () => {
    Game.definePlayers();
    console.log(Game.getPlayers());
    player1Name.innerHTML = `<span class="xMark">X</span> - ${Game.getPlayers()[0].name}`;
    player2Name.innerHTML = `<span class="oMark">O</span> - ${Game.getPlayers()[1].name}`;
});

restartGame.addEventListener("click", () => {
    console.log("Restart the game")
    reset();
});

for (const cell of cells) {
    cell.addEventListener("click", selectCell);
};

