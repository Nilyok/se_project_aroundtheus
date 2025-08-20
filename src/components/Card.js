export default class Card {
  constructor({ name, link, _id, isLiked = false }, cardSelector, handleImageClick, handleDeleteClick, handleLikeToggle) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = Boolean(isLiked);
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeToggle = handleLikeToggle; 
  }

  getId() { return this._id; }
  isLiked() { return this._isLiked; }

  setLikeState(isLiked) {
    this._isLiked = Boolean(isLiked);
    if (this._likeBtn) {
      this._likeBtn.classList.toggle("card__like-button-active", this._isLiked);
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    const tpl = document.querySelector(this._cardSelector);
    if (!tpl) { console.error(`Template '${this._cardSelector}' not found`); return null; }
    return tpl.content.querySelector(".card").cloneNode(true);
  }

  _setEventListeners() {
    
    this._likeBtn.addEventListener("click", () => {
      if (this._handleLikeToggle) this._handleLikeToggle(this);
    });

    
    this._deleteBtn.addEventListener("click", () => {
      if (this._handleDeleteClick) this._handleDeleteClick(this);
    });

    
    this._imageEl.addEventListener("click", () => this._handleImageClick(this._name, this._link));
  }

  getView() {
    this._element = this._getTemplate();
    if (!this._element) return null;
    this._imageEl = this._element.querySelector(".card__image");
    this._titleEl = this._element.querySelector(".card__title");
    this._likeBtn = this._element.querySelector(".card__like-button");
    this._deleteBtn = this._element.querySelector(".card__delete-button");
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    this._titleEl.textContent = this._name;
    this._likeBtn.classList.toggle("card__like-button-active", this._isLiked);
    this._setEventListeners();
    return this._element;
  }
}