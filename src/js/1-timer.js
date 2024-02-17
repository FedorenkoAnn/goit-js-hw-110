import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

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

function addLeadingZero(num) {
  return num.toString().padStart(2, '0');
}

function updateTimer(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

const datePicker = flatpickr('#datetime-picker', options);

const startBtn = document.querySelector('.button');

startBtn.addEventListener('click', () => {
  const currentDate = new Date();
  const timeDiff = userSelectedDate - currentDate;

  const { days, hours, minutes, seconds } = convertMs(timeDiff);

  updateTimer(days, hours, minutes, seconds);

  const timerInterval = setInterval(() => {
    const currentTime = new Date();
    const updatedTimeDiff = userSelectedDate - currentTime;

    if (updatedTimeDiff <= 0) {
      clearInterval(timerInterval);
      updateTimer(0, 0, 0, 0);
      iziToast.success({
        title: "Time's up!",
        message: 'The countdown has ended.',
        position: 'topCenter',
      });
    } else {
      const { days, hours, minutes, seconds } = convertMs(updatedTimeDiff);
      updateTimer(days, hours, minutes, seconds);
    }
  }, 1000);

  datePicker.destroy();
  startBtn.disabled = true;
});