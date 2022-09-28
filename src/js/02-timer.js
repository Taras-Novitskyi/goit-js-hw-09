import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const btn = document.querySelector('[data-start]');
btn.addEventListener('click', onBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const deltaTime = selectedDates[0] - Date.now();

    if (deltaTime < 0) {
      window.alert('Please choose a date in the future');
    }
    console.log(deltaTime);
  },
};

flatpickr('#datetime-picker', options);

function onBtnClick() {}
