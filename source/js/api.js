const SERVER = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  return fetch(SERVER + '/data')
    .then((response) => {
      if (!response.ok) {
        onFail();
      }
      return response.json();
    })
    .then((offers) => {
      onSuccess(offers);
      return offers;
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
