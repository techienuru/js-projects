import { autoPlay, playGame, resetScores } from "./functions.js";

const resultWrapperElement = document.querySelector(".js-result-wrapper"); //HTML div that houses result UI

// Rock onclick Listener
document.querySelector(".js-rock-btn").addEventListener("click", () => {
  playGame("rock", resultWrapperElement);
});

// Paper onclick Listener
document.querySelector(".js-paper-btn").addEventListener("click", () => {
  playGame("paper", resultWrapperElement);
});

// Scissors onclick Listener
document.querySelector(".js-scissors-btn").addEventListener("click", () => {
  playGame("scissors", resultWrapperElement);
});

// Reset scores onclick Listener
const resetscoresBtn = document.querySelector(".js-reset-scores");
resetscoresBtn.addEventListener("click", () => {
  resetscoresBtn.innerText = "Processing...";
  setTimeout(() => {
    resetScores();
    resultWrapperElement.innerHTML = `
    <div class="alert alert-success alert-dismissible">
        Scores reset successfully!
        <button class="btn btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
    resetscoresBtn.innerText = "Reset Scores";
  }, 1000);
});

let isAutoplaying; // chks if autoplay is on
let intervalID; // ID that hold the setInterval
// Auto play onclick Listener
const autoplayElement = document.querySelector(".js-auto-play");
autoplayElement.addEventListener("click", () => {
  if (!isAutoplaying) {
    intervalID = autoPlay(resultWrapperElement);
    isAutoplaying = true;
    autoplayElement.innerText = "Stop Auto Play"; // Change btn text
    // Changing the bg color of the btn
    autoplayElement.classList.remove("btn-outline-success");
    autoplayElement.classList.add("btn-outline-secondary");
  } else {
    clearInterval(intervalID);
    isAutoplaying = false;
    autoplayElement.innerText = "Auto Play"; // Change btn text
    // Changing the bg color of the btn
    autoplayElement.classList.remove("btn-outline-secondary");
    autoplayElement.classList.add("btn-outline-success");
  }
});
