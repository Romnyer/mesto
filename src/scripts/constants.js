//Page elements
export const popupVars = {
  popupProfile: document.querySelector('.popup_button_edit-profile'),
  popupAdd: document.querySelector('.popup_button_add-element'),
  popupPic: document.querySelector('.popup_element_pic'),
  formProfile: document.querySelector('.popup__form_type_profile'),
  formAdd: document.querySelector('.popup__form_type_add')
};
export const profileVars = {
  profileTitle: document.querySelector('.profile__title'),
  profileSubTitle: document.querySelector('.profile__subtitle'),
  profileEditButton: document.querySelector('.profile__edit-button'),
  profileAddButton: document.querySelector('.profile__add-button')
};
export const elementVars = {
  elements: document.querySelector('.elements__items'),
  elementTemplateItem: document.querySelector('#elements__template-item').content.querySelector('.elements__item')
};

//For classes
export const picLarge = document.querySelector('.popup__pic-large');
export const picTitle = document.querySelector('.popup__pic-title');
export const esc = 'Escape';
export const fieldTitle = document.querySelector('.popup__field_type_title');
export const fieldLink = document.querySelector('.popup__field_type_link');

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
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_disable',
  inputErrorClass: 'popup__field_type_error'
};
