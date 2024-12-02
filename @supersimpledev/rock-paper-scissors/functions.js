export let scores = JSON.parse(localStorage.getItem("scores")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

let computerMove; // Declaring computer's pick variable

function getComputerMove() {
  computerMove = Math.random();
  //Modifying ComputerMove variable to rock/paper/scissors
  if (computerMove > 0 && computerMove <= 0.33) {
    computerMove = "rock";
  } else if (computerMove > 0.33 && computerMove <= 0.66) {
    computerMove = "paper";
  } else if (computerMove > 0.66 && computerMove <= 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function calcScores(playerMove) {
  const computerMove = getComputerMove();
  let result; // variable to store result (You win/lose/tie)

  if (playerMove === "rock") {
    switch (computerMove) {
      case "rock":
        result = "You tie";
        break;
      case "paper":
        result = "You lose";
        break;
      case "scissors":
        result = "You win";
        break;
      default:
        console.log("You didn't select anything");
    }
  } else if (playerMove === "paper") {
    switch (computerMove) {
      case "rock":
        result = "You win";
        break;
      case "paper":
        result = "You tie";
        break;
      case "scissors":
        result = "You lose";
        break;
      default:
        console.log("You didn't select anything");
    }
  } else if (playerMove === "scissors") {
    switch (computerMove) {
      case "rock":
        result = "You lose";
        break;
      case "paper":
        result = "You win";
        break;
      case "scissors":
        result = "You tie";
        break;
      default:
        console.log("You didn't select anything");
    }
  }

  if (result === "You win") {
    scores.wins++;
  } else if (result === "You lose") {
    scores.losses++;
  } else if (result === "You tie") {
    scores.ties++;
  }
  return result;
}

function renderResult(resultWrapperElement, playerMove, result) {
  let resultUI = `
    <p class="lead">${result}</p>
    <p class="lead">
      You picked
      <img
        src="./images/${playerMove}-emoji.png"
        alt="Your pick"
        width="60"
        height="60"
      />. Computer picked
      <img
        src="./images/${computerMove}-emoji.png"
        alt="Computer's pick"
        width="60"
        height="60"
      />.
    </p>
    <p class="lead">Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}</p>
  `;
  resultWrapperElement.innerHTML = resultUI;
}

export function saveToLocalStorage() {
  localStorage.setItem("scores", JSON.stringify(scores));
}

export function playGame(playerMove, resultWrapperElement) {
  const result = calcScores(playerMove);
  renderResult(resultWrapperElement, playerMove, result);
  saveToLocalStorage();
}

export function resetScores() {
  scores.wins = 0;
  scores.losses = 0;
  scores.ties = 0;
  saveToLocalStorage();
}

function getPlayerMove() {
  let autoplayPlayerMove = Math.random();
  if (autoplayPlayerMove >= 0 && autoplayPlayerMove <= 0.33) {
    autoplayPlayerMove = "rock";
  } else if (autoplayPlayerMove > 0.33 && autoplayPlayerMove <= 0.66) {
    autoplayPlayerMove = "paper";
  } else if (autoplayPlayerMove > 0.66 && autoplayPlayerMove <= 1) {
    autoplayPlayerMove = "scissors";
  }
  return autoplayPlayerMove;
}

export function autoPlay(resultWrapperElement) {
  let intervalID = setInterval(() => {
    const playerMove = getPlayerMove();
    const result = calcScores(playerMove);
    renderResult(resultWrapperElement, playerMove, result);
    saveToLocalStorage();
  }, 1000);
  return intervalID;
}
