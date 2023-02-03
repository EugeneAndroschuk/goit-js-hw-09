import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');
let selectDate = new Date();
const startBtn = document.querySelector('button[data-start]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: date => {
    selectDate = date[0].getTime();
    if (selectDate < Date.now()) {
      Notify.failure('Please choose a date in the future', {position: "center-top",});
      startBtn.disabled = true;
    } else startBtn.disabled = false;
  },
};

startBtn.disabled = true;
startBtn.addEventListener('click', onCountDown);

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onCountDown() {
  setInterval(() => {
    const currentDate = Date.now();
    const diff = selectDate - currentDate;
    if (diff > 0) {
      spanDays.textContent = addLeadingZero(convertMs(diff).days);
      spanHours.textContent = addLeadingZero(convertMs(diff).hours);
      spanMinutes.textContent = addLeadingZero(convertMs(diff).minutes);
      spanSeconds.textContent = addLeadingZero(convertMs(diff).seconds);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
