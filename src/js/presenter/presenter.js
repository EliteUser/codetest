import ProgressBarModel from "../model/progress-model";
import ProgressBarView from "../view/progress-view";
import TextareaModel from "../model/textarea-model";
import TextareaView from "../view/textarea-view";
import DisplayView from "../view/display-view";
import {runCalculations, getMeanTime, executionTimer} from "../data/calculations";
import {getTiming} from "../util";

export default class UserPresenter {
  constructor() {
    this._textareaNumber = 0;
  }

  showProgressBar() {
    const display = document.querySelector(`.display__controls`);

    this.progressModel = new ProgressBarModel();
    this.progressView = new ProgressBarView(this.progressModel);

    this.progressView.onProgressChange = (value) => {
      this.progressModel.progress = value;
    };

    display.appendChild(this.progressView.element);
  }

  showTextarea(id) {
    const mainContainer = document.querySelector(`.page-main__inputs`);

    this._textareaNumber++;
    this.displayView.addResultField();

    this[`textareaModel${this._textareaNumber}`] = new TextareaModel();
    this[`textareaView${this._textareaNumber}`] = new TextareaView(this[`textareaModel${this._textareaNumber}`], id);

    ((currentElement) => {
      this[`textareaView${this._textareaNumber}`].onInput = (value) => {
        this[`textareaModel${currentElement}`].input = value;
      };
    })(this._textareaNumber);

    mainContainer.appendChild(this[`textareaView${this._textareaNumber}`].element);
  }

  showDisplay() {
    const main = document.querySelector(`.page-main`);

    this.displayView = new DisplayView();

    this.displayView.onRun = () => {
      for (let i = 0; i < this._textareaNumber; i++) {
        this[`textareaView${i + 1}`].textarea.classList.remove(`textarea__input--error`);
      }

      const functions = [];
      for (let i = 1; i <= this._textareaNumber; i++) {
        const context = this[`textareaView${i}`];
        const input = this[`textareaView${i}`].model.input;
        functions.push(this.executeInput.bind(context, input));
      }

      const iterations = this.displayView.iterationsSelect.value;
      const onStep = this.progressView.changeProgress.bind(this.progressView);
      const onFinish = ([...args]) => {
        this.displayView.enableRunButton();
        this.displayView.changeResults(...args.map(getMeanTime));
      };

      const onError = (err) => {
        this.progressView.changeProgress(0);

        if (err.message === `Cant create new function`) {
          err.view.textarea.classList.add(`textarea__input--error`);
        }
      };

      this.displayView.disableRunButton();

      runCalculations(functions, iterations, onStep, onFinish, onError);
    };

    this.displayView.onCancel = () => {
      clearTimeout(executionTimer);
      this.displayView.enableRunButton();
      this.progressView.changeProgress(0);
      this.displayView.changeResults();
    };

    main.appendChild(this.displayView.element);
  }

  executeInput(input, iterations) {
    let result = null;

    if (!input) {
      throw new Error(`Empty input`);
    }

    const func = new Function(`return (${input})(${iterations})`);

    try {
      result = getTiming(func)();
    } catch (err) {
      let error = new Error(`Cant create new function`);
      error.view = this;
      throw error;
    }

    return result;
  }
}
