const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

let intervalId = null;

function onStartClick(e) {
  refs.startBtn.setAttribute('disabled', true);
  cangeBackgroundColor();
  intervalId = setInterval(() => cangeBackgroundColor(), 1000);
}

function onStopClick() {
  refs.startBtn.removeAttribute('disabled');
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function cangeBackgroundColor() {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
}
