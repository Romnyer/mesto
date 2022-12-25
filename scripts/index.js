/* Variables */

// Popups variables
const popUps = document.querySelectorAll('.popup');
const popUpProfile = document.querySelector('.popup_button_edit-profile');
const popUpAdd = document.querySelector('.popup_button_add-element');
const popUpPic = document.querySelector('.popup_element_pic');
const closeButtons = document.querySelectorAll('.popup__close-button');
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
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//Elements variables
const elements = document.querySelector('.elements__items');
const elementTemplateItem = document.querySelector('#elements__template-item').content;
let elementItems = [
  {
    title: 'Шоанинский храм',
    link: './images/Trip-pic-1.jpg'
  },

  {
    title: 'Карачаевск',
    link: './images/Trip-pic-2.jpg'
  },

  {
    title: 'Гора Эльбрус',
    link: './images/Trip-pic-3.jpg'
  },

  {
    title: 'Пятигорск',
    link: './images/Trip-pic-4.jpg'
  },

  {
    title: 'Бештау',
    link: './images/Trip-pic-5.jpg'
  },

  {
    title: 'Малый Тау',
    link: './images/Trip-pic-6.jpg'
  }
];


/* Functions */


//Create element from object info
const createElement = function({title, link})
{
  const element = elementTemplateItem.cloneNode(true);
  const trashButton = element.querySelector('.elements__trash-button');
  const likeButton = element.querySelector('.elements__like-button');
  const pic = element.querySelector('.elements__pic');

  //Get info from object
  element.querySelector('.elements__title').textContent = title;
  element.querySelector('.elements__pic').src = link;
  element.querySelector('.elements__pic').alt = title;

  //Delete element by button
  trashButton.addEventListener('click', () => {
    const item = trashButton.closest('.elements__item');
    item.remove();

    elementItems.pop(element);
    console.log(elementItems)
  });

  //Like/dislike button
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('elements__like-button_active')
  });

  //Open large pic
  pic.addEventListener('click', () => {
    showPopUp(popUpPic);
    showPic(pic)
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
const showPopUp = function(element) {
  element.classList.add('popup_opened');
}

//Close some popup
const closePopUp = function(element) {
  element.classList.remove('popup_opened');
};

//Close popups by button
closeButtons.forEach(item => {

  item.addEventListener('click', function() {
    popUp = item.closest('.popup');
    closePopUp(popUp)
  })
});

//Clean fields value
const cleanFields = function() {
  fields.forEach(item => {
    item.value = ''
  })
};


//Show edit-profile popup
editButton.addEventListener('click', function() {
  showPopUp(popUpProfile);

  fieldName.value = profileTitle.textContent;
  fieldInfo.value = profileSubTitle.textContent
});

//Edit profile info
formProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();

  profileTitle.textContent = fieldName.value;
  profileSubTitle.textContent = fieldInfo.value;
  closePopUp(popUpProfile);
});


//Show add-element popup
addButton.addEventListener('click', function () {
  showPopUp(popUpAdd)
});

//Add new element
formAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();

  item = {
    title: fieldTitle.value,
    link: fieldLink.value
  };

  renderElement(createElement(item));
  elementItems.push(item);
  closePopUp(popUpAdd);

  cleanFields()
});


//Render pic-popup
const showPic = function(pic) {
  elementTitle = pic.closest('.elements__item').querySelector('.elements__title');
  picLarge.src = pic.src;
  picTitle.textContent = elementTitle.textContent;
}

/*
elements.addEventListener('click', element => {

  trashButtons = document.querySelectorAll('.elements__trash-button');
  trashButtons.forEach(item => {
    if (item == element.composedPath()[0]) {
      const li = element.composedPath()[0].closest('.elements__item');
      li.remove();

      elementItems.pop(element);
      console.log(elementItems)
    }
  });

  likeButtons = document.querySelectorAll('.elements__like-button');
  likeButtons.forEach(item => {
    if (item == element.composedPath()[0]) {
      item.classList.toggle('elements__like-button_active')
    }
  })

  pics = document.querySelectorAll('.elements__pic');
  pics.forEach(item => {
    if (item == element.composedPath()[0]) {
      showPopUp(popUpPic);
      showPic(item)
    }
  })
});
*/
