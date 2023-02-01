const startBtn = document.querySelector('button[data-start]');
const stoptBtn = document.querySelector('button[data-stop]');
let intervalId = 0;

startBtn.addEventListener('click', onChangeBgdColor);
stoptBtn.addEventListener('click', onStopChangeBgdColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onChangeBgdColor() {
  intervalId = setInterval(() => {
    const newBgdColor = getRandomHexColor();

    document.body.style.backgroundColor = newBgdColor;
  }, 1000);

  startBtn.disabled = true;
}

function onStopChangeBgdColor() {
  clearInterval(intervalId);
  startBtn.disabled = false;
}
