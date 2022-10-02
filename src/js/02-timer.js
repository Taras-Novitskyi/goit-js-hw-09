import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btn.addEventListener('click', onBtnClick);
refs.btn.setAttribute('disabled', true);

let chosenTime = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    chosenTime = selectedDates[0];
    const deltaTime = selectedDates[0] - Date.now();

    if (deltaTime < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    refs.btn.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

function onBtnClick(e) {
  timerId = setInterval(() => {
    const deltaCurrentTime = chosenTime - Date.now();
    
    if (deltaCurrentTime < 1000) {
      clearInterval(timerId);
    }

    const time = convertMs(deltaCurrentTime);

    updateClockface(time);
  }, 1000);

  e.target.setAttribute('disabled', true);
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
