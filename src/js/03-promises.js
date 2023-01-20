import Notiflix from 'notiflix';

const formElement = document.querySelector('.form');
formElement.addEventListener('submit', onFormSubmit);

function onFormSubmit(el) {
  el.preventDefault();

  let delay = Number(el.currentTarget.delay.value);
  let step = Number(el.currentTarget.step.value);
  let amount = Number(el.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
    .then(({ position, delay }) => {
      setTimeout(() => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }, delay)
    })
    .catch(({ position, delay }) => { 
      setTimeout(() => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }, delay) 
    });
  delay += step;
  }
}

function createPromise(position, delay) {
  const addShouldResolve = Math.random() > 0.3;
  let addPromiseValue = {position, delay};

return new Promise((resolve, reject) => {
    if (addShouldResolve) {
      resolve(addPromiseValue);
    } else {
      reject(addPromiseValue);
    }
  })
}
