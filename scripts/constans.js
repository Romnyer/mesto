//Large pic popup
export const popupPic = document.querySelector('.popup_element_pic');
export const picLarge = document.querySelector('.popup__pic-large');
export const picTitle = document.querySelector('.popup__pic-title');

//Initial cards info
export const elementItems = [
  {
    title: 'Шоанинский храм',
    link: './images/Trip-pic-1.jpg'
  },

  {
    title: 'Карачаевск',
    link: './images/Trip-pic-2.jpg'
  },

  {
    title: 'Гора Эльбрус',
    link: './images/Trip-pic-3.jpg'
  },

  {
    title: 'Пятигорск',
    link: './images/Trip-pic-4.jpg'
  },

  {
    title: 'Бештау',
    link: './images/Trip-pic-5.jpg'
  },

  {
    title: 'Малый Тау',
    link: './images/Trip-pic-6.jpg'
  }
];

//Validation object
export const validObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_disable',
  inputErrorClass: 'popup__field_type_error'
};
