const getData = (onSuccess, onFail) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (!response.ok) {
        onFail();
      }
      return response.json();
    })
    .then(offers => {
      onSuccess(offers);
      return offers;
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
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
