export default class UserInfo {
    constructor({nameSelector, descriptionSelector, avatarSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            id: this._id,
            name: this._nameElement.textContent,
            description: this._description.textContent,
            avatar: this._avatar.src
        };
    }

    setUserInfo({_id, name, about, avatar}) {
        this._id = _id;
        this._nameElement.textContent = name;
        this._description.textContent = about;
        this._avatar.src = avatar;
    }
}