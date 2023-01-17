//Initial cards info
export const elementItems = [
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


export class Card {
  constructor(item, template, showPopup) {
    this._template = template;
    this._title = item.title;
    this._link = item.link;
    this.showPopup = showPopup;
  }

  _createElementTemplate() {
    const element = this._template.cloneNode(true);
    return element;
  }

  //Get info from item
  _addElementInfo() {
    this._element.querySelector('.elements__title').textContent = this._title;
    this._elementPic.src = this._link;
    this._elementPic.alt = this._title;
  }

  //Delete element by button listener
  _deleteElementByButtonListener() {
    this._elementTrashButton.addEventListener('click', () => {
      const item = this._elementTrashButton.closest('.elements__item');
      item.remove();
    });
  }

  //Like/dislike button listener
  _likeButtonListener() {
    this._elementLikeButton.addEventListener('click', () => {
      this._elementLikeButton.classList.toggle('elements__like-button_active')
    });
  }

  //Open large pic listener
  _openLargePicListener() {
    this._elementPic.addEventListener('click', () => {
      const popupPic = document.querySelector('.popup_element_pic');
      this._showPopup(popupPic);
      this._showPic(this._elementPic);
    });
  }

  //Render pic-popup
  _showPic() {
    const picLarge = document.querySelector('.popup__pic-large');
    const picTitle = document.querySelector('.popup__pic-title');

    picLarge.src = this._elementPic.src;
    picLarge.alt = this._title;
    picTitle.textContent = this._title;
  }

  _setEventListeners() {
    this._deleteElementByButtonListener()
    this._likeButtonListener();
    this._openLargePicListener();
  }

  createElement() {
    this._element = this._createElementTemplate();
    this._elementTrashButton = this._element.querySelector('.elements__trash-button');
    this._elementLikeButton = this._element.querySelector('.elements__like-button');
    this._elementPic = this._element.querySelector('.elements__pic');

    this._addElementInfo()
    this._setEventListeners();

    return this._element;
  }
}
