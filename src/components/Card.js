export default class Card {
    constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
}

    _setEventListeners() {
        this._cardElement.querySelector(".card__like-button").addEventListener('click', (evt) => {
        this._handleLikeIcon(evt);
    });
        this._cardElement.querySelector(".card__delete-button").addEventListener('click', () => {
        this._handleDeleteCard();
    });
        this._cardElement.querySelector(".card__image").addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
    });

    }

    _handleLikeIcon(evt) {
        evt.target.classList.toggle("card__like-button-active");
    }

    _handleDeleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    

    getView() {
    const template = document.querySelector(this._cardSelector);

    if (!template) {
        console.error(`Template with selector '${this._cardSelector}' not found.`);
        return null;
    }

    this._cardElement = template
        .content
        .querySelector(".card")
        .cloneNode(true);

    this._cardElement.querySelector(".card__title").textContent = this._name;
    const image = this._cardElement.querySelector(".card__image");
    image.src = this._link;
    image.alt = this._name;

    this._setEventListeners();
    return this._cardElement;
    }

}