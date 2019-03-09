/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/data/calculations.js":
/*!*************************************!*\
  !*** ./src/js/data/calculations.js ***!
  \*************************************/
/*! exports provided: executionTimer, runCalculations, getMeanTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "executionTimer", function() { return executionTimer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runCalculations", function() { return runCalculations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMeanTime", function() { return getMeanTime; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/js/util.js");


let executionTimer = null;

const runCalculations = (functions, iterations, onStep, onFinish, onError) => {
  let index = 1;
  let calcResult;
  let results = [];
  let currentFunctionIndex = 0;

  iterations *= functions.length;

  const delta = 100 / iterations;
  const interval = Math.ceil(1 / delta);

  for (let i = 0; i < functions.length; i++) {
    results[i] = [];
  }

  const nextStep = () => {
    if (currentFunctionIndex > functions.length - 1) {
      currentFunctionIndex = 0;
    }

    try {
      calcResult = functions[currentFunctionIndex]();
    } catch (err) {
      calcResult = {};
      clearTimeout(executionTimer);
      onError(err);
    }

    if (calcResult) {
      if (index % interval === 0) {
        onStep(index * delta);
      }

      results[currentFunctionIndex].push(calcResult);
    }

    if (index < iterations && calcResult) {
      executionTimer = setTimeout(nextStep, 0);
      currentFunctionIndex++;
      index++;
    } else {
      onFinish(results);
    }
  };

  executionTimer = setTimeout(nextStep, 0);
  return results;
};

const getMeanTime = (array) => {
  let resultTimes = [];

  for (let elem of array) {
    resultTimes.push(elem.time);
  }

  return Object(_util__WEBPACK_IMPORTED_MODULE_0__["getMeanValue"])(resultTimes);
};


/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _presenter_presenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./presenter/presenter */ "./src/js/presenter/presenter.js");


const control = new _presenter_presenter__WEBPACK_IMPORTED_MODULE_0__["default"]();
control.showDisplay();
control.showProgressBar();
control.showTextarea(1);
control.showTextarea(2);


/***/ }),

/***/ "./src/js/model/progress-model.js":
/*!****************************************!*\
  !*** ./src/js/model/progress-model.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProgressBarModel; });
class ProgressBarModel {
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


/***/ }),

/***/ "./src/js/model/textarea-model.js":
/*!****************************************!*\
  !*** ./src/js/model/textarea-model.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextareaModel; });
class TextareaModel {
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


/***/ }),

/***/ "./src/js/presenter/presenter.js":
/*!***************************************!*\
  !*** ./src/js/presenter/presenter.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserPresenter; });
/* harmony import */ var _model_progress_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/progress-model */ "./src/js/model/progress-model.js");
/* harmony import */ var _view_progress_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/progress-view */ "./src/js/view/progress-view.js");
/* harmony import */ var _model_textarea_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/textarea-model */ "./src/js/model/textarea-model.js");
/* harmony import */ var _view_textarea_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/textarea-view */ "./src/js/view/textarea-view.js");
/* harmony import */ var _view_display_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/display-view */ "./src/js/view/display-view.js");
/* harmony import */ var _data_calculations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/calculations */ "./src/js/data/calculations.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util */ "./src/js/util.js");








class UserPresenter {
  constructor() {
    this._textareaNumber = 0;
  }

  showProgressBar() {
    const display = document.querySelector(`.display__controls`);

    this.progressModel = new _model_progress_model__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.progressView = new _view_progress_view__WEBPACK_IMPORTED_MODULE_1__["default"](this.progressModel);

    this.progressView.onProgressChange = (value) => {
      this.progressModel.progress = value;
    };

    display.appendChild(this.progressView.element);
  }

