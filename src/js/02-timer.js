import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const buttonElements = document.querySelector('button[data-start]');
const dayElements = document.querySelector('span[data-days]');
const hoursElements = document.querySelector('span[data-hours]');
const minutesElements = document.querySelector('span[data-minutes]');
const secondsElements = document.querySelector('span[data-seconds]');

let userDate = null;

buttonElements.setAttribute('disabled', 'disabled');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < Date.now()) {
        Notiflix.Notify.failure('Please choose a date in the future');
    } else {
        buttonElements.removeAttribute('disabled');
        userDate = selectedDates[0];
    }
    },
};

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
};

class Timer {
    constructor() {
        this.timeToEnd = [];
        this.timerId = null;
        buttonElements.disabled = true;
    }

    timerStart() {
    this.timerId = setInterval(() => {
    const timeLeft = userDate - new Date();
    const components = convertMs(timeLeft);
    dayElements.textContent = components.days.toString().padStart(2, '0');
    hoursElements.textContent = components.hours.toString().padStart(2, '0');
    minutesElements.textContent = components.minutes.toString().padStart(2, '0');
    secondsElements.textContent = components.seconds.toString().padStart(2, '0');

    this.timeToEnd = setTimeout(() => {
        clearTimeout(this.timerId);
    }, timeLeft)
    }, 1000)

    }
}

const timer = new Timer();
buttonElements.addEventListener('click', () => timer.timerStart())
flatpickr("#datetime-picker", options);