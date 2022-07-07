export class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._processResponse = this._processResponse.bind(this);
    }

    getMyUser() {
        return fetch(this._baseUrl + 'users/me', {headers: this._headers})
            .then(this._processResponse);
    }

    updateMyUser({name, about, avatar}) {
        return fetch(this._baseUrl + 'users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about,
                avatar: avatar
              })
        })
            .then(this._processResponse);
    }

    updateAvatar({avatar}) {
        return fetch(this._baseUrl + 'users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
              })
        })
            .then(this._processResponse);
    }

    getInitialCards() {
        return fetch(this._baseUrl + 'cards', {headers: this._headers})
            .then(this._processResponse);
    }

    createCard(card) {
        return fetch(this._baseUrl + 'cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(card)
        }).then(this._processResponse);
    }

    removeCard(cardId) {
        return fetch(this._baseUrl + 'cards/' + cardId, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._processResponse);
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        }).then(this._processResponse);
    }

    unlikeCard(cardId) {
        return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._processResponse);
    }

    _processResponse(response) {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
    }
}