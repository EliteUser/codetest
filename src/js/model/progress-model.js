export default class ProgressBarModel {
  constructor() {
    this._progress = 0;
  }

  set progress(value) {
    this._progress = value;
  }

  get progress() {
    return this._progress;
  }
}
