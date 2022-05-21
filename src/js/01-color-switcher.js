const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};

refs.stopBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

let intervalId = null;

function onStartClick(e) {
  refs.stopBtn.removeAttribute('disabled');
  refs.startBtn.setAttribute('disabled', true);
  cangeBackgroundColor();
  intervalId = setInterval(() => cangeBackgroundColor(), 1000);
}

function onStopClick() {
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function cangeBackgroundColor() {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
}
