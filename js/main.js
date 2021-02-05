// source link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomIntFromRange = (min, max) => {
  if (min < 0 || max < 0 || max <= min) {
    return null;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFromRange = (min, max, decimalLength) => {
  if (min < 0 || max < 0 || max <= min) {
    return null;
  }
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimalLength));
};

// alert(getRandomIntFromRange(1, 3));
// alert(getRandomFromRange(1.111, 3.666, 1));

const OFFERS_COUNT = 10;
const offerTypes = ['palace', 'flat', 'house', 'bungalow'];
const timePoints = ['12:00', '13:00', '14:00'];
const offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const getRandomElement = arr => arr[getRandomIntFromRange(0, arr.length - 1)];

const createOffer = () => {
  const locationX = getRandomFromRange(35.65000, 35.70000, 5);
  const locationY = getRandomFromRange(139.70000, 139.80000, 5);
  return {
    author: {avatar: 'img/avatars/user0' + getRandomIntFromRange(1, 8) + '.png'},
    offer: {
      title: 'Лучншая недвижимость в мире',
      address: locationX + ', ' + locationY,
      price: getRandomIntFromRange(1000, 1000000),
      type: getRandomElement(offerTypes),
      rooms: getRandomIntFromRange(1, 15),
      quests: getRandomIntFromRange(1, 30),
      checkin: getRandomElement(timePoints),
      checkout: getRandomElement(timePoints),
      features: offerFeatures.filter(() => getRandomIntFromRange(0, 1)),
      description: 'Только здесь и только сейчас, предложение ограничено!!!',
      photos: new Array(getRandomIntFromRange(0, 15)).fill(null).map(() => getRandomElement(photos)),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const offers = new Array(OFFERS_COUNT).fill(null).map(() => createOffer());

console.log(offers);
