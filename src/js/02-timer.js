import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const inputDate = document.getElementById('datetime-picker');
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
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

startBtn.addEventListener('click', onCountDown);

flatpickr('#datetime-picker', options);
flatpickr('#datetime-picker', {
  onClose: date => {
    selectDate = date[0].getTime();
    const selectedDate = date[0].getTime();
  },
});

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

function onCountDown() {
  setInterval(() => {
      const currentDate = Date.now();
      const diff = selectDate - currentDate;
      spanDays.textContent = addLeadingZero(convertMs(diff).days);
      spanHours.textContent = addLeadingZero(convertMs(diff).hours);
      spanMinutes.textContent = addLeadingZero(convertMs(diff).minutes);
      spanSeconds.textContent = addLeadingZero(convertMs(diff).seconds);
  }, 1000);
}

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}
