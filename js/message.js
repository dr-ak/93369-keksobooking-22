import {filterMapReset, formReset} from './map.js';

const main = document.querySelector('main');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const error = errorTemplate.cloneNode(true);
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const success = successTemplate.cloneNode(true);

let keyDownHandler = null;
const setEscHandler = elem => {
  keyDownHandler = evt => {
    if (evt.keyCode === 27) {
      elem.remove();
      window.removeEventListener('keydown', keyDownHandler);
    }
  };
  window.addEventListener('keydown', keyDownHandler);
};

const showBadMessage = (text, buttonName) => {
  error.querySelector('.error__message').textContent = text;
  const errorButton = error.querySelector('.error__button');
  errorButton.textContent = buttonName;
  main.appendChild(error);
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    error.remove();
    window.removeEventListener('keydown', keyDownHandler);
  });
  setEscHandler(error);
};

const showSuccessRequestMessage = () => {
  main.appendChild(success);
  setEscHandler(success);
  filterMapReset();
  formReset();
};


export {showBadMessage, showSuccessRequestMessage};
