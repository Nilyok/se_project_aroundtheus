export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputEls = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }

    resetValidation() {
        this._toggleButtonState();

        this._inputEls.forEach((inputEl) => {
            this._hideInputError(inputEl);
        });
    }

    _setEventListeners() {
        this._inputEls.forEach((inputEl) => {
            inputEl.addEventListener('input', () => {
                this._checkInputValidity(inputEl);
                this._toggleButtonState();
            });
        });

        this._toggleButtonState();
    }

    _checkInputValidity(inputEl) {
        if (!inputEl.validity.valid) {
            this._showInputError(inputEl);
        } else {
            this._hideInputError(inputEl);
        }
    }

    _showInputError(inputEl) {
        const errorEl = this._formElement.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._config.inputErrorClass);
        errorEl.textContent = inputEl.validationMessage;
        errorEl.classList.add(this._config.errorClass);
    }

    _hideInputError(inputEl) {
        const errorEl = this._formElement.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._config.inputErrorClass);
        errorEl.textContent = '';
        errorEl.classList.remove(this._config.errorClass);
    }

    _toggleButtonState() {
        const isValid = this._inputEls.every(input => input.validity.valid);

        if (isValid) {
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.disabled = true;
        }
    }
}