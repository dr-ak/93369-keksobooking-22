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
const DEFAULT_AVATAR = 'img/avatars/default.png';
const AVATAR = 'img/avatars/user{{xx}}.png';

const avatars = ['01', '02', '03', '04', '05', '06', '07', '08', null, null];
const getRandomAvatar = (avatars) => {
  const userId = avatars.splice(getRandomIntFromRange(0, OFFERS_COUNT - 1), 1);
  if (!userId[0]) {
    return DEFAULT_AVATAR;
  }
  return AVATAR.replace('{{xx}}', userId);
};
const offerType = ['palace', 'flat', 'house', 'bungalow'];
const timePoints = ['12:00', '13:00', '14:00'];
const offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
let photoId = 0;
const photoUrl = 'http://o0.github.io/assets/images/tokyo/hotel{{x}}.jpg';

const createOffer = () => {
  const locationX = getRandomFromRange(35.65000, 35.70000, 5);
  const locationY = getRandomFromRange(139.70000, 139.80000, 5);
  return {
    author: {avatar: getRandomAvatar(avatars)},
    offer: {
      title: 'Лучншая недвижимость в мире',
      address: locationX + ', ' + locationY,
      price: getRandomIntFromRange(1000, 1000000),
      type: offerType[getRandomIntFromRange(0, 3)],
      rooms: getRandomIntFromRange(1, 15),
      quests: getRandomIntFromRange(1, 30),
      checkin: timePoints[getRandomIntFromRange(0, 2)],
      checkout: timePoints[getRandomIntFromRange(0, 2)],
      features: offerFeatures.filter(() => getRandomIntFromRange(0, 1)),
      description: 'Только здесь и только сейчас, предложение ограничено!!!',
      photos: new Array(getRandomIntFromRange(0, 15)).fill(null).map(() => {
        photoId++;
        return photoUrl.replace('{{x}}', photoId);
      }),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const offers = new Array(OFFERS_COUNT).fill(null).map(() => createOffer());

console.log(offers);
