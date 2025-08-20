export default class Section {
  constructor({ items = [], renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;               // should return a DOM element
    this._container = document.querySelector(containerSelector);
    if (!this._container) {
      throw new Error(`Section: container "${containerSelector}" not found`);
    }
  }

  setItems(items = []) {
    this._items = items;
  }

  addItem(element, toStart = true) {
    if (!element) return;
    toStart ? this._container.prepend(element) : this._container.append(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems({ toStart = false } = {}) {
    this.clear();
    this._items.forEach(item => {
      const element = this._renderer(item); 
      this.addItem(element, toStart);
    });
  }
}
