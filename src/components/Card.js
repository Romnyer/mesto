export class Card {
  constructor(item, template, handleCardClick) {
    this._title = item.title;
    this._link = item.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _createElementTemplate() {
    const element = document.querySelector(this._template).content.querySelector('.elements__item').cloneNode(true);
    return element;
  }

  //Get info from item
  _addElementInfo() {
    this._element.querySelector('.elements__title').textContent = this._title;
    this._elementPic.src = this._link;
    this._elementPic.alt = this._title;
  }

  //Delete element by button
  _deleteElementByButton() {
    this._element.classList.add('elements__item_delete');
    //Timeout for transition effect
    setTimeout(() => {
      this._element.remove();
      this._elementTrashButton = null;
      this._elementLikeButton = null;
      this._elementPic = null;
      this._element = null;
    },500);
  }

  //Like/dislike button
  _likeButton() {
    this._elementLikeButton.classList.toggle('elements__like-button_active');
  }

  //Open pic-popup
  _openLargePic() {
    this._handleCardClick({title: this._title, link: this._link});
  }

  _setEventListeners() {
    this._elementTrashButton.addEventListener('click', () => {
      this._deleteElementByButton();
    });
    this._elementLikeButton.addEventListener('click', () => {
      this._likeButton();
    });
    this._elementPic.addEventListener('click', () => {
      this._openLargePic();
    });
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
