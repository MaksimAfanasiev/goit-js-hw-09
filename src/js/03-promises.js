import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayInpEl = document.querySelector('input[name="delay"]');
const stepInpEl = document.querySelector('input[name="step"]');
const amountInpEl = document.querySelector('input[name="amount"]');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let currentDelay = Number(delayInpEl.value);

  for (let i = 1; i <= Number(amountInpEl.value); i += 1) {
    if (i !== 1) {
      currentDelay += Number(stepInpEl.value);
    }

    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position,
          delay,
        });
      } else {
        reject({
          position,
          delay,
        });
      }
    }, delay);
  });

  return promise;
}
