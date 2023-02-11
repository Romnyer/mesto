export class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  //Render initial cards
  renderItems() {
    this._items.reverse().map((item) => {
      this._renderer(item, this._selector);
    });
  }

  //Render new card
  addItem(item) {
    this._renderer(item, this._selector);
  }
}
