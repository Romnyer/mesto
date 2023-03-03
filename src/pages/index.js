//Import css
import './index.css';

//Import variables
import {
  popupVars,
  profileVars,
  elements,
  elementTemplateItem,
  validObject
} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidation} from '../components/FormValidation.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupDeletePic} from '../components/PopupDeletePic.js';
import {PopupAvatarUpload} from '../components/PopupAvatarUpload.js';
import {Api} from '../components/Api.js';


/* Clases */


const profileFormValidation = new FormValidation(validObject, popupVars.formProfile);
const addFormValidation = new FormValidation(validObject, popupVars.formAdd);
const profileAvatarFormValidation = new FormValidation(validObject, popupVars.avatarUploadForm);
const popupWithImage = new PopupWithImage(popupVars.popupPic, popupVars.picLarge, popupVars.picTitle);
const userInfo = new UserInfo(profileVars.profileTitle, profileVars.profileSubTitle);
const popupDeletePic = new PopupDeletePic(popupVars.popupDeletePic, 'Удаление...');
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '8d27ca59-0126-499c-9b8e-533fb5ecd75b',
    'Content-Type': 'application/json'
  }
});


/* Actions */


/* Prepare popups */

//Show popup with image
const handleCardClick = (item) => {
  popupWithImage.open(item);
}

//Show popup for delete
const handleCardDelete = (card) => {
  popupDeletePic.open();
  popupDeletePic.setSubmitAction(() => {
    popupDeletePic.loading();
    api.deleteCard(card._cardId)
      .then(() => {
        card._deleteElementByButton();
      })
      .catch(err => console.log(err))
        .finally(() => {
          popupDeletePic.close();
          setTimeout(() => {
            popupDeletePic.endLoading();
          },500)
        });
  });
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

//Show edit avatar popup
profileVars.profileAvatarContainer.addEventListener('click', () => {
  profileAvatarFormValidation.removeErrors();
  popupAvatarUpload.open();
})

/* API */

//Set user's avatar, name and about
api.getProfileInfo()
  .then(res => {
    popupAvatarUpload.setAvatar(res.avatar);
    userInfo.setUserInfo(res.name, res.about, res._id);
  })
  .catch(err => console.log(err));

  //Render initial cards
api.getCards()
  .then(res => {
    cardsSection.renderItems(res);
  })
  .catch(err => console.log(err));

/* PROFILE */

//Submit edit profile form
const submitProfile = (newName, newAbout) => {
  popupProfileForm.loading();
  api.changeUserInfo(newName, newAbout)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
    })
    .catch(err => console.log(err))
      .finally(() => {
        popupProfileForm.close();
        setTimeout(() => {
          popupProfileForm.endLoading();
        },500)
      })
}

//Edit-profile popup
const popupProfileForm = new PopupWithForm(
  popupVars.popupProfile,
  {submitForm: (fieldValues) => {
    submitProfile(fieldValues.fieldName, fieldValues.fieldInfo);
  }},
  'Сохранение...'
);

/* AVATAR */

//Submit avatar form
const submitAvatar = (src) => {
  popupAvatarUpload.loading();
  api.changeAvatar(src)
    .then(res => {
      popupAvatarUpload.setAvatar(res.avatar);
    })
    .catch(err => console.log(err))
      .finally(() => {
        popupAvatarUpload.close();
        setTimeout(() => {
          popupAvatarUpload.endLoading();
        },500)
      })
}

//Change avatar
const popupAvatarUpload = new PopupAvatarUpload(
  popupVars.popupAvatarUpload,
  profileVars.profileAvatarPic,
  {handleAvatarChange: (fieldUpload) => {
    submitAvatar(fieldUpload);
  }},
  'Сохранение...'
);

/* CARD */

//Render card
const renderCard = (item) => {
  const card = new Card(
    item,
    elementTemplateItem,
    handleCardClick,
    handleCardDelete,
    userInfo._id,
    () => {api.likeCard(item._id)},
    () => {api.dislikeCard(item._id)}
  );
  const newCard = card.createElement();
  cardsSection.addItem(newCard);
}

//Create card
const cardsSection = new Section(renderCard, elements);

//Submit card form
const submitCard = (newName, newAbout) => {
  popupAddForm.loading();
  api.addCard(newName, newAbout)
    .then(res => {
      renderCard(res);
    })
    .catch(err => console.log(err))
      .finally(() => {
        popupAddForm.close();
        setTimeout(() => {
          popupAddForm.endLoading();
        },500)
      })
}

//Add card popup
const popupAddForm = new PopupWithForm(
  popupVars.popupAdd,
  {submitForm: (fieldValues) => {
    submitCard(fieldValues.fieldTitle, fieldValues.fieldLink);
  }},
  'Создание...'
);

/* Event listeners close and submit buttons of popups */

popupWithImage.setEventListeners();
popupProfileForm.setEventListeners();
popupAddForm.setEventListeners();
popupAvatarUpload.setEventListeners();
popupDeletePic.setEventListeners();

/* Validation popups with form */

profileFormValidation.enableValidation();
addFormValidation.enableValidation();
profileAvatarFormValidation.enableValidation();
