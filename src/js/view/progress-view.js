import AbstractView from './abstract-view';

export default class ProgressBarView extends AbstractView {
  constructor(model) {
    super();
    this.model = model;
  }

  get template() {
    return `
    <div class='progress'>
      <span class="progress__text">${this.model.progress}%</span>
      <div class="progress__meter"></div>
    </div>
  `;
  }

  bind() {
    this.progressMeter = this.element.querySelector(`.progress__meter`);
    this.progressText = this.element.querySelector(`.progress__text`);
  }

  changeProgress(progress) {
    this.progressMeter.style.width = `${progress}%`;
    this.progressText.innerText = `${Math.ceil(progress)}%`;
    this.onProgressChange(progress);
  }

  onProgressChange() {
  }
}
