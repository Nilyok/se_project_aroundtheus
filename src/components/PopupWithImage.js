import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open({ name, link }) {
    const image = this._popup.querySelector('.modal__image-preview');
    const caption = this._popup.querySelector('.modal__image-title');

    image.src = link;
    image.alt = name;
    caption.textContent = name;

    super.open();
  }
}
