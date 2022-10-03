import Notiflix from 'notiflix';

const formEl = document.querySelector('form');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', onFormInput);
let formData = {};

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
}

function onFormSubmit(e) {
  e.preventDefault();

  const firstDelay = Number(formData.delay);
  const stepDelay = Number(formData.step);
  const amount = Number(formData.amount);

  if (firstDelay < 0 || stepDelay < 0 || amount < 0) {
    Notiflix.Notify.failure('Please, enter correct data');
    e.currentTarget.reset();
    formData = {};
    return;
  }

  for (
    let delay = firstDelay, position = 1;
    position <= amount;
    delay += stepDelay, position += 1
  ) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  e.currentTarget.reset();
  formData = {};
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({
          position,
          delay
        });
      } else {
        // Reject
        reject({
          position,
          delay
        });
      }
    }, delay);
  });
}
