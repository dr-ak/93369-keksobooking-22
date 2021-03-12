import {getData} from './api.js';
import {showBadMessage} from './message.js'
import {cleanPhoto} from './photo-uploader.js'
import createElement from './card-creator.js';

const LAT = 35.6596;
const LNG = 139.783;
const OFFER_COUNT = 10;
const PROCESS_DELAY = 500;
const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const address = adForm.querySelector('#address');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFilters = mapFiltersForm.querySelectorAll('.map__filter');
const mapFeatures = mapFiltersForm.querySelector('.map__features');
const type = mapFiltersForm.querySelector('#housing-type');
const price = mapFiltersForm.querySelector('#housing-price');
const rooms = mapFiltersForm.querySelector('#housing-rooms');
const guests = mapFiltersForm.querySelector('#housing-guests');
const filter = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  options: [],
  setFilter: () => {
    filter.type = type.value;
    filter.price = price.value;
    filter.rooms = rooms.value;
    filter.guests = guests.value;
    filter.setOptions();
  },
  setOptions: () => {
    filter.options = [];
    for (const checkbox of mapFiltersForm.querySelectorAll('.map__checkbox')) {
      if (checkbox.checked) {
        filter.options.push(checkbox.value)
      }
    }
  },
};
const disabledArrOfElements = arr => {
  for (const element of arr) {
    element.disabled = true;
  }
};
const enabledArrOfElements = arr => {
  for (const element of arr) {
    element.disabled = false;
  }
};

adForm.classList.add('ad-form--disabled');
disabledArrOfElements(adFormElements);
mapFiltersForm.classList.add('ad-form--disabled');
mapFeatures.disabled = true;
disabledArrOfElements(mapFilters);

const formActivate = () => {
  adForm.classList.remove('ad-form--disabled');
  enabledArrOfElements(adFormElements);
  mapFiltersForm.classList.remove('ad-form--disabled');
  mapFeatures.disabled = false;
  enabledArrOfElements(mapFilters);
};

address.value = LAT + ', ' + LNG;

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', formActivate)
  .setView({
    lat: LAT,
    lng: LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../leaflet/images/marker-icon-2x.png',
  shadowUrl: '../leaflet/images/marker-shadow.png',

  iconSize:     [50, 82],
  shadowSize:   [41, 41],
  iconAnchor:   [25, 82],
  shadowAnchor: [13, 41],
});

const mainPin = L.marker([LAT, LNG], {draggable: true, icon: mainPinIcon})
  .addTo(map)
  .on('moveend', () => {
    const lat = mainPin.getLatLng().lat.toFixed(5);
    const lng = mainPin.getLatLng().lng.toFixed(5);
    address.value = lat + ', ' + lng;
  });

const formReset = () => {
  adForm.reset();
  address.value = LAT + ', ' + LNG;
  map.setView([LAT, LNG], 12);
  mainPin.setLatLng([LAT, LNG]);
};

adForm.querySelector('.ad-form__reset').addEventListener('click', (evt) => {
  evt.preventDefault();
  formReset();
  cleanPhoto();
});

let layerGroup = null;
const processOfferList = (offers) => {
  const markers = [];
  offers
    .slice(0, OFFER_COUNT)
    .forEach(offer => {
      const icon = L.icon ({
        iconUrl: '../leaflet/images/marker-icon.png',
        shadowUrl: '../leaflet/images/marker-shadow.png',

        iconSize:     [25, 41],
        shadowSize:   [41, 41],
        iconAnchor:   [12, 41],
        shadowAnchor: [13, 41],
      });
      const marker = L.marker([offer.location.lat, offer.location.lng], {icon: icon})
        // .addTo(map)
        .bindPopup(
          createElement(offer),
          {
            keepInView: true,
          },
        );
      markers.push(marker);
    });
  layerGroup = L.layerGroup(markers).addTo(map);
};

const offerList = getData((offers) => {
  processOfferList(offers);
}, () => showBadMessage('При загрузке данных произошла ошибка!', 'Продолжить'));

/* global _:readonly */
mapFiltersForm.addEventListener('change', _.debounce(() => {
  filter.setFilter();
  layerGroup.remove();
  offerList
    .then(offers => offers.filter(offer =>
      !(filter.type !== 'any' && offer.offer.type !== filter.type
      || filter.price === 'low' && offer.offer.price >= 10000
      || filter.price === 'middle' && (offer.offer.price < 10000 || offer.offer.price >= 50000)
      || filter.price === 'high' && offer.offer.price < 50000
      || filter.rooms !== 'any' && offer.offer.rooms !== Number(filter.rooms)
      || filter.guests !== 'any' && Number(filter.guests) > offer.offer.guests
      || Number(filter.guests) === 0 && offer.offer.guests !== 0
      || !filter.options.every(option => offer.offer.features.includes(option)))))
    .then(offers => {
      processOfferList(offers);
      map.setView([LAT, LNG], 12);
    });
}, PROCESS_DELAY));

const filterMapReset = () => {
  document.querySelector('.map__filters').reset();
};

export {filterMapReset, formReset};
