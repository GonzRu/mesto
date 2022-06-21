export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    generateItems() {
        this._items.forEach(item => {
            const element = this._renderer(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}