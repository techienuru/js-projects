export function displayCalculation(calculation) {
  document.querySelector(".js-answer-box").innerText = calculation;
}

export function storeAnswer(calculation) {
  localStorage.setItem("calculation", calculation);
}

export function resetCalculation(calculation) {
  calculation = ""; // reset the local calculation variable
  storeAnswer(calculation);
  displayCalculation(calculation);
  return calculation;
}
