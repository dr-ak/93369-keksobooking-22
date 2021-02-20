const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const  flatTypes = {
  'flat':  'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};

export default (data) => {
  const author = data.author;
  const offer = data.offer;
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = flatTypes[offer.type];
  card.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.quests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  const cardFeatures = card.querySelector('.popup__features');
  const cardFeatureTemplate = cardFeatures.querySelector('.popup__feature');
  cardFeatures.innerHTML = '';
  offer.features.forEach(feature => {
    const element = cardFeatureTemplate.cloneNode();
    element.className = 'popup__feature popup__feature--' + feature;
    cardFeatures.appendChild(element);
  });
  card.querySelector('.popup__description').textContent = offer.description;
  const photos = card.querySelector('.popup__photos');
  const photoTemplate = card.querySelector('.popup__photo');
  offer.photos.forEach(path => {
    const photo = photoTemplate.cloneNode();
    photo.src = path;
    photos.appendChild(photo);
  });
  photoTemplate.remove();
  return card;
};
