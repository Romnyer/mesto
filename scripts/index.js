/* Variables */


// Popups variables
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_button_edit-profile');
const popupAdd = document.querySelector('.popup_button_add-element');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const formProfile = document.querySelector('.popup__form_type_profile');
const formAdd = document.querySelector('.popup__form_type_add');
const fieldName = document.querySelector('.popup__field_type_name');
const fieldInfo = document.querySelector('.popup__field_type_info');
const fieldTitle = document.querySelector('.popup__field_type_title');
const fieldLink = document.querySelector('.popup__field_type_link');

//Profile variables
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//Elements variables
const elements = document.querySelector('.elements__items');
const elementTemplateItem = document.querySelector('#elements__template-item').content.querySelector('.elements__item');

/* Import */

import {elementItems, validObject} from "./constans.js";
import {Card} from './Card.js';
import {FormValidation} from './FormValidation.js';


/* Functions */


//Render some element
const renderElement = function(element) {
  elements.prepend(new Card(element, elementTemplateItem, showPopup).createElement());
}

//Show some popup
const showPopup = function(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

//Close some popup
const closePopup = function(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

//Close popups by button
popupCloseButtons.forEach(item => {

  item.addEventListener('click', function() {
    closePopup(item.closest('.popup'));
  })
});

//Close popups by overlay click
popups.forEach(popup => {
  popup.addEventListener('click', function(evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
});

//Close popups by "esc"
const closeByEsc = function(evt) {
  const esc = 'Escape';
  if (evt.key === esc) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

//Enable validation
const enableValidation = function(form) {
  new FormValidation(validObject, form).enableValidation();
}

//Disable validation button
const disableValidButton = function(form) {
  if (!popupProfile.classList.contains('popup_opened') || !popupAdd.classList.contains('popup_opened')) {
    new FormValidation(validObject, form).disableButton();
  };
}

//Remove validation errors after popup open
const removeValidErrors = function(form) {
  new FormValidation(validObject, form).removeErrors();
}


/* Actions */


//Render initial elements
elementItems.reverse().map(item => {
  renderElement(item);
})

//Show edit-profile popup
profileEditButton.addEventListener('click', function() {
  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubTitle.textContent;

  new FormValidation(validObject, popupProfile).toggleButton();
  removeValidErrors(popupProfile);
  showPopup(popupProfile);
});

//Edit profile info
formProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();

  profileTitle.textContent = fieldName.value;
  profileSubTitle.textContent = fieldInfo.value;
  closePopup(popupProfile);
});

//Show add-element popup
profileAddButton.addEventListener('click', function () {
  removeValidErrors(popupAdd);
  showPopup(popupAdd);
});

//Add new element
formAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const item = {
    title: fieldTitle.value,
    link: fieldLink.value
  };

  renderElement(item);
  closePopup(popupAdd);

  evt.target.reset();
});

//Start validation
enableValidation(formProfile);
enableValidation(formAdd);
