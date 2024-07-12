const gameBoard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  const printBoard = () => board;

  const updateBoard = function (move, player) {
    if (board[move] === "") {
      board[move] = player.symbol;
      return true;
    }
    return false;
  };

  const checkWinner = function () {
    if (
      // check rows
      (board[0] === "X" && board[1] === "X" && board[2] === "X") ||
      (board[0] === "O" && board[1] === "O" && board[2] === "O") ||
      (board[3] === "X" && board[4] === "X" && board[5] === "X") ||
      (board[3] === "O" && board[4] === "O" && board[5] === "O") ||
      (board[6] === "X" && board[7] === "X" && board[8] === "X") ||
      (board[6] === "O" && board[7] === "O" && board[8] === "O") ||
      // check columns

      (board[0] === "X" && board[3] === "X" && board[6] === "X") ||
      (board[0] === "O" && board[3] === "O" && board[6] === "O") ||
      (board[1] === "X" && board[4] === "X" && board[7] === "X") ||
      (board[1] === "O" && board[4] === "O" && board[7] === "O") ||
      (board[2] === "X" && board[5] === "X" && board[8] === "X") ||
      (board[2] === "O" && board[5] === "O" && board[8] === "O") ||
      // check diagnoals
      (board[0] === "X" && board[4] === "X" && board[8] === "X") ||
      (board[0] === "O" && board[4] === "O" && board[8] === "O") ||
      (board[2] === "X" && board[4] === "X" && board[6] === "X") ||
      (board[2] === "O" && board[4] === "O" && board[6] === "O")
    ) {
      return "Game over";
    }
  };

  const resetBoard = function () {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { updateBoard, checkWinner, resetBoard, printBoard };
})();

const player = function (name, symbol) {
  return { name, symbol };
};

const gameFlow = (function () {
  let player1 = player("Lonce", "X");
  let player2 = player("Lown", "O");
  let gameON = true;
  let currentPlayer = player1;

  const switchPlayers = function () {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const playGame = function () {
    // start game button clicked
    while (gameON) {
      UI_manager.bindCellEvents(currentPlayer.symbol);
      const playerChoice = prompt("Choose a square");
      if (playerChoice === "q") {
        break;
      }
      if (gameBoard.updateBoard(playerChoice, currentPlayer)) {
        UI_manager.updateUI(currentPlayer);
        if (gameBoard.checkWinner()) {
          gameON = false;
          return `Game over! ${currentPlayer} wins!`;
        }
      }
      switchPlayers();
      console.log(gameBoard.printBoard());
    }
  };

  return { switchPlayers, playGame };
})();

const UI_manager = (function () {
  // add cell event listener
  const bindCellEvents = function (player) {
    allCells = document.querySelectorAll(".cell");
    for (let cell of allCells) {
      cell.addEventListener("click", function () {
        updateUI(cell, player);
      });
    }
  };

  const updateUI = function (div, player) {
    div.textContent = player;
  };
  return { bindCellEvents, updateUI };
})();
gameFlow.playGame();

// // On screen
// // Input player 1 name
// // Input player 2 name
// // click start game button which brings up empty grid and starts game flow

// // While the game is running
// // On click of button:
// // If cell is empty,  place the marker of the player
// // checks for winner
// // changes turn
