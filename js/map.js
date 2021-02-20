import offers from './data.js';
import createElement from './card-creator.js';

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const address = adForm.querySelector('#address');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFilters = mapFiltersForm.querySelectorAll('.map__filter');
const mapFeatures = mapFiltersForm.querySelector('.map__features');
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

const LAT = 35.6596;
const LNG = 139.783;

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
  // popupAnchor:  [-3, -76],// point from which the popup should open relative to the iconAnchor
});

const mainPin = L.marker([LAT, LNG], {draggable: true, icon: mainPinIcon})
  .addTo(map)
  .on('moveend', () => {
    const lat = mainPin.getLatLng().lat.toFixed(5);
    const lng = mainPin.getLatLng().lng.toFixed(5);
    address.value = lat + ', ' + lng;
  });

offers.forEach(offer => {
  const icon = L.icon ({
    iconUrl: '../leaflet/images/marker-icon.png',
    shadowUrl: '../leaflet/images/marker-shadow.png',

    iconSize:     [25, 41],
    shadowSize:   [41, 41],
    iconAnchor:   [12, 41],
    shadowAnchor: [13, 41],
  });
  const lat = offer.location.x;
  const lng = offer.location.y;
  L.marker([lat, lng], {icon: icon})
    .addTo(map)
    .bindPopup(
      createElement(offer),
      {
        keepInView: true,
      },
    );
});

