export default class UserInfo {
    constructor({nameSelector, descriptionSelector, avatarSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            description: this._description.textContent
        };
    }

    setUserInfo({name, about, avatar}) {
        this._nameElement.textContent = name;
        this._description.textContent = about;
        this._avatar.src = avatar;
    }
}