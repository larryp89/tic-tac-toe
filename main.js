const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

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

const player = function (name, symbol, score) {
  return { name, symbol, score };
};

const gameFlow = (function () {
  let player1;
  let player2;
  let gameON = true;
  let currentPlayer = player1;

  const gameInit = function (player1Name, player2Name) {
    player1 = player(player1Name, "X", 0);
    player2 = player(player2Name, "O", 0);
    currentPlayer = player1;
    gameON = true;
    gameBoard.resetBoard();
    UI_manager.resetBoard();
    UI_manager.updateNames(player1.name, player2.name);
  };

  const playAgain = function () {
    gameON = true;
    gameBoard.resetBoard();
    UI_manager.resetBoard();
  };

  const updateScore = function (player) {
    player.score++;
  };

  const isGameON = () => gameON;

  const getCurrentPlayer = () => currentPlayer;

  const switchPlayers = function () {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const handleMove = function (cellIndex) {
    // check it's a valid move
    if (gameBoard.updateBoard(cellIndex, currentPlayer)) {
      // check if there's a winner
      if (gameBoard.checkWinner()) {
        console.log(`${currentPlayer.name} wins!`);
        updateScore(currentPlayer);
        UI_manager.updateScore(currentPlayer)
        gameON = false;
        UI_manager.togglePlaybutton();
        switchPlayers()
      } else if (gameBoard.isDraw()) {
        console.log("It's a draw");
        gameON = false;
        UI_manager.togglePlaybutton();
        switchPlayers()
      } else {
        switchPlayers();
        // UI_manager.updateTurnIndicator(currentPlayer);
      }
    }
  };

  return {
    switchPlayers,
    getCurrentPlayer,
    handleMove,
    gameInit,
    isGameON,
    playAgain,
  };
})();

const UI_manager = (function () {
  // add cell event listeners
  const allCells = document.querySelectorAll(".cell");
  const bindCellEvents = function () {
    for (let cell of allCells) {
      cell.addEventListener("click", function () {
        if (gameFlow.isGameON()) {
          updateCell(cell);
          const index = getDivIndex(cell);
          gameFlow.handleMove(index);
        }
      });
    }
  };

  // add play button event listener
  const playButton = document.querySelector(".new-game");
  playButton.addEventListener("click", function () {
    if (gameFlow.isGameON()) {
      getPlayerDetails();
      togglePlaybutton();
    }
    if (!gameFlow.isGameON()) {
      gameFlow.playAgain();
      togglePlaybutton();
    }
  });

  const getPlayerDetails = function () {
    const dialog = document.getElementById("playerDetailsDialog");
    dialog.showModal();

    dialog.querySelector("form").addEventListener("submit", function (event) {
      event.preventDefault();
      let player1Name = dialog.querySelector("#player1").value;
      if (player1Name == "") {
        player1Name = "Player 1";
      }
      let player2Name = dialog.querySelector("#player2").value;
      if (player2Name == "") {
        player2Name = "Player 2";
      }
      dialog.close();
      gameFlow.gameInit(player1Name, player2Name);
    });
  };

  const updateCell = function (div) {
    const player = gameFlow.getCurrentPlayer();
    if (div.textContent === "") {
      div.textContent = player.symbol;
    }
  };

  const getDivIndex = function (cell) {
    const cellIndex = cell.getAttribute("data-index");
    return cellIndex;
  };

  const showPlayerForm = function () {
    playButton = document.querySelector(".new-game");
    playButton.addEventListener("click", function () {
      dialog = document.querySelector("dialog");
      dialog.showModal();
    });
  };

  const togglePlaybutton = function () {
    playButton.textContent = "Play again";
    playButton.disabled = playButton.disabled === true ? false : true;
  };

  const resetBoard = function () {
    for (let cell of allCells) {
      cell.textContent = "";
    }
  };

  const updateNames = function (player1, player2) {
    const p1Name = document.querySelector(".p1-name");
    const p2Name = document.querySelector(".p2-name");
    p1Name.textContent = `${player1}:`;
    p2Name.textContent = `${player2}`;
  };

  const updateScore = function (player) {
    const p1Score = document.querySelector(".p1-score");
    const p2Score = document.querySelector(".p2-score");
    if (player.symbol === "X") {
      p1Score.textContent = player.score;
    } else {
      p2Score.textContent = player.score;
    }
  };

  return {
    bindCellEvents,
    updateUI: updateCell,
    getDivIndex,
    showPlayerForm,
    getPlayerDetails,
    resetBoard,
    togglePlaybutton,
    updateNames,
    updateScore,
  };
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
