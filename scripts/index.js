/* PopUp: show/close */

let popUp = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let form = document.querySelector('.popup__form');
let fieldName = document.querySelector('.popup__field_type_name');
let fieldInfo = document.querySelector('.popup__field_type_info');

let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');
let editButton = document.querySelector('.profile__edit-button');

function showPopUp() {
  popUp.classList.add('popup_opened');
  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubTitle.textContent;
}

function closePopUp() {
    popUp.classList.remove('popup_opened');
}

editButton.addEventListener('click', showPopUp);
closeButton.addEventListener('click', closePopUp);

/* Function submit */

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
