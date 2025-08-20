import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    if (!this._popup) {
      throw new Error(`PopupWithForm: element not found for selector "${popupSelector}"`);
    }
    this._form = this._popup.querySelector(".modal__form");
    if (!this._form) {
      throw new Error(`PopupWithForm: .modal__form not found inside "${popupSelector}"`);
    }

    this._handleFormSubmit = handleFormSubmit;
    this._submitBtn = this._form.querySelector(".modal__button");
    this._defaultBtnText = this._submitBtn ? this._submitBtn.textContent : "Save";
  }

 
  setSaving(isSaving, savingText = "Saving...") {
    if (!this._submitBtn) return;
    if (isSaving) {
      this._submitBtn.textContent = savingText;
      this._submitBtn.disabled = true;
      this._submitBtn.classList.add("modal__button_disabled");
    } else {
      this._submitBtn.textContent = this._defaultBtnText;
      this._submitBtn.disabled = false;
      this._submitBtn.classList.remove("modal__button_disabled");
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this.setSaving(true); 

      Promise
        .resolve(this._handleFormSubmit(this._getInputValues()))
        .finally(() => {
          this.setSaving(false); 
        });
    });
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll(".modal__input");
    return Array.from(inputs).reduce((acc, input) => {
      acc[input.name] = input.value.trim();
      return acc;
    }, {});
  }

  resetForm() {
    this._form.reset();
  }
}
