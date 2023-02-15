export class Section {
  constructor({items, renderer}, elementsSelector) {
    this._items = items;
    this._renderer = renderer;
    this._elements = document.querySelector(elementsSelector);
  }

  //Render initial cards
  renderItems() {
    this._items.reverse().map((item) => {
      this._renderer(item);
    });
  }

  //Render new card
  addItem(element) {
    this._elements.prepend(element);
  }
}
