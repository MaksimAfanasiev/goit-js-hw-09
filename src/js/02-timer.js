import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inpEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('button[data-start]');
const daysValEl = document.querySelector('span[data-days]');
const hoursValEl = document.querySelector('span[data-hours]');
const minutesValEl = document.querySelector('span[data-minutes]');
const secondsValEl = document.querySelector('span[data-seconds]');

let chosenDateTime = 0;
let timer = 0;
startBtnEl.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      chosenDateTime = selectedDates[0];
      startBtnEl.removeAttribute('disabled');
    }
  },
};

flatpickr(inpEl, options);

startBtnEl.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  startBtnEl.setAttribute('disabled', true);
  inpEl.setAttribute('disabled', true);
  timer = chosenDateTime.getTime() - new Date();
  const intervalId = setInterval(() => {
    if (timer >= 1000) {
      timer -= 1000;
      const { days, hours, minutes, seconds } = convertMs(timer);

      daysValEl.textContent = addLeadingZero(days.toString());
      hoursValEl.textContent = addLeadingZero(hours.toString());
      minutesValEl.textContent = addLeadingZero(minutes.toString());
      secondsValEl.textContent = addLeadingZero(seconds.toString());
    } else {
      timer = 0;
      clearInterval(intervalId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
