import {
  displayCalculation,
  resetCalculation,
  storeAnswer,
} from "./functions.js";

let calculation = localStorage.getItem("calculation") || ""; // Variable to store all calculations

if (calculation) {
  displayCalculation(calculation);
}

// Getting button text(numbers) and displaying it on the answer box
document.querySelectorAll(".js-button").forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;
    calculation += `${buttonText}`;
    displayCalculation(calculation);
  });
});

// Getting button text(arithmetic operators) and displaying it on the answer box
document.querySelectorAll(".js-arithmetic-button").forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;
    calculation += ` ${buttonText} `;
    displayCalculation(calculation);
  });
});

// Evaluating and displaying the calculation
document.querySelector(".js-equal-to").addEventListener("click", () => {
  if (calculation) {
    calculation = `${eval(calculation)}`;
    displayCalculation(calculation);
    storeAnswer("calculation", calculation);
  }
});

// Clearing calculations
document.querySelector(".js-clear-button").addEventListener("click", () => {
  resetCalculation(calculation);
});
