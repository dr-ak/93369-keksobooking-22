// source link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomIntFromRange = (min, max) => {
  if (min < 0 || max < 0) {
    return null;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFromRange = (min, max, decimalLength) => {
  if (min < 0 || max < 0) {
    return null;
  }
  return + (Math.random() * (max - min) + min).toFixed(decimalLength);
};

alert(getRandomIntFromRange(1, 3));
alert(getRandomFromRange(1.111, 3.666, 1));
