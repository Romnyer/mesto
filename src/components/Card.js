export class Card {
  constructor(item, template, handleCardClick, handleCardDelete, myId, likeCard, dislikeCard) {
    this._name = item.name;
    this._link = item.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._likeNumber = item.likes;
    this._likeCard = likeCard;
    this._dislikeCard = dislikeCard;
    this._ownerId = item.owner._id;
    this._cardId = item._id;
    this._myId = myId;
    this._isLiked = false;
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
    if (this.isLiked()) {
      this._elementLikeButton.classList.toggle('elements__like-button_active');
      this._isLiked = true;
    }
  }

  isLiked() {
    return this._likeNumber.some(like => {
      return like._id === this._myId;
    })
  }

  //Like/dislike button
  _likeButton() {
    if (!this._isLiked) {
      this._elementLikeButton.classList.add('elements__like-button_active');
      this._elementLikeNumber.textContent = Number(this._elementLikeNumber.textContent) + 1;

      if (this._elementLikeNumber.textContent > 0) {
        this._elementLikeNumber.classList.add('elements__like-number_active');
      }

      this._isLiked = true;
      this._likeCard();
    }

    else {
      this._elementLikeButton.classList.remove('elements__like-button_active');
      this._elementLikeNumber.textContent = Number(this._elementLikeNumber.textContent) - 1;

      if (this._elementLikeNumber.textContent < 1) {
        this._elementLikeNumber.classList.remove('elements__like-number_active');
      }

      this._isLiked = false;
      this._dislikeCard();
    }
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
      this._elementLikeNumber = null;
      this._element = null;
    },500);
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
      this._likeButton();
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
