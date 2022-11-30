/* PopUp: show/close */

let popUp = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

function showPopUp() {
  if (popUp.classList.contains('popup_opened') === false) {
    popUp.classList.add('popup_opened');
  }
}

function closePopUp() {
  if (popUp.classList.contains('popup_opened') !== false) {
    popUp.classList.remove('popup_opened');
  }
  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubTitle.textContent;
}

editButton.addEventListener('click', showPopUp);
closeButton.addEventListener('click', closePopUp);

/* Form's fields: value from profile__info */

let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');
let fieldName = document.querySelector('.popup__field_type_name');
let fieldInfo = document.querySelector('.popup__field_type_info');

fieldName.value = profileTitle.textContent;
fieldInfo.value = profileSubTitle.textContent;

/* Function submit */

//let submitButton = document.querySelector('.popup__submit-button');

let form = document.querySelector('.popup__container');

function formSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = fieldName.value;
  profileSubTitle.textContent = fieldInfo.value;
  closePopUp();
}

form.addEventListener('submit', formSubmit)

/* Like: like/dislike visual

let likeButton = document.querySelector('.elements__like-button');

function like() {
  likeButton.classList.toggle('elements__like-button_active');
}

likeButton.addEventListener('click', like);
*/
