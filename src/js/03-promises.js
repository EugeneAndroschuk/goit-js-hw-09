import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');

form.addEventListener('submit', onClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) resolve({ position, delay });
      else reject({ position, delay });
    }, delay);
  });
}

function onClick(e) {
  e.preventDefault();
  let delayTimeout = +delay.value;
  const stepTimeout = +step.value;

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, delayTimeout)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {timeout: 10000,});
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, {timeout: 10000,});
      });
    delayTimeout += stepTimeout;
  }
}