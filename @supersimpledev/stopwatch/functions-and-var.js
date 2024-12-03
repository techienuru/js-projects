let hour = 0,
  minute = 0,
  seconds = 0;

let timerWrapperElement = document.querySelector(".js-timer-wrapper"); // The div that shows the timer

function formatTime(unit) {
  if (unit >= 10) {
    return unit;
  } else {
    return "0" + unit;
  }
}
export function renderTimer() {
  timerWrapperElement.innerText = `${formatTime(hour)}:${formatTime(
    minute
  )}:${formatTime(seconds)}`;
}

let isTimerRunning;
let intervalID;
export function startStopwatch() {
  if (!isTimerRunning) {
    intervalID = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minute++;
      }
      if (minute === 60) {
        minute = 0;
        hour++;
      }
      renderTimer();
    }, 1000);
    isTimerRunning = true;
  }
}
export function stopStopwatch() {
  if (isTimerRunning) {
    clearInterval(intervalID);
    isTimerRunning = false;
  }
}
export function resetStopwatch() {
  stopStopwatch();
  hour = 0;
  minute = 0;
  seconds = 0;
  renderTimer();
}
