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
      return true;
    }
  };

  const isDraw = function () {
    return board.every((cell) => cell !== "");
  };

  const resetBoard = function () {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { updateBoard, checkWinner, resetBoard, printBoard, isDraw };
})();

const player = function (name, symbol) {
  return { name, symbol };
};

const gameFlow = (function () {
  let player1 = player("Lonce", "X");
  let player2 = player("Lown", "O");
  let gameON = true;
  let currentPlayer = player1;

  const getCurrentPlayer = () => currentPlayer;

  const switchPlayers = function () {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const handleMove = function (cellIndex) {
    if (gameON) {
      // check current move can be played
      if (gameBoard.updateBoard(cellIndex, currentPlayer)) {
        // check if there's a winner
        if (gameBoard.checkWinner()) {
          console.log("There's a winner");
          gameON = false;
        }
        // add check for draw
        else if (gameBoard.isDraw()) {
          console.log("It's a draw");
          gameON = false;
        } else {
          switchPlayers();
          // UI_manager.updateTurnIndicator(currentPlayer);
        }
      }
    }
  };

  return { switchPlayers, getCurrentPlayer, handleMove, getCurrentPlayer };
})();

const UI_manager = (function () {
  // add cell event listeners
  const bindCellEvents = function () {
    allCells = document.querySelectorAll(".cell");
    for (let cell of allCells) {
      cell.addEventListener("click", function () {
        updateUI(cell);
        const index = getDivIndex(cell);
        gameFlow.handleMove(index);
      });
    }
  };

  const updateUI = function (div) {
    const player = gameFlow.getCurrentPlayer();
    div.textContent = player.symbol;
  };

  const getDivIndex = function (cell) {
    const cellIndex = cell.getAttribute("data-index");
    return cellIndex;
  };

  return { bindCellEvents, updateUI, getDivIndex };
})();

UI_manager.bindCellEvents();
// On screen
// Input player 1 name
// Input player 2 name
// click start game button which brings up empty grid and starts game flow

// While the game is running
// On click of button:
// do the  the game logic:
// If cell is empty,  place the marker of the player
// update the board array
// checks for winner
// changes turn
