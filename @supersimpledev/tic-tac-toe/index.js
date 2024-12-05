import { buttons, cells } from "./variables.js";
import {
  playGame,
  resetScores,
  restartGame,
  renderTurnStatus,
  renderScores,
} from "./functions.js";

// Handles cell click
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    playGame(cell.dataset.index, cell);
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
