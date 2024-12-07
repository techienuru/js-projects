// Buttons
export const buttons = {
  restartBtn: document.querySelector(".js-restart"),
  resetscoresBtn: document.querySelector(".js-reset-scores"),
};

// Displayers
export const displayers = {
  turnsDisplayer: document.querySelector(".js-turns-displayer"),
  scoreBoard: document.querySelector(".js-score-board"),
};

// Cells
export const cells = document.querySelectorAll(".js-cell");

// Game Variables
export const gameVariables = {
  currentPlayer: "X",
  isGameActive: true,
  gameState: ["", "", "", "", "", "", "", "", ""],
  winningConditions: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  scores: JSON.parse(localStorage.getItem("tttScores")) || {
    wins: 0,
    ties: 0,
  },
};
