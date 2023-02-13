export class Section {
  constructor({items, renderer}, selector, elements) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
    this.elements = document.querySelector(elements);
  }

  //Render initial cards
  renderItems() {
    this._items.reverse().map((item) => {
      this._renderer(item, this._selector);
    });
  }

  //Render new card
  addItem(element) {
    this.elements.prepend(element);
  }
}
