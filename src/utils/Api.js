class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._processResponse = this._processResponse.bind(this);
    }

    getMyUser() {
        return fetch(this._baseUrl + 'users/me', {headers: this._headers})
            .then(this._processResponse);
    }

    updateMyUser({name, about}) {
        return fetch(this._baseUrl + 'users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
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

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45/',
    headers: {
        authorization: '9e108d88-c2fd-47e7-9a58-31060be64a40',
        'Content-Type': 'application/json'
    }
});

export default api;