export class Api {
  constructor(config) {
    this._url =  config.baseUrl;
    this._headers = config.headers;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then(res => this.handleResponse(res));
  }

  //Get array with card's info
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(res => this.handleResponse(res));
  }

  //Add new card
  addCard(newName, newLink) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        link: newLink
      })
    })
    .then(res => this.handleResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this.handleResponse(res));
  }

  //Like card
  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this.handleResponse(res));
  }

  //Dislike card
  dislikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this.handleResponse(res));
  }

  //Change user NAME and ABOUT in url/users/me
  changeUserInfo(newName, newAbout) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
    .then(res => this.handleResponse(res));
  }

  //Change user AVATAR in url/...avatar
  changeAvatar(src) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: src
      })
    })
    .then(res => this.handleResponse(res));
  }
}
