const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview').children[0];
const imageFileChooser = document.querySelector('#images');
const imagePreview = document.querySelector('.ad-form__photo');

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

imageFileChooser.addEventListener('change', () => {
  const file = imageFileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const img = document.createElement('img');
      img.src = reader.result;
      img.width = imagePreview.clientWidth;
      img.height = imagePreview.clientHeight;
      imagePreview.appendChild(img);
    });
    reader.readAsDataURL(file);
  }
});

const cleanPhoto = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  imagePreview.removeChild(imagePreview.children[0]);
};

export {cleanPhoto};


