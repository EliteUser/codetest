import AbstractView from './abstract-view';

export default class TextareaView extends AbstractView {
  constructor(model, id) {
    super();
    this.model = model;
    this._id = id;
  }

  get template() {
    return `
      <div class="textarea">
        <h2><label class="textarea__label" for="textarea-${this._id}">Code ${this._id}</label></h2>
        <textarea class="textarea__input" id="textarea-${this._id}" cols="30" rows="10" placeholder="Type your code here">${this.model.input}</textarea>
      </div>
    `;
  }

  bind() {
    this.textarea = this.element.querySelector(`.textarea__input`);
    this.textarea.addEventListener(`input`, () => {
      this.onInput(this.textarea.value);
    });
  }

  onInput() {
  }
}
