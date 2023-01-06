/* Variables */

// Popups variables
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_button_edit-profile');
const popupAdd = document.querySelector('.popup_button_add-element');
const popupPic = document.querySelector('.popup_element_pic');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const formProfile = document.querySelector('.popup__form_type_profile');
const formAdd = document.querySelector('.popup__form_type_add');
const fields = document.querySelectorAll('.popup__field');
const fieldName = document.querySelector('.popup__field_type_name');
const fieldInfo = document.querySelector('.popup__field_type_info');
const fieldTitle = document.querySelector('.popup__field_type_title');
const fieldLink = document.querySelector('.popup__field_type_link');
const picLarge = document.querySelector('.popup__pic-large');
const picTitle = document.querySelector('.popup__pic-title');

//Profile variables
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//Elements variables
const elements = document.querySelector('.elements__items');
const elementTemplateItem = document.querySelector('#elements__template-item').content;


/* Functions */


//Create element from object info
const createElement = function({title, link})
{
  const element = elementTemplateItem.cloneNode(true);
  const elementTrashButton = element.querySelector('.elements__trash-button');
  const elementLikeButton = element.querySelector('.elements__like-button');
  const elementPic = element.querySelector('.elements__pic');

  //Get info from object
  element.querySelector('.elements__title').textContent = title;
  elementPic.src = link;
  elementPic.alt = title;

  //Delete element by button
  elementTrashButton.addEventListener('click', () => {
    const item = elementTrashButton.closest('.elements__item');
    item.remove();
  });

  //Like/dislike button
  elementLikeButton.addEventListener('click', () => {
    elementLikeButton.classList.toggle('elements__like-button_active')
  });

  //Open large pic
  elementPic.addEventListener('click', () => {
    showPopup(popupPic);
    showPic(elementPic)
  });

  return element;
};


//Render some element
const renderElement = function(element) {
  elements.prepend(element)
};

//Render initial elements
elementItems.reverse().map(item => {
  renderElement(createElement(item));
});


//Show some popup
const showPopup = function(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

//Close some popup
const closePopup = function(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

//Close popups by button
popupCloseButtons.forEach(item => {

  item.addEventListener('click', function() {
    closePopup(item.closest('.popup'))
  })
});

//Close popups by overlay click
popups.forEach(popup => {
  popup.addEventListener('click', function(evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
})

//Close popups by "esc"
const closeByEsc = function(evt) {
  const esc = 'Escape';
  if (evt.key === esc) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};


//Show edit-profile popup
profileEditButton.addEventListener('click', function() {
  showPopup(popupProfile);

  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubTitle.textContent

  enableValidation(validObject);
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
  showPopup(popupAdd);
  enableValidation(validObject)
});

//Add new element
formAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const item = {
    title: fieldTitle.value,
    link: fieldLink.value
  };

  renderElement(createElement(item));
  closePopup(popupAdd);

  evt.target.reset();
  enableValidation(validObject);
});


//Render pic-popup
const showPic = function(pic) {
  const elementTitle = pic.closest('.elements__item').querySelector('.elements__title');
  picLarge.src = pic.src;
  picLarge.alt = elementTitle.textContent;
  picTitle.textContent = elementTitle.textContent;
}
