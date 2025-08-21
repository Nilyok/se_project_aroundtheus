import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
    this._submitBtn = this._form?.querySelector(".modal__button");
    this._defaultBtnText = this._submitBtn ? this._submitBtn.textContent : "Delete";
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setSaving(isSaving, savingText = "Deleting...") {
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
    if (!this._form) return;

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (!this._handleSubmit) return;

      this.setSaving(true, "Deleting...");
      Promise.resolve(this._handleSubmit()).finally(() => this.setSaving(false));
    });
  }
}