export function displayCalculation(calculation) {
  document.querySelector(".js-answer-box").innerText = calculation;
}

export function storeAnswer($name, $value) {
  localStorage.setItem($name, $value);
}

export function resetCalculation(calculation) {
  calculation = "";
  storeAnswer("calculation", calculation);
  displayCalculation(calculation);
}
