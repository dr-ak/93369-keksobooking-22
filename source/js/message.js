import {filterMapReset, adFormReset} from './map.js';
import {cleanPhoto} from './photo-uploader.js';

const ESC_KEY = 27;
const main = document.querySelector('main');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const error = errorTemplate.cloneNode(true);
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const success = successTemplate.cloneNode(true);

let keyDownHandler = null;
const setEscHandler = (elem) => {
  keyDownHandler = evt => {
    if (evt.keyCode === ESC_KEY) {
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
  error.addEventListener('click', (evt) => {
    evt.preventDefault();
    error.remove();
  });
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    error.remove();
    window.removeEventListener('keydown', keyDownHandler);
  });
  setEscHandler(error);
};

const showSuccessRequestMessage = () => {
  main.appendChild(success);
  success.addEventListener('click', (evt) => {
    evt.preventDefault();
    success.remove();
  });
  setEscHandler(success);
  filterMapReset();
  adFormReset();
  cleanPhoto();
};


export {showBadMessage, showSuccessRequestMessage};
