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
import {Api} from '../components/Api.js';


/* Clases */


const profileFormValidation = new FormValidation(validObject, popupVars.formProfile);
const addFormValidation = new FormValidation(validObject, popupVars.formAdd);
const profileAvatarFormValidation = new FormValidation(validObject, popupVars.avatarUploadForm);
const popupWithImage = new PopupWithImage(popupVars.popupPic, popupVars.picLarge, popupVars.picTitle);
const userInfo = new UserInfo(profileVars.profileTitle, profileVars.profileSubTitle, profileVars.profileAvatarPic);
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

//Show edit-profile popup
profileVars.profileEditButton.addEventListener('click', () => {
  popupProfileForm.setInputValues(userInfo.getUserInfo());

  profileFormValidation.toggleButton();

  popupProfileForm.open();
});

//Show add-card popup
profileVars.profileAddButton.addEventListener('click', () => {
  popupAddForm.open();
});

//Show edit avatar popup
profileVars.profileAvatarContainer.addEventListener('click', () => {
  popupAvatarUpload.open();
})

//Timeout for visual effect
//Without timeout user will see effect of endLoading() before popup closed
const timeoutClosing = (popup) => {
  setTimeout(() => {
    popup.endLoading();
  },500)
}

/* API */

Promise.all([api.getProfileInfo(), api.getCards()])
  .then(([userData, cards]) => {
    //Set user's avatar, name, about, id
    userInfo.setUserInfo(userData);
    //Render initial cards
    cardsSection.renderItems(cards);
  })
  .catch(err => console.log(err));

/* PROFILE */

//Submit edit profile form
const submitProfile = (newName, newAbout) => {
  popupProfileForm.loading();
  api.changeUserInfo(newName, newAbout)
    .then(res => {
      userInfo.setProfileInfo(res.name, res.about);
      popupProfileForm.close();
      timeoutClosing(popupProfileForm);
    })
    .catch(err => console.log(err))
      .finally(() => {
        timeoutClosing(popupProfileForm);
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
      userInfo.setAvatar(res.avatar);
      popupAvatarUpload.close();
      timeoutClosing(popupAvatarUpload);
    })
    .catch(err => console.log(err))
      .finally(() => {
        timeoutClosing(popupAvatarUpload);
      })
}

//Change avatar
const popupAvatarUpload = new PopupWithForm(
  popupVars.popupAvatarUpload,
  {submitForm: (fieldValues) => {
    submitAvatar(fieldValues.fieldUpload);
  }},
  'Сохранение...'
);

/* CARD */

//Delete card
const handleCardDelete = (card) => {
  popupDeletePic.open();
  popupDeletePic.setSubmitAction(() => {
    popupDeletePic.loading();
    api.deleteCard(card.cardId)
      .then(() => {
        card.deleteElementByButton();
        popupDeletePic.close();
        timeoutClosing(popupDeletePic);
      })
      .catch(err => console.log(err))
        .finally(() => {
          timeoutClosing(popupDeletePic);
        });
  });
}

const likeCard = (card) => {
  if(!card.isLiked) {
    api.likeCard(card.cardId)
    .then(res => {
      card.likeCard(res.likes.length);
    })
    .catch(err => console.log(err));
  }

  else {
    api.dislikeCard(card.cardId)
    .then(res => {
      card.dislikeCard(res.likes.length);
    })
    .catch(err => console.log(err));
  }
}

//Render card
const renderCard = (item) => {
  const card = new Card(
    item,
    elementTemplateItem,
    handleCardClick,
    handleCardDelete,
    userInfo.id,
    likeCard
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
      popupAddForm.close();
      timeoutClosing(popupAddForm);
    })
    .catch(err => console.log(err))
      .finally(() => {
        timeoutClosing(popupAddForm);
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
