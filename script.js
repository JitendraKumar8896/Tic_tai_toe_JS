const Gameboard = (() => {
  let board = Array(9).fill(null);

  const getBoard = () => board;

  const setMark = (index, mark) => {
    if (!board[index]) board[index] = mark;
  };

  const resetBoard = () => {
    board = Array(9).fill(null);
  };

  return { getBoard, setMark, resetBoard };
})();

const Player = (name, mark) => {
  return { name, mark };
};
const GameController = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const switchTurn = () => {
    currentPlayerIndex = 1 - currentPlayerIndex;
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const board = Gameboard.getBoard();
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameOver = true;
        return board[a];
      }
    }

    if (!board.includes(null)) {
      gameOver = true;
      return "Tie";
    }

    return null;
  };

  const playTurn = (index) => {
    if (gameOver || Gameboard.getBoard()[index]) return;

    const currentPlayer = players[currentPlayerIndex];
    Gameboard.setMark(index, currentPlayer.mark);

    const winner = checkWinner();
    if (winner) {
      DisplayController.showResult(
        winner === "Tie" ? "It's a Tie!" : `${currentPlayer.name} Wins!`
      );
      return;
    }

    switchTurn();
    DisplayController.updateBoard();
  };

  const startGame = (player1Name, player2Name) => {
    players = [Player(player1Name, "X"), Player(player2Name, "O")];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.resetBoard();
    DisplayController.updateBoard();
    DisplayController.showResult("");
  };

  return { playTurn, startGame };
})();


const DisplayController = (() => {
  const boardDiv = document.getElementById("board");
  const statusDiv = document.getElementById("status");
  const restartButton = document.getElementById("restart");

  const updateBoard = () => {
    const board = Gameboard.getBoard();
    boardDiv.innerHTML = "";
    board.forEach((mark, index) => {
      const cell = document.createElement("div");
      cell.textContent = mark;
      cell.addEventListener("click", () => GameController.playTurn(index));
      boardDiv.appendChild(cell);
    });
  };

  const showResult = (message) => {
    statusDiv.textContent = message;
  };

  restartButton.addEventListener("click", () => {
    const player1Name = prompt("Enter Player 1 Name:");
    const player2Name = prompt("Enter Player 2 Name:");
    GameController.startGame(player1Name, player2Name);
  });

  return { updateBoard, showResult };
})();



