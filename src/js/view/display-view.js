import AbstractView, {render} from './abstract-view';

export default class DisplayView extends AbstractView {
  constructor() {
    super();
    this._results = 0;
  }

  get template() {
    return `
      <section class="display">
        <div class="display__wrapper">
          <div>
            <label class="display__label" for="iterations">Iterations</label>
            <select class="display__select" name="iterations" id="iterations">
              <option value="10">10</option>
              <option value="100">100</option>
              <option value="1000">1 000</option>
              <option value="10000">10 000</option>
            </select>
          </div>
          <div class="display__controls">
            <button class="button display__button" id="run-button">Run test</button>
            <button class="button button--cancel button--disabled display__button" id="cancel-button" disabled>Cancel</button>
          </div>
        </div>
        
        <div class="display__results">
          <p class="display__text">Average execution time:</p>  
        </div>
      </section>
    `;
  }

  bind() {
    this.results = this.element.querySelector(`.display__results`);
    this.runButton = this.element.querySelector(`#run-button`);
    this.cancelButton = this.element.querySelector(`#cancel-button`);
    this.iterationsSelect = this.element.querySelector(`#iterations`);

    this.runButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onRun();
    });

    this.cancelButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onCancel();
    });
  }


  addResultField() {
    this._results++;
    const newResult = `
      <p class="display__text">
        <span>Code ${this._results}: </span><span class="display__result" id="result-${this._results}"></span>
      </p>
    `;
    this.results.appendChild(render(newResult));
  }

  changeResults(...values) {
    const resultOutputs = [...this.results.querySelectorAll(`[id^="result"]`)];
    for (let i = 0; i < resultOutputs.length; i++) {
      resultOutputs[i].innerText = values[i] ? `${values[i].toFixed(3)} ms` : ``;
    }
  }

  enableRunButton() {
    this.runButton.disabled = false;
    this.runButton.classList.remove(`button--disabled`);

    this.cancelButton.disabled = true;
    this.cancelButton.classList.add(`button--disabled`);
  }

  disableRunButton() {
    this.runButton.disabled = true;
    this.runButton.classList.add(`button--disabled`);

    this.cancelButton.disabled = false;
    this.cancelButton.classList.remove(`button--disabled`);
  }

  onRun() {
  }

  onCancel() {
  }
}
