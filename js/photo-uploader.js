const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview').children[0];
const imageFileChooser = document.querySelector('#images');
const imagePreview = document.querySelector('.ad-form__photo');

const loadAvatarHandler = (evt) => {
  avatarPreview.src = evt.target.result;
};

const loadImgHandler = (evt) => {
  const img = document.createElement('img');
  img.src = evt.target.result;
  img.width = imagePreview.clientWidth;
  img.height = imagePreview.clientHeight;
  imagePreview.appendChild(img);
};

const uploadPhoto = (fileChooser, loadHandler) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', loadHandler);
    reader.readAsDataURL(file);
  }
};

avatarFileChooser.addEventListener('change', () => {
  uploadPhoto(avatarFileChooser, loadAvatarHandler);
});

imageFileChooser.addEventListener('change', () => {
  uploadPhoto(imageFileChooser, loadImgHandler);
});

const cleanPhoto = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  for (let i = imagePreview.children.length - 1; i >= 0; i--) {
    imagePreview.removeChild(imagePreview.children[0]);
  }
};

export {cleanPhoto};


