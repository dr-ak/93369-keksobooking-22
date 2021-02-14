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
