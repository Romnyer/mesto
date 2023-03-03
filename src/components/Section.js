export class Section {
  constructor(renderer, elementsSelector) {
    this._renderer = renderer;
    this._elements = document.querySelector(elementsSelector);
  }

  //Render initial cards
  renderItems(items) {
    items.reverse().map((item) => {
      this._renderer(item);
    });
  }

  //Render new card
  addItem(element) {
    this._elements.prepend(element);
  }
}
