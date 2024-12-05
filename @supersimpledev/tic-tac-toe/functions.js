import { buttons, displayers, cells, gameVariables } from "./variables.js";

export function renderTurnStatus() {
  if (gameVariables.isGameActive) {
    displayers.turnsDisplayer.innerText = `Player ${gameVariables.currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  let roundWon = false;
  const winningConditionArray = [];
  // Chck if there is a winner
  for (let condition of gameVariables.winningConditions) {
    const a = condition[0];
    const b = condition[1];
    const c = condition[2];
    if (
      gameVariables.gameState[a] &&
      gameVariables.gameState[a] === gameVariables.gameState[b] &&
      gameVariables.gameState[a] === gameVariables.gameState[c]
    ) {
      roundWon = true;
      winningConditionArray.push(a, b, c);
      break; // Breaks the loop early if a winner is found
    }
  }

  if (roundWon) {
    displayers.turnsDisplayer.innerText = `Player ${gameVariables.currentPlayer} Wins!`; // Display who win
    gameVariables.isGameActive = false; // End Game
    // Highlighting the winning cells
    winningConditionArray.forEach((value) => {
      cells.forEach((cell) => {
        if (cell.dataset.index == value) {
          cell.classList.add("highlight");
        }
      });
    });
    // Increment & display scores
    gameVariables.scores.wins++;
    saveScores();
    renderScores();
    return;
  }

  // Chks if all cells are taken & game is tie
  if (!gameVariables.gameState.includes("")) {
    displayers.turnsDisplayer.innerText = `It's a Tie!`;
    gameVariables.isGameActive = false; // End Game
    // Increment & display scores
    gameVariables.scores.ties++;
    saveScores();
    renderScores();
  }
}

export function playGame(cellIndex, cell) {
  // If the cell has already been taken or Game already won
  if (
    gameVariables.gameState[cellIndex] !== "" ||
    !gameVariables.isGameActive
  ) {
    return; // Exit the export function
  }

  cell.innerText = gameVariables.currentPlayer; // Puts O/X in the Cell UI
  gameVariables.gameState[cellIndex] = gameVariables.currentPlayer; // Puts O/X in the gameVariables.gameState Array
  cell.classList.add("taken"); // Add .taken(cursor:not-allowed) to the cell div

  checkWinner(); // checks if there is a winner & end game if there is one

  // If there is no winner & game is still active
  if (gameVariables.isGameActive) {
    gameVariables.currentPlayer =
      gameVariables.currentPlayer === "X" ? "O" : "X";
    renderTurnStatus(); // Change Who's turn UI
  }
}

export function restartGame() {
  gameVariables.gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("highlight");
  });
  gameVariables.isGameActive = true;
  gameVariables.currentPlayer = "X";
  renderTurnStatus();
}

function saveScores() {
  localStorage.setItem("tttScores", JSON.stringify(gameVariables.scores));
}

export function renderScores() {
  displayers.scoreBoard.innerText = `Wins: ${gameVariables.scores.wins}, Losses: ${gameVariables.scores.losses}, Tie: ${gameVariables.scores.ties}`;
}
export function resetScores() {
  gameVariables.scores = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  saveScores();
  renderScores();
}