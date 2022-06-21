export default class UserInfo {
    constructor({nameSelector, descriptionSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            description: this._description.textContent
        };
    }

    setUserInfo({name, description}) {
        this._nameElement.textContent = name;
        this._description.textContent = description;
    }
}