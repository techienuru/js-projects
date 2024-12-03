let restartBtn = document.querySelector(".js-restart");
let resetscoresBtn = document.querySelector(".js-reset-scores");

let turnsDisplayer = document.querySelector(".js-turns-displayer"); // Element that displays turn status
let scoreBoard = document.querySelector(".js-score-board"); // Element that shows scores

let cells = document.querySelectorAll(".js-cell");

let currentPlayer = "X";
let isGameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let winnningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function updateTurnStatus() {
  if (isGameActive) {
    turnsDisplayer.innerText = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  let roundWon = false;
  winnningConditions.forEach((condition) => {
    const a = condition[0];
    const b = condition[1];
    const c = condition[2];
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      roundWon = true;
      return;
    }
  });

  if (roundWon) {
    turnsDisplayer.innerText = `Player ${currentPlayer} Wins!`;
    isGameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    turnsDisplayer.innerText = `It's a Tie!`;
    gameState = false;
  }
}

function playGame(cellIndex, cell) {
  if (gameState[cellIndex] !== "" || !isGameActive) {
    return;
  }

  cell.innerText = currentPlayer;
  gameState[cellIndex] = currentPlayer;
  cell.classList.add("taken");

  checkWinner();

  if (isGameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnStatus();
  }
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    playGame(cell.dataset.index, cell);
  });
});

updateTurnStatus();
