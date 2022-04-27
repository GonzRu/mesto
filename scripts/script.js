const popup = document.querySelector('.popup');
const body = document.querySelector('body');
const editBtn = document.querySelector('.profile__edit');
const closeBtn = document.querySelector('.popup__close-btn');
const saveBtn = document.querySelector('.popup__save-btn');

const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');

const nameLabel = document.querySelector('.profile__name');
const descriptionLabel = document.querySelector('.profile__description');

editBtn.addEventListener('click', showPopup);
closeBtn.addEventListener('click', hidePopup);
saveBtn.addEventListener('click', save);

function showPopup() {
    nameInput.value = nameLabel.innerText;
    descriptionInput.value = descriptionLabel.innerText;

    popup.style.display = 'block';
    body.style.overflow = 'hidden';
}

function hidePopup() {
    popup.style.display = 'none';
    body.style.overflow = 'auto';
}

function save() {
    nameLabel.innerText = nameInput.value;
    descriptionLabel.innerText = descriptionInput.value;

    hidePopup();
}