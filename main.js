const gameBoard = (function () {
  // Properly initialize a 3x3 game board with null values or any placeholder you prefer
  const board = [
    ["X", "O", "X"],
    ["O", "O", "X"],
    ["O", "X", "O"],
  ];

  const printBoard = () => console.log(board);
  const resetBoard = function () {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        board[i][j] = "";
      }
    }
  };

  const placeMarker = function (move) {
    //
  };
  const checkWinner = function () {
    const winPatterns = [
      // Rows
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      // Columns
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // Diagonals
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (let pattern of winPatterns) {
      // destructure pattern to a,b,c
      const [a, b, c] = pattern;
      if (
        // if the first place is not blank, and
        board[a[0]][a[1]] &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        return `Game over. ${board[a[0]][a[1]]} wins!`;
      }
    }

    // Check for a tie
    if (
      board.every(function (row) {
        return row.every(function (cell) {
          return cell !== "";
        });
      })
    ) {
      return "Game over. It's a tie!";
    }

    return null; // Game is still ongoing
  };
  return { printBoard, resetBoard, checkWinner, placeMarker };
})();