  showTextarea(id) {
    const mainContainer = document.querySelector(`.page-main__inputs`);

    this._textareaNumber++;
    this.displayView.addResultField();

    this[`textareaModel${this._textareaNumber}`] = new _model_textarea_model__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this[`textareaView${this._textareaNumber}`] = new _view_textarea_view__WEBPACK_IMPORTED_MODULE_3__["default"](this[`textareaModel${this._textareaNumber}`], id);

    ((currentElement) => {
      this[`textareaView${this._textareaNumber}`].onInput = (value) => {
        this[`textareaModel${currentElement}`].input = value;
      };
    })(this._textareaNumber);

    mainContainer.appendChild(this[`textareaView${this._textareaNumber}`].element);
  }

  showDisplay() {
    const main = document.querySelector(`.page-main`);

    this.displayView = new _view_display_view__WEBPACK_IMPORTED_MODULE_4__["default"]();

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
        this.displayView.changeResults(...args.map(_data_calculations__WEBPACK_IMPORTED_MODULE_5__["getMeanTime"]));
      };

      const onError = (err) => {
        this.progressView.changeProgress(0);

        if (err.message === `Cant create new function`) {
          err.view.textarea.classList.add(`textarea__input--error`);
        }
      };

      this.displayView.disableRunButton();

      Object(_data_calculations__WEBPACK_IMPORTED_MODULE_5__["runCalculations"])(functions, iterations, onStep, onFinish, onError);
    };

    this.displayView.onCancel = () => {
      clearTimeout(_data_calculations__WEBPACK_IMPORTED_MODULE_5__["executionTimer"]);
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
      result = Object(_util__WEBPACK_IMPORTED_MODULE_6__["getTiming"])(func)();
    } catch (err) {
      let error = new Error(`Cant create new function`);
      error.view = this;
      throw error;
    }

    return result;
  }
}


/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/*! exports provided: getTiming, getMeanValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTiming", function() { return getTiming; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMeanValue", function() { return getMeanValue; });
const getTiming = function (f) {
  return function (...args) {
    const start = performance.now();
    const result = f.call(null, ...args);
    const time = performance.now() - start;

    return {result, time};
  };
};

const getMeanValue = (array) => {
  return array.reduce((acc, value) => (acc + value), 0) / array.length;
};


/***/ }),

/***/ "./src/js/view/abstract-view.js":
/*!**************************************!*\
  !*** ./src/js/view/abstract-view.js ***!
  \**************************************/
/*! exports provided: render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractView; });
const render = (html) => {
  const wrapper = document.createElement(`template`);
  wrapper.innerHTML = html.trim();
  return wrapper.content;
};

class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  render() {
    return render(this.template);
  }

  bind() {
    /* bind handlers if required */
  }
}


/***/ }),

/***/ "./src/js/view/display-view.js":
/*!*************************************!*\
  !*** ./src/js/view/display-view.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DisplayView; });
/* harmony import */ var _abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view */ "./src/js/view/abstract-view.js");


class DisplayView extends _abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    this.results.appendChild(Object(_abstract_view__WEBPACK_IMPORTED_MODULE_0__["render"])(newResult));
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


/***/ }),

/***/ "./src/js/view/progress-view.js":
/*!**************************************!*\
  !*** ./src/js/view/progress-view.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProgressBarView; });
/* harmony import */ var _abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view */ "./src/js/view/abstract-view.js");


class ProgressBarView extends _abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ }),

/***/ "./src/js/view/textarea-view.js":
/*!**************************************!*\
  !*** ./src/js/view/textarea-view.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextareaView; });
/* harmony import */ var _abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view */ "./src/js/view/abstract-view.js");


