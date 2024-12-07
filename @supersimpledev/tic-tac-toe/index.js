import { buttons, cells, gameVariables } from "./variables.js";
import {
  playGame,
  resetScores,
  restartGame,
  renderTurnStatus,
  renderScores,
  makeComputerPlay,
} from "./functions.js";

// Handles cell click
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    playGame(cell.dataset.index, cell);
    // If there is still empty cell & game is active, allow Computer to pick a cell
    // if (gameVariables.gameState.includes("") && gameVariables.isGameActive) {
    //   makeComputerPlay(cells);
    // }
  });
});

// Handles Restart Btn click
buttons.restartBtn.addEventListener("click", restartGame);

// Handles Reset Scores Btn click
buttons.resetscoresBtn.addEventListener("click", resetScores);

// Shows who's turn as page loads
renderTurnStatus();

// Shows Score board
renderScores();
