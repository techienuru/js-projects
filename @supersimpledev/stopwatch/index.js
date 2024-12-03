import {
  renderTimer,
  resetStopwatch,
  startStopwatch,
  stopStopwatch,
} from "./functions-and-var.js";

window.onload = renderTimer();

// Start Btn event listener
document.querySelector(".js-start-btn").addEventListener("click", () => {
  startStopwatch();
});

// Stop Btn event listener
document.querySelector(".js-stop-btn").addEventListener("click", () => {
  stopStopwatch();
});

// Reset Btn event listener
document.querySelector(".js-reset-btn").addEventListener("click", () => {
  resetStopwatch();
});
