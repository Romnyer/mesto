//Import css
import '../pages/index.css';

//Import variables
import {popupVars, profileVars, elementVars, elementItems, validObject} from './constants.js';
import {Card} from './Card.js';
import {FormValidation} from './FormValidation.js';
import {Section} from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';


/* Clases */


//Form clases
const profileFormValidation = new FormValidation(validObject, popupVars.formProfile);
const addFormValidation = new FormValidation(validObject, popupVars.formAdd);
const popupWithImage = new PopupWithImage(popupVars.popupPic);
const userInfo = new UserInfo({
  name: profileVars.profileTitle,
  info: profileVars.profileSubTitle
});

//Show popup with image
const handleCardClick = ({title, link}) => {
  popupWithImage.open({title, link});
}

//Render initial cards
const initialCardsList = new Section({
  items: elementItems,
  renderer: (item, selector) => {
    elementVars.elements.prepend(new Card(item, selector, handleCardClick).createElement())
  }
}, elementVars.elementTemplateItem);

//Create card
const card = new Section({
  items: '',
  renderer: (item, selector) => {
    elementVars.elements.prepend(new Card(item, selector, handleCardClick).createElement())
  }
}, elementVars.elementTemplateItem);

//Edit-profile popup
const popupProfileForm = new PopupWithForm(
  popupVars.popupProfile,
  {submitForm: (fieldValues) => {
    userInfo.setUserInfo({
      name: fieldValues.fieldName,
      info: fieldValues.fieldInfo
    });
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
initialCardsList.renderItems();

//Render card
const renderCard = (item) => {
  card.addItem(item);
}

//Set profile info in form inputs
const setProfileInfo = () => {
  popupProfileForm._getInputValues();
  const profileInfo = Object.values(userInfo.getUserInfo());
  const profileFields = popupProfileForm.fields;

  for(let i=0; i < profileFields.length; i++) {
    profileFields[i].value = profileInfo[i];
  }
}

//Start validation
profileFormValidation.enableValidation();
addFormValidation.enableValidation();

/* Event listeners */

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
