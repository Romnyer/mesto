export class Card {
  constructor(item, template, handleCardClick, handleCardDelete, myId, likeCard, dislikeCard) {
    this._name = item.name;
    this._link = item.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._likeNumber = item.likes;
    this._handleLikeCard = likeCard;
    this._dislikeCard = dislikeCard;
    this._ownerId = item.owner._id;
    this.cardId = item._id;
    this._myId = myId;
    this.isLiked = false;
  }

  _createElementTemplate() {
    const element = document.querySelector(this._template).content.querySelector('.elements__item').cloneNode(true);
    return element;
  }

  //Get info from item
  _addElementInfo() {
    this._element.querySelector('.elements__title').textContent = this._name;
    this._elementPic.src = this._link;
    this._elementPic.alt = this._name;

    //If card came from server set number of likes
    if(this._likeNumber) {
      this._elementLikeNumber.textContent = this._likeNumber.length;
    }
    //Check my like
    if (this.isCardLiked()) {
      this._elementLikeButton.classList.toggle('elements__like-button_active');
      this.isLiked = true;
    }
  }

  isCardLiked() {
    return this._likeNumber.some(like => {
      return like._id === this._myId;
    })
  }

  likeCard(likesNubmer) {
    this._elementLikeButton.classList.add('elements__like-button_active');
    this._elementLikeNumber.textContent = likesNubmer;
    this.isLiked = true;
  }

  dislikeCard(likesNubmer) {
    this._elementLikeButton.classList.remove('elements__like-button_active');
    this._elementLikeNumber.textContent = likesNubmer;
    this.isLiked = false;
  }

  //Delete element by button
  deleteElementByButton() {
    this._element.classList.add('elements__item_delete');
    this._element.remove();
    this._elementTrashButton = null;
    this._elementLikeButton = null;
    this._elementPic = null;
    this._elementLikeNumber = null;
    this._element = null;
  }

  //Open pic-popup
  _openLargePic() {
    this._handleCardClick({name: this._name, link: this._link});
  }

  _setEventListeners() {
    this._elementTrashButton.addEventListener('click', () => {
      this._handleCardDelete(this);
    });
    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeCard(this);
    });
    this._elementPic.addEventListener('click', () => {
      this._openLargePic();
    });
  }

  _checkOwner() {
    if (this._ownerId !== this._myId) {
      this._elementTrashButton.removeEventListener('click', () => {
        this._handleCardDelete();
      });
      this._elementTrashButton.remove();
      this._elementTrashButton = null;
    }
  }

  createElement() {
    this._element = this._createElementTemplate();
    this._elementTrashButton = this._element.querySelector('.elements__trash-button');
    this._elementLikeButton = this._element.querySelector('.elements__like-button');
    this._elementPic = this._element.querySelector('.elements__pic');
    this._elementLikeNumber = this._element.querySelector('.elements__like-number');

    this._addElementInfo()
    this._setEventListeners();
    this._checkOwner();

    return this._element;
  }
}
