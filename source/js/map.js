import {getData} from './api.js';
import {showBadMessage} from './message.js'
import {cleanPhoto} from './photo-uploader.js'
import {formReset} from './add-offer-form.js'
import createElement from './card-creator.js';

const FILTER_DEFAULT_VALUE = 'any';
const FILTER_LOW_PRICE_SYMBOL = 'low';
const FILTER_LOW_PRICE_NUMBER = 10000;
const FILTER_MIDDLE_PRICE_SYMBOL = 'middle';
const FILTER_HIGH_PRICE_SYMBOL = 'high';
const FILTER_HIGH_PRICE_NUMBER = 50000;
const LEAFLET_TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const LEAFLET_TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>';
const LAT = 35.6596;
const LNG = 139.783;
const OFFER_COUNT = 10;
const PROCESS_DELAY = 500;
const MAIN_ICON_SIZE_X = 50;
const MAIN_ICON_SIZE_Y = 82;
const MAIN_SHADOW_SIXE_X = 41;
const MAIN_SHADOW_SIXE_Y = 41;
const MAIN_ICON_ANCHOR_X = 25;
const MAIN_ICON_ANCHOR_Y = 82;
const MAIN_SHADOW_ANCHOR_X = 13;
const MAIN_SHADOW_ANCHOR_Y = 41;
const ICON_SIZE_X = 25;
const ICON_SIZE_Y = 41;
const SHADOW_SIXE_X = 41;
const SHADOW_SIXE_Y = 41;
const ICON_ANCHOR_X = 12;
const ICON_ANCHOR_Y = 41;
const SHADOW_ANCHOR_X = 13;
const SHADOW_ANCHOR_Y = 41;
const ICON_DIR = '../leaflet/images/';
const MAIN_MARKER_ICON = 'marker-icon-2x.png';
const MAIN_MARKER_SHADOW = 'marker-shadow.png';
const MARKER_ICON = 'marker-icon.png';
const MARKER_SHADOW = 'marker-shadow.png';
const DOWNLOAD_ERROR_MESSAGE = 'При загрузке данных произошла ошибка!';
const DOWNLOAD_ERROR_BUTTON = 'Продолжить';
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
  type: FILTER_DEFAULT_VALUE,
  price: FILTER_DEFAULT_VALUE,
  rooms: FILTER_DEFAULT_VALUE,
  guests: FILTER_DEFAULT_VALUE,
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
  LEAFLET_TILE_LAYER,
  {
    attribution: LEAFLET_TILE_LAYER_ATTRIBUTION,
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: ICON_DIR + MAIN_MARKER_ICON,
  shadowUrl: ICON_DIR + MAIN_MARKER_SHADOW,

  iconSize:     [MAIN_ICON_SIZE_X, MAIN_ICON_SIZE_Y],
  shadowSize:   [MAIN_SHADOW_SIXE_X, MAIN_SHADOW_SIXE_Y],
  iconAnchor:   [MAIN_ICON_ANCHOR_X, MAIN_ICON_ANCHOR_Y],
  shadowAnchor: [MAIN_SHADOW_ANCHOR_X, MAIN_SHADOW_ANCHOR_Y],
});

const mainPin = L.marker([LAT, LNG], {draggable: true, icon: mainPinIcon})
  .addTo(map)
  .on('moveend', () => {
    const lat = mainPin.getLatLng().lat.toFixed(5);
    const lng = mainPin.getLatLng().lng.toFixed(5);
    address.value = lat + ', ' + lng;
  });

const adFormReset = () => {
  formReset();
  address.value = LAT + ', ' + LNG;
  map.setView([LAT, LNG], 12);
  mainPin.setLatLng([LAT, LNG]);
};

adForm.querySelector('.ad-form__reset').addEventListener('click', (evt) => {
  evt.preventDefault();
  adFormReset();
  cleanPhoto();
});

let layerGroup = null;
const processOfferList = (offers) => {
  const markers = [];
  offers
    .slice(0, OFFER_COUNT)
    .forEach(offer => {
      const icon = L.icon ({
        iconUrl: ICON_DIR + MARKER_ICON,
        shadowUrl: ICON_DIR + MARKER_SHADOW,

        iconSize:     [ICON_SIZE_X, ICON_SIZE_Y],
        shadowSize:   [SHADOW_SIXE_X, SHADOW_SIXE_Y],
        iconAnchor:   [ICON_ANCHOR_X, ICON_ANCHOR_Y],
        shadowAnchor: [SHADOW_ANCHOR_X, SHADOW_ANCHOR_Y],
      });
      const marker = L.marker([offer.location.lat, offer.location.lng], {icon: icon})
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
}, () => showBadMessage(DOWNLOAD_ERROR_MESSAGE, DOWNLOAD_ERROR_BUTTON));

const checkHousingType = (offer) => !(filter.type !== FILTER_DEFAULT_VALUE && offer.offer.type !== filter.type);
const checkHousingPrice = (offer) => !(filter.price === FILTER_LOW_PRICE_SYMBOL && offer.offer.price >= FILTER_LOW_PRICE_NUMBER
  || filter.price === FILTER_MIDDLE_PRICE_SYMBOL && (offer.offer.price < FILTER_LOW_PRICE_NUMBER || offer.offer.price >= FILTER_HIGH_PRICE_NUMBER)
  || filter.price === FILTER_HIGH_PRICE_SYMBOL && offer.offer.price < FILTER_HIGH_PRICE_NUMBER);
const checkHousingRooms = (offer) => !(filter.rooms !== FILTER_DEFAULT_VALUE && offer.offer.rooms !== Number(filter.rooms));
const checkHousingGuests = (offer) => !(filter.guests !== FILTER_DEFAULT_VALUE && Number(filter.guests) > offer.offer.guests
  || Number(filter.guests) === 0 && offer.offer.guests !== 0);
const checkHousingOptions = (offer) => filter.options.every(option => offer.offer.features.includes(option));
const checkFilters = (offer) => checkHousingType(offer) && checkHousingPrice(offer) && checkHousingRooms(offer) && checkHousingGuests(offer) && checkHousingOptions(offer);

/* global _:readonly */
mapFiltersForm.addEventListener('change', _.debounce(() => {
  filter.setFilter();
  layerGroup.remove();
  offerList
    .then((offers) => {
      const sortedOffers = [];
      for (const offer of offers) {
        if (checkFilters(offer)) {
          sortedOffers.push(offer);
        }
        if (sortedOffers.length === OFFER_COUNT) {
          break;
        }
      }
      return sortedOffers;
    })
    .then((offers) => {
      processOfferList(offers);
      map.setView([LAT, LNG], 12);
    });
}, PROCESS_DELAY));

const filterMapReset = () => {
  document.querySelector('.map__filters').reset();
};

export {filterMapReset, adFormReset};