class TextareaView extends _abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2RhdGEvY2FsY3VsYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2RlbC9wcm9ncmVzcy1tb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kZWwvdGV4dGFyZWEtbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ByZXNlbnRlci9wcmVzZW50ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvYWJzdHJhY3Qtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9kaXNwbGF5LXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvcHJvZ3Jlc3Mtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy90ZXh0YXJlYS12aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFp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QSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL21haW4uanNcIik7XG4iLCJpbXBvcnQge2dldE1lYW5WYWx1ZX0gZnJvbSBcIi4uL3V0aWxcIjtcblxuZXhwb3J0IGxldCBleGVjdXRpb25UaW1lciA9IG51bGw7XG5cbmV4cG9ydCBjb25zdCBydW5DYWxjdWxhdGlvbnMgPSAoZnVuY3Rpb25zLCBpdGVyYXRpb25zLCBvblN0ZXAsIG9uRmluaXNoLCBvbkVycm9yKSA9PiB7XG4gIGxldCBpbmRleCA9IDE7XG4gIGxldCBjYWxjUmVzdWx0O1xuICBsZXQgcmVzdWx0cyA9IFtdO1xuICBsZXQgY3VycmVudEZ1bmN0aW9uSW5kZXggPSAwO1xuXG4gIGl0ZXJhdGlvbnMgKj0gZnVuY3Rpb25zLmxlbmd0aDtcblxuICBjb25zdCBkZWx0YSA9IDEwMCAvIGl0ZXJhdGlvbnM7XG4gIGNvbnN0IGludGVydmFsID0gTWF0aC5jZWlsKDEgLyBkZWx0YSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmdW5jdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICByZXN1bHRzW2ldID0gW107XG4gIH1cblxuICBjb25zdCBuZXh0U3RlcCA9ICgpID0+IHtcbiAgICBpZiAoY3VycmVudEZ1bmN0aW9uSW5kZXggPiBmdW5jdGlvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgY3VycmVudEZ1bmN0aW9uSW5kZXggPSAwO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjYWxjUmVzdWx0ID0gZnVuY3Rpb25zW2N1cnJlbnRGdW5jdGlvbkluZGV4XSgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY2FsY1Jlc3VsdCA9IHt9O1xuICAgICAgY2xlYXJUaW1lb3V0KGV4ZWN1dGlvblRpbWVyKTtcbiAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsY1Jlc3VsdCkge1xuICAgICAgaWYgKGluZGV4ICUgaW50ZXJ2YWwgPT09IDApIHtcbiAgICAgICAgb25TdGVwKGluZGV4ICogZGVsdGEpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRzW2N1cnJlbnRGdW5jdGlvbkluZGV4XS5wdXNoKGNhbGNSZXN1bHQpO1xuICAgIH1cblxuICAgIGlmIChpbmRleCA8IGl0ZXJhdGlvbnMgJiYgY2FsY1Jlc3VsdCkge1xuICAgICAgZXhlY3V0aW9uVGltZXIgPSBzZXRUaW1lb3V0KG5leHRTdGVwLCAwKTtcbiAgICAgIGN1cnJlbnRGdW5jdGlvbkluZGV4Kys7XG4gICAgICBpbmRleCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbkZpbmlzaChyZXN1bHRzKTtcbiAgICB9XG4gIH07XG5cbiAgZXhlY3V0aW9uVGltZXIgPSBzZXRUaW1lb3V0KG5leHRTdGVwLCAwKTtcbiAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0TWVhblRpbWUgPSAoYXJyYXkpID0+IHtcbiAgbGV0IHJlc3VsdFRpbWVzID0gW107XG5cbiAgZm9yIChsZXQgZWxlbSBvZiBhcnJheSkge1xuICAgIHJlc3VsdFRpbWVzLnB1c2goZWxlbS50aW1lKTtcbiAgfVxuXG4gIHJldHVybiBnZXRNZWFuVmFsdWUocmVzdWx0VGltZXMpO1xufTtcbiIsImltcG9ydCBVc2VyUHJlc2VudGVyIGZyb20gJy4vcHJlc2VudGVyL3ByZXNlbnRlcic7XG5cbmNvbnN0IGNvbnRyb2wgPSBuZXcgVXNlclByZXNlbnRlcigpO1xuY29udHJvbC5zaG93RGlzcGxheSgpO1xuY29udHJvbC5zaG93UHJvZ3Jlc3NCYXIoKTtcbmNvbnRyb2wuc2hvd1RleHRhcmVhKDEpO1xuY29udHJvbC5zaG93VGV4dGFyZWEoMik7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9ncmVzc0Jhck1vZGVsIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fcHJvZ3Jlc3MgPSAwO1xuICB9XG5cbiAgc2V0IHByb2dyZXNzKHZhbHVlKSB7XG4gICAgdGhpcy5fcHJvZ3Jlc3MgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBwcm9ncmVzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvZ3Jlc3M7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRhcmVhTW9kZWwge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9pbnB1dCA9IGBcbiAgICBmdW5jdGlvbiAobiA9IDEwMCkge1xuICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgc3VtICs9IGk7XG4gICAgICAgIH1cbiAgICAgIHJldHVybiBzdW07XG4gICAgfVxuICAgIGA7XG4gIH1cblxuICBnZXQgaW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lucHV0O1xuICB9XG5cbiAgc2V0IGlucHV0KGlucHV0KSB7XG4gICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcbiAgfVxufVxuIiwiaW1wb3J0IFByb2dyZXNzQmFyTW9kZWwgZnJvbSBcIi4uL21vZGVsL3Byb2dyZXNzLW1vZGVsXCI7XG5pbXBvcnQgUHJvZ3Jlc3NCYXJWaWV3IGZyb20gXCIuLi92aWV3L3Byb2dyZXNzLXZpZXdcIjtcbmltcG9ydCBUZXh0YXJlYU1vZGVsIGZyb20gXCIuLi9tb2RlbC90ZXh0YXJlYS1tb2RlbFwiO1xuaW1wb3J0IFRleHRhcmVhVmlldyBmcm9tIFwiLi4vdmlldy90ZXh0YXJlYS12aWV3XCI7XG5pbXBvcnQgRGlzcGxheVZpZXcgZnJvbSBcIi4uL3ZpZXcvZGlzcGxheS12aWV3XCI7XG5pbXBvcnQge3J1bkNhbGN1bGF0aW9ucywgZ2V0TWVhblRpbWUsIGV4ZWN1dGlvblRpbWVyfSBmcm9tIFwiLi4vZGF0YS9jYWxjdWxhdGlvbnNcIjtcbmltcG9ydCB7Z2V0VGltaW5nfSBmcm9tIFwiLi4vdXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyUHJlc2VudGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdGV4dGFyZWFOdW1iZXIgPSAwO1xuICB9XG5cbiAgc2hvd1Byb2dyZXNzQmFyKCkge1xuICAgIGNvbnN0IGRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZGlzcGxheV9fY29udHJvbHNgKTtcblxuICAgIHRoaXMucHJvZ3Jlc3NNb2RlbCA9IG5ldyBQcm9ncmVzc0Jhck1vZGVsKCk7XG4gICAgdGhpcy5wcm9ncmVzc1ZpZXcgPSBuZXcgUHJvZ3Jlc3NCYXJWaWV3KHRoaXMucHJvZ3Jlc3NNb2RlbCk7XG5cbiAgICB0aGlzLnByb2dyZXNzVmlldy5vblByb2dyZXNzQ2hhbmdlID0gKHZhbHVlKSA9PiB7XG4gICAgICB0aGlzLnByb2dyZXNzTW9kZWwucHJvZ3Jlc3MgPSB2YWx1ZTtcbiAgICB9O1xuXG4gICAgZGlzcGxheS5hcHBlbmRDaGlsZCh0aGlzLnByb2dyZXNzVmlldy5lbGVtZW50KTtcbiAgfVxuXG4gIHNob3dUZXh0YXJlYShpZCkge1xuICAgIGNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGFnZS1tYWluX19pbnB1dHNgKTtcblxuICAgIHRoaXMuX3RleHRhcmVhTnVtYmVyKys7XG4gICAgdGhpcy5kaXNwbGF5Vmlldy5hZGRSZXN1bHRGaWVsZCgpO1xuXG4gICAgdGhpc1tgdGV4dGFyZWFNb2RlbCR7dGhpcy5fdGV4dGFyZWFOdW1iZXJ9YF0gPSBuZXcgVGV4dGFyZWFNb2RlbCgpO1xuICAgIHRoaXNbYHRleHRhcmVhVmlldyR7dGhpcy5fdGV4dGFyZWFOdW1iZXJ9YF0gPSBuZXcgVGV4dGFyZWFWaWV3KHRoaXNbYHRleHRhcmVhTW9kZWwke3RoaXMuX3RleHRhcmVhTnVtYmVyfWBdLCBpZCk7XG5cbiAgICAoKGN1cnJlbnRFbGVtZW50KSA9PiB7XG4gICAgICB0aGlzW2B0ZXh0YXJlYVZpZXcke3RoaXMuX3RleHRhcmVhTnVtYmVyfWBdLm9uSW5wdXQgPSAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpc1tgdGV4dGFyZWFNb2RlbCR7Y3VycmVudEVsZW1lbnR9YF0uaW5wdXQgPSB2YWx1ZTtcbiAgICAgIH07XG4gICAgfSkodGhpcy5fdGV4dGFyZWFOdW1iZXIpO1xuXG4gICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzW2B0ZXh0YXJlYVZpZXcke3RoaXMuX3RleHRhcmVhTnVtYmVyfWBdLmVsZW1lbnQpO1xuICB9XG5cbiAgc2hvd0Rpc3BsYXkoKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wYWdlLW1haW5gKTtcblxuICAgIHRoaXMuZGlzcGxheVZpZXcgPSBuZXcgRGlzcGxheVZpZXcoKTtcblxuICAgIHRoaXMuZGlzcGxheVZpZXcub25SdW4gPSAoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RleHRhcmVhTnVtYmVyOyBpKyspIHtcbiAgICAgICAgdGhpc1tgdGV4dGFyZWFWaWV3JHtpICsgMX1gXS50ZXh0YXJlYS5jbGFzc0xpc3QucmVtb3ZlKGB0ZXh0YXJlYV9faW5wdXQtLWVycm9yYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZ1bmN0aW9ucyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy5fdGV4dGFyZWFOdW1iZXI7IGkrKykge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpc1tgdGV4dGFyZWFWaWV3JHtpfWBdO1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXNbYHRleHRhcmVhVmlldyR7aX1gXS5tb2RlbC5pbnB1dDtcbiAgICAgICAgZnVuY3Rpb25zLnB1c2godGhpcy5leGVjdXRlSW5wdXQuYmluZChjb250ZXh0LCBpbnB1dCkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpdGVyYXRpb25zID0gdGhpcy5kaXNwbGF5Vmlldy5pdGVyYXRpb25zU2VsZWN0LnZhbHVlO1xuICAgICAgY29uc3Qgb25TdGVwID0gdGhpcy5wcm9ncmVzc1ZpZXcuY2hhbmdlUHJvZ3Jlc3MuYmluZCh0aGlzLnByb2dyZXNzVmlldyk7XG4gICAgICBjb25zdCBvbkZpbmlzaCA9IChbLi4uYXJnc10pID0+IHtcbiAgICAgICAgdGhpcy5kaXNwbGF5Vmlldy5lbmFibGVSdW5CdXR0b24oKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5Vmlldy5jaGFuZ2VSZXN1bHRzKC4uLmFyZ3MubWFwKGdldE1lYW5UaW1lKSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvbkVycm9yID0gKGVycikgPT4ge1xuICAgICAgICB0aGlzLnByb2dyZXNzVmlldy5jaGFuZ2VQcm9ncmVzcygwKTtcblxuICAgICAgICBpZiAoZXJyLm1lc3NhZ2UgPT09IGBDYW50IGNyZWF0ZSBuZXcgZnVuY3Rpb25gKSB7XG4gICAgICAgICAgZXJyLnZpZXcudGV4dGFyZWEuY2xhc3NMaXN0LmFkZChgdGV4dGFyZWFfX2lucHV0LS1lcnJvcmApO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmRpc3BsYXlWaWV3LmRpc2FibGVSdW5CdXR0b24oKTtcblxuICAgICAgcnVuQ2FsY3VsYXRpb25zKGZ1bmN0aW9ucywgaXRlcmF0aW9ucywgb25TdGVwLCBvbkZpbmlzaCwgb25FcnJvcik7XG4gICAgfTtcblxuICAgIHRoaXMuZGlzcGxheVZpZXcub25DYW5jZWwgPSAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQoZXhlY3V0aW9uVGltZXIpO1xuICAgICAgdGhpcy5kaXNwbGF5Vmlldy5lbmFibGVSdW5CdXR0b24oKTtcbiAgICAgIHRoaXMucHJvZ3Jlc3NWaWV3LmNoYW5nZVByb2dyZXNzKDApO1xuICAgICAgdGhpcy5kaXNwbGF5Vmlldy5jaGFuZ2VSZXN1bHRzKCk7XG4gICAgfTtcblxuICAgIG1haW4uYXBwZW5kQ2hpbGQodGhpcy5kaXNwbGF5Vmlldy5lbGVtZW50KTtcbiAgfVxuXG4gIGV4ZWN1dGVJbnB1dChpbnB1dCwgaXRlcmF0aW9ucykge1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuXG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFbXB0eSBpbnB1dGApO1xuICAgIH1cblxuICAgIGNvbnN0IGZ1bmMgPSBuZXcgRnVuY3Rpb24oYHJldHVybiAoJHtpbnB1dH0pKCR7aXRlcmF0aW9uc30pYCk7XG5cbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gZ2V0VGltaW5nKGZ1bmMpKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsZXQgZXJyb3IgPSBuZXcgRXJyb3IoYENhbnQgY3JlYXRlIG5ldyBmdW5jdGlvbmApO1xuICAgICAgZXJyb3IudmlldyA9IHRoaXM7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgZ2V0VGltaW5nID0gZnVuY3Rpb24gKGYpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBjb25zdCByZXN1bHQgPSBmLmNhbGwobnVsbCwgLi4uYXJncyk7XG4gICAgY29uc3QgdGltZSA9IHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnQ7XG5cbiAgICByZXR1cm4ge3Jlc3VsdCwgdGltZX07XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0TWVhblZhbHVlID0gKGFycmF5KSA9PiB7XG4gIHJldHVybiBhcnJheS5yZWR1Y2UoKGFjYywgdmFsdWUpID0+IChhY2MgKyB2YWx1ZSksIDApIC8gYXJyYXkubGVuZ3RoO1xufTtcbiIsImV4cG9ydCBjb25zdCByZW5kZXIgPSAoaHRtbCkgPT4ge1xuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgdGVtcGxhdGVgKTtcbiAgd3JhcHBlci5pbm5lckhUTUwgPSBodG1sLnRyaW0oKTtcbiAgcmV0dXJuIHdyYXBwZXIuY29udGVudDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFic3RyYWN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmIChuZXcudGFyZ2V0ID09PSBBYnN0cmFjdFZpZXcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgaW5zdGFudGlhdGUgQWJzdHJhY3RWaWV3LCBvbmx5IGNvbmNyZXRlIG9uZWApO1xuICAgIH1cbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRlbXBsYXRlIGlzIHJlcXVpcmVkYCk7XG4gIH1cblxuICBnZXQgZWxlbWVudCgpIHtcbiAgICBpZiAoIXRoaXMuX2VsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5iaW5kKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiByZW5kZXIodGhpcy50ZW1wbGF0ZSk7XG4gIH1cblxuICBiaW5kKCkge1xuICAgIC8qIGJpbmQgaGFuZGxlcnMgaWYgcmVxdWlyZWQgKi9cbiAgfVxufVxuIiwiaW1wb3J0IEFic3RyYWN0Vmlldywge3JlbmRlcn0gZnJvbSAnLi9hYnN0cmFjdC12aWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzcGxheVZpZXcgZXh0ZW5kcyBBYnN0cmFjdFZpZXcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3Jlc3VsdHMgPSAwO1xuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8c2VjdGlvbiBjbGFzcz1cImRpc3BsYXlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc3BsYXlfX3dyYXBwZXJcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZGlzcGxheV9fbGFiZWxcIiBmb3I9XCJpdGVyYXRpb25zXCI+SXRlcmF0aW9uczwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZGlzcGxheV9fc2VsZWN0XCIgbmFtZT1cIml0ZXJhdGlvbnNcIiBpZD1cIml0ZXJhdGlvbnNcIj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjEwXCI+MTA8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjEwMFwiPjEwMDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMTAwMFwiPjEgMDAwPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxMDAwMFwiPjEwIDAwMDwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRpc3BsYXlfX2NvbnRyb2xzXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRpc3BsYXlfX2J1dHRvblwiIGlkPVwicnVuLWJ1dHRvblwiPlJ1biB0ZXN0PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tY2FuY2VsIGJ1dHRvbi0tZGlzYWJsZWQgZGlzcGxheV9fYnV0dG9uXCIgaWQ9XCJjYW5jZWwtYnV0dG9uXCIgZGlzYWJsZWQ+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc3BsYXlfX3Jlc3VsdHNcIj5cbiAgICAgICAgICA8cCBjbGFzcz1cImRpc3BsYXlfX3RleHRcIj5BdmVyYWdlIGV4ZWN1dGlvbiB0aW1lOjwvcD4gIFxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICBgO1xuICB9XG5cbiAgYmluZCgpIHtcbiAgICB0aGlzLnJlc3VsdHMgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgLmRpc3BsYXlfX3Jlc3VsdHNgKTtcbiAgICB0aGlzLnJ1bkJ1dHRvbiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjcnVuLWJ1dHRvbmApO1xuICAgIHRoaXMuY2FuY2VsQnV0dG9uID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjYW5jZWwtYnV0dG9uYCk7XG4gICAgdGhpcy5pdGVyYXRpb25zU2VsZWN0ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCNpdGVyYXRpb25zYCk7XG5cbiAgICB0aGlzLnJ1bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5vblJ1bigpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMub25DYW5jZWwoKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgYWRkUmVzdWx0RmllbGQoKSB7XG4gICAgdGhpcy5fcmVzdWx0cysrO1xuICAgIGNvbnN0IG5ld1Jlc3VsdCA9IGBcbiAgICAgIDxwIGNsYXNzPVwiZGlzcGxheV9fdGV4dFwiPlxuICAgICAgICA8c3Bhbj5Db2RlICR7dGhpcy5fcmVzdWx0c306IDwvc3Bhbj48c3BhbiBjbGFzcz1cImRpc3BsYXlfX3Jlc3VsdFwiIGlkPVwicmVzdWx0LSR7dGhpcy5fcmVzdWx0c31cIj48L3NwYW4+XG4gICAgICA8L3A+XG4gICAgYDtcbiAgICB0aGlzLnJlc3VsdHMuYXBwZW5kQ2hpbGQocmVuZGVyKG5ld1Jlc3VsdCkpO1xuICB9XG5cbiAgY2hhbmdlUmVzdWx0cyguLi52YWx1ZXMpIHtcbiAgICBjb25zdCByZXN1bHRPdXRwdXRzID0gWy4uLnRoaXMucmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKGBbaWRePVwicmVzdWx0XCJdYCldO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0T3V0cHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0T3V0cHV0c1tpXS5pbm5lclRleHQgPSB2YWx1ZXNbaV0gPyBgJHt2YWx1ZXNbaV0udG9GaXhlZCgzKX0gbXNgIDogYGA7XG4gICAgfVxuICB9XG5cbiAgZW5hYmxlUnVuQnV0dG9uKCkge1xuICAgIHRoaXMucnVuQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5ydW5CdXR0b24uY2xhc3NMaXN0LnJlbW92ZShgYnV0dG9uLS1kaXNhYmxlZGApO1xuXG4gICAgdGhpcy5jYW5jZWxCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMuY2FuY2VsQnV0dG9uLmNsYXNzTGlzdC5hZGQoYGJ1dHRvbi0tZGlzYWJsZWRgKTtcbiAgfVxuXG4gIGRpc2FibGVSdW5CdXR0b24oKSB7XG4gICAgdGhpcy5ydW5CdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMucnVuQnV0dG9uLmNsYXNzTGlzdC5hZGQoYGJ1dHRvbi0tZGlzYWJsZWRgKTtcblxuICAgIHRoaXMuY2FuY2VsQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5jYW5jZWxCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShgYnV0dG9uLS1kaXNhYmxlZGApO1xuICB9XG5cbiAgb25SdW4oKSB7XG4gIH1cblxuICBvbkNhbmNlbCgpIHtcbiAgfVxufVxuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuL2Fic3RyYWN0LXZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9ncmVzc0JhclZpZXcgZXh0ZW5kcyBBYnN0cmFjdFZpZXcge1xuICBjb25zdHJ1Y3Rvcihtb2RlbCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgPGRpdiBjbGFzcz0ncHJvZ3Jlc3MnPlxuICAgICAgPHNwYW4gY2xhc3M9XCJwcm9ncmVzc19fdGV4dFwiPiR7dGhpcy5tb2RlbC5wcm9ncmVzc30lPC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzX19tZXRlclwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICBgO1xuICB9XG5cbiAgYmluZCgpIHtcbiAgICB0aGlzLnByb2dyZXNzTWV0ZXIgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgLnByb2dyZXNzX19tZXRlcmApO1xuICAgIHRoaXMucHJvZ3Jlc3NUZXh0ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wcm9ncmVzc19fdGV4dGApO1xuICB9XG5cbiAgY2hhbmdlUHJvZ3Jlc3MocHJvZ3Jlc3MpIHtcbiAgICB0aGlzLnByb2dyZXNzTWV0ZXIuc3R5bGUud2lkdGggPSBgJHtwcm9ncmVzc30lYDtcbiAgICB0aGlzLnByb2dyZXNzVGV4dC5pbm5lclRleHQgPSBgJHtNYXRoLmNlaWwocHJvZ3Jlc3MpfSVgO1xuICAgIHRoaXMub25Qcm9ncmVzc0NoYW5nZShwcm9ncmVzcyk7XG4gIH1cblxuICBvblByb2dyZXNzQ2hhbmdlKCkge1xuICB9XG59XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4vYWJzdHJhY3Qtdmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRhcmVhVmlldyBleHRlbmRzIEFic3RyYWN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCBpZCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYVwiPlxuICAgICAgICA8aDI+PGxhYmVsIGNsYXNzPVwidGV4dGFyZWFfX2xhYmVsXCIgZm9yPVwidGV4dGFyZWEtJHt0aGlzLl9pZH1cIj5Db2RlICR7dGhpcy5faWR9PC9sYWJlbD48L2gyPlxuICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJ0ZXh0YXJlYV9faW5wdXRcIiBpZD1cInRleHRhcmVhLSR7dGhpcy5faWR9XCIgY29scz1cIjMwXCIgcm93cz1cIjEwXCIgcGxhY2Vob2xkZXI9XCJUeXBlIHlvdXIgY29kZSBoZXJlXCI+JHt0aGlzLm1vZGVsLmlucHV0fTwvdGV4dGFyZWE+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgYmluZCgpIHtcbiAgICB0aGlzLnRleHRhcmVhID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC50ZXh0YXJlYV9faW5wdXRgKTtcbiAgICB0aGlzLnRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoYGlucHV0YCwgKCkgPT4ge1xuICAgICAgdGhpcy5vbklucHV0KHRoaXMudGV4dGFyZWEudmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgb25JbnB1dCgpIHtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==