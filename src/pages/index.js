//Import css
import './index.css';

//Import variables
import {
  popupVars,
  profileVars,
  elements,
  elementTemplateItem,
  elementItems,
  validObject
} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidation} from '../components/FormValidation.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';


/* Clases */


//Form clases
const profileFormValidation = new FormValidation(validObject, popupVars.formProfile);
const addFormValidation = new FormValidation(validObject, popupVars.formAdd);
const popupWithImage = new PopupWithImage(popupVars.popupPic, popupVars.picLarge, popupVars.picTitle);
const userInfo = new UserInfo(profileVars.profileTitle, profileVars.profileSubTitle);

//Show popup with image
const handleCardClick = (item) => {
  popupWithImage.open(item);
}

//Set profile info in form inputs
const setProfileInfo = () => {
  popupProfileForm._getInputValues();
  const profileInfo = userInfo.getUserInfo();
  const profileFields = popupProfileForm._fields;

  profileFields.forEach((field) => {
    field.value = profileInfo[field.name]
  })
}

//Render card
const renderCard = (item) => {
  const newCard = new Card(item, elementTemplateItem, handleCardClick);
  cardsSection.addItem(newCard.createElement());
}

//Create card
const cardsSection = new Section({
  items: elementItems,
  renderer: (item) => {
    renderCard(item);
  }
}, elements);

//Edit-profile popup
const popupProfileForm = new PopupWithForm(
  popupVars.popupProfile,
  {submitForm: (fieldValues) => {
    userInfo.setUserInfo(fieldValues.fieldName, fieldValues.fieldInfo);
  }}
);

//Add card popup
const popupAddForm = new PopupWithForm(
  popupVars.popupAdd,
  {submitForm: (fieldValues) => {
    renderCard({
      title: fieldValues.fieldTitle,
      link: fieldValues.fieldLink
    })
  }}
);


/* Actions */


//Render initial cards
cardsSection.renderItems();

//Start validation
profileFormValidation.enableValidation();
addFormValidation.enableValidation();

/* Event listeners */

popupWithImage.setEventListeners();
popupProfileForm.setEventListeners();
popupAddForm.setEventListeners();

//Show edit-profile popup
profileVars.profileEditButton.addEventListener('click', () => {
  setProfileInfo();

  profileFormValidation.toggleButton();
  profileFormValidation.removeErrors();

  popupProfileForm.open();
});

//Show add-card popup
profileVars.profileAddButton.addEventListener('click', () => {
  addFormValidation.removeErrors();
  popupAddForm.open();
});
