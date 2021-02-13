import offers from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const  flatTypes = {
  'flat':  'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};
let cards = [];

offers.forEach(({author, offer}) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = flatTypes[offer.type];
  card.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.quests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  const cardFeatures = card.querySelector('.popup__features').children;
  const isContainFeature = (cardFeature) => {
    for (const feature of offer.features) {
      if (cardFeature.classList.contains('popup__feature--' + feature)) {
        return true;
      }
    }
    return false;
  };
  for (let i = cardFeatures.length - 1; i >= 0; i--) {
    if (!isContainFeature(cardFeatures[i])) {
      cardFeatures[i].remove();
    }
  }
  card.querySelector('.popup__description').textContent = offer.description;
  const photos = card.querySelector('.popup__photos');
  const photoTemplate = card.querySelector('.popup__photo');
  offer.photos.forEach(path => {
    const photo = photoTemplate.cloneNode();
    photo.src = path;
    photos.appendChild(photo);
  });
  photoTemplate.remove();
  cards.push(card);
});

// console.log(cards);
mapCanvas.appendChild(cards[0]);
