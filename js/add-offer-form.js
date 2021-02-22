const type = document.querySelector('#type');
const price = document.querySelector('#price');
const minPriceValues = {
  'Бунгало': 0,
  'Квартира': 1000,
  'Дом': 5000,
  'Дворец': 10000,
}

type.addEventListener('change', () => {
  const minPrice = minPriceValues[type.options[type.selectedIndex].text];
  price.min = minPrice;
  price.placeholder = minPrice;
});

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

timeIn.addEventListener('change', () => {
  timeOut.options[timeIn.selectedIndex].selected = true;
});

timeOut.addEventListener('change', () => {
  timeIn.options[timeOut.selectedIndex].selected = true;
});

const title = document.querySelector('#title');
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;

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

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

const checkRoomNumber = () => {
  switch (roomNumber.value) {
    case '1':
      if (capacity.value !== '1') {
        capacity.setCustomValidity('Количество гостей для 1 комнаты может быть 1!');
      } else {
        capacity.setCustomValidity('');
      }
      break;
    case '2':
      if (!['1', '2'].includes(capacity.value)) {
        capacity.setCustomValidity('Количество гостей для 2 комнат может быть от 1 до 2!');
      } else {
        capacity.setCustomValidity('');
      }
      break;
    case '3':
      if (!['1', '2', '3'].includes(capacity.value)) {
        capacity.setCustomValidity('Количество гостей для 3 комнат может быть от 1 до 3!');
      } else {
        capacity.setCustomValidity('');
      }
      break;
    case '100':
      if (capacity.value !== '0') {
        capacity.setCustomValidity('100 комнат не для гостей!');
      } else {
        capacity.setCustomValidity('');
      }
  }
};

roomNumber.addEventListener('change', () => {
  checkRoomNumber();
});

capacity.addEventListener('change', () => {
  checkRoomNumber();
});
