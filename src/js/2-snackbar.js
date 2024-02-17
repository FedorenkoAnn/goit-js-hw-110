import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

const delayInput = this.elements.delay;
const stateInput = this.elements.state;

const delay = parseInt(delayInput.value, 10);
const state = stateInput.value;

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (state === 'fulfilled') {
      resolve(delay);
    } else {
      reject(delay);
    }
  }, delay);
});

promise
.then(delay => {
  iziToast.success({
    title: 'Success',
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'topCenter',
  });
})
.catch(delay => {
  iziToast.error({
    title: 'Error',
    message: `❌ Rejected promise in ${delay}ms`,
    position: 'topCenter',
  });
})
.finally(() => {
  // Очищення форми
  this.reset();
});
});