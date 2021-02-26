import {filterMapReset, formReset} from './map.js';

const main = document.querySelector('main');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const error = errorTemplate.cloneNode(true);
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const success = successTemplate.cloneNode(true);


const showBadDataMessage = () => {
  error.querySelector('.error__message').textContent = 'При загрузке данных произошла ошибка!';
  const errorButton = error.querySelector('.error__button');
  errorButton.textContent = 'Продолжить';
  main.appendChild(error);
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    error.remove();
  });
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      error.remove();
    }
  });
};

const showBadRequestMessage = () => {
  error.querySelector('.error__message').textContent = 'Ошибка размещения объявления!';
  const errorButton = error.querySelector('.error__button');
  errorButton.textContent = 'Попробовать снова';
  main.appendChild(error);
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    error.remove();
  });
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      error.remove();
    }
  });
};

const showSuccessRequestMessage = () => {
  main.appendChild(success);
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      success.remove();
    }
  });
  filterMapReset();
  formReset();
};


export {showBadDataMessage, showBadRequestMessage, showSuccessRequestMessage};
