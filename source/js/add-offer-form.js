import {sendData} from './api.js';
import {showBadMessage, showSuccessRequestMessage} from './message.js';

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const ADD_OFFER_ERROR_MESSAGE = 'Ошибка размещения объявления!';
const ADD_OFFER_ERROR_BUTTON = 'Попробовать снова';
const form = document.querySelector('.ad-form');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const MinPriceValues = {
  'Бунгало': 0,
  'Квартира': 1000,
  'Дом': 5000,
  'Дворец': 10000,
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    () => showSuccessRequestMessage(),
    () => showBadMessage(ADD_OFFER_ERROR_MESSAGE, ADD_OFFER_ERROR_BUTTON),
    new FormData(evt.target),
  );
});

type.addEventListener('change', () => {
  const minPrice = MinPriceValues[type.options[type.selectedIndex].text];
  price.min = minPrice;
  price.placeholder = minPrice;
});

timeIn.addEventListener('change', () => {
  timeOut.options[timeIn.selectedIndex].selected = true;
});

timeOut.addEventListener('change', () => {
  timeIn.options[timeOut.selectedIndex].selected = true;
});

const title = document.querySelector('#title');

title.addEventListener('invalid', () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else {
    title.setCustomValidity('');
  }
});

title.addEventListener('input', () => {
  const valueLength = title.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    title.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) +' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) +' симв.');
  } else {
    title.setCustomValidity('');
  }
});

const checkRoomNumber = () => {
  switch (roomNumber.value) {
    case '1':
      capacity.value !== '1'
        ? capacity.setCustomValidity('Количество гостей для 1 комнаты может быть 1!')
        : capacity.setCustomValidity('');
      break;
    case '2':
      !['1', '2'].includes(capacity.value)
        ? capacity.setCustomValidity('Количество гостей для 2 комнат может быть от 1 до 2!')
        : capacity.setCustomValidity('');
      break;
    case '3':
      !['1', '2', '3'].includes(capacity.value)
        ? capacity.setCustomValidity('Количество гостей для 3 комнат может быть от 1 до 3!')
        : capacity.setCustomValidity('');
      break;
    case '100':
      capacity.value !== '0'
        ? capacity.setCustomValidity('100 комнат не для гостей!')
        : capacity.setCustomValidity('');
  }
};

roomNumber.addEventListener('change', () => {
  checkRoomNumber();
});

capacity.addEventListener('change', () => {
  checkRoomNumber();
});

const formReset = () => {
  form.reset();
  const minPrice = MinPriceValues[type.options[type.selectedIndex].text];
  price.min = minPrice;
  price.placeholder = minPrice;
};

export {formReset};


