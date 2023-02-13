//Page elements
export const popupVars = {
  popupProfile: '.popup_button_edit-profile',
  popupAdd: '.popup_button_add-element',
  popupPic: '.popup_element_pic',
  formProfile: document.querySelector('.popup__form_type_profile'),
  formAdd: document.querySelector('.popup__form_type_add'),
  picLarge: '.popup__pic-large',
  picTitle: '.popup__pic-title'
};
export const profileVars = {
  profileTitle: '.profile__title',
  profileSubTitle: '.profile__subtitle',
  profileEditButton: document.querySelector('.profile__edit-button'),
  profileAddButton: document.querySelector('.profile__add-button')
};
export const elements = '.elements__items';

//For classes
export const elementTemplateItem = '#elements__template-item';
export const esc = 'Escape';

//Initial cards info
import temple from '../images/Trip-pic-1.jpg';
import town from '../images/Trip-pic-2.jpg';
import mountain from '../images/Trip-pic-3.jpg';
import city from '../images/Trip-pic-4.jpg';
import peak from '../images/Trip-pic-5.jpg';
import junPeak from '../images/Trip-pic-6.jpg';

export const elementItems = [
  {
    title: 'Шоанинский храм',
    link: temple
  },

  {
    title: 'Карачаевск',
    link: town
  },

  {
    title: 'Гора Эльбрус',
    link: mountain
  },

  {
    title: 'Пятигорск',
    link: city
  },

  {
    title: 'Бештау',
    link: peak
  },

  {
    title: 'Малый Тау',
    link: junPeak
  }
];

//Validation object
export const validObject = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_disable',
  inputErrorClass: 'popup__field_type_error'
};
