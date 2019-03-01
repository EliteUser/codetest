export default class TextareaModel {
  constructor() {
    this._input = `
    function (n = 100) {
      let sum = 0;
        for (let i = 0; i < n; i++) {
          sum += i;
        }
      return sum;
    }
    `;
  }

  get input() {
    return this._input;
  }

  set input(input) {
    this._input = input;
  }
}
