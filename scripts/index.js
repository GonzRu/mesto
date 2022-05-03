const popup = document.querySelector('.popup');
const body = document.querySelector('body');
const editBtn = document.querySelector('.profile__edit');
const closeBtn = document.querySelector('.popup__close-btn');
const saveBtn = document.querySelector('.form__save-btn');

const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');

const nameLabel = document.querySelector('.profile__name');
const descriptionLabel = document.querySelector('.profile__description');

editBtn.addEventListener('click', showPopup);
closeBtn.addEventListener('click', hidePopup);
saveBtn.addEventListener('click', save);

function showPopup() {
    nameInput.value = nameLabel.textContent;
    descriptionInput.value = descriptionLabel.textContent;

    popup.classList.add('popup_opened');
    body.classList.add('page_fixed');
}

function hidePopup() {
    popup.classList.remove('popup_opened');
    body.classList.remove('page_fixed');
}

function save() {
    nameLabel.textContent = nameInput.value;
    descriptionLabel.textContent = descriptionInput.value;

    hidePopup();
}