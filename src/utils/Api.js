class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getMyUser() {
        return fetch(this._baseUrl + 'users/me', {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
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