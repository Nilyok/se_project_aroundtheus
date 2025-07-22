export default class Todo {
  constructor({ text, completed }, todoSelector, handleToggle, handleDelete) {
    this._text = text;
    this._completed = completed;
    this._todoSelector = todoSelector;
    this._handleToggle = handleToggle;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    const template = document.querySelector(this._todoSelector);
    return template.content.querySelector(".todo").cloneNode(true);
  }

  _setEventListeners() {
    this._checkbox.addEventListener("click", () => {
      this._handleToggle(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDelete(this);
    });
  }

  toggleComplete() {
    this._checkbox.checked = !this._checkbox.checked;
    this._textElement.classList.toggle("todo__text_completed");
  }

  getView() {
    this._element = this._getTemplate();
    this._textElement = this._element.querySelector(".todo__text");
    this._checkbox = this._element.querySelector(".todo__checkbox");
    this._deleteButton = this._element.querySelector(".todo__delete");

    this._textElement.textContent = this._text;
    this._checkbox.checked = this._completed;

    if (this._completed) {
      this._textElement.classList.add("todo__text_completed");
    }

    this._setEventListeners();

    return this._element;
  }
}