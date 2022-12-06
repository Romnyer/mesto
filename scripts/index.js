/* PopUp: show/close */

let popUp = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let form = document.querySelector('.popup__form');
let fieldName = document.querySelector('.popup__field_type_name');
let fieldInfo = document.querySelector('.popup__field_type_info');

let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');
let editButton = document.querySelector('.profile__edit-button');

/* Function show/close */

function showPopUp() {
  popUp.classList.add('popup_opened');
  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubTitle.textContent;
}

function closePopUp() {
    popUp.classList.remove('popup_opened');
}

/* Function submit */

function formSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = fieldName.value;
  profileSubTitle.textContent = fieldInfo.value;
  closePopUp();
}

/* Event listeners */

editButton.addEventListener('click', showPopUp);
closeButton.addEventListener('click', closePopUp);
form.addEventListener('submit', formSubmit);
/*
profileTitle.style.fontSize = '42px';
console.log(profileTitle.length);
function profileFontSize() {
  if (profileTitle.length <= 10) {
    profileTitle.style.fontSize = Math(profileTitle.style.fontSize * 0.9);
  };
}

profileFontSize;*/
/* Like: like/dislike visual

let likeButton = document.querySelector('.elements__like-button');

function like() {
  likeButton.classList.toggle('elements__like-button_active');
}

likeButton.addEventListener('click', like);
*/
