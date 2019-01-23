export const KEYCODE = {
  ESC: 27,
  ENTER: 13,
};

export const isEscEvent = function (evt, action) {
  if (evt.keyCode === KEYCODE.ESC) {
    action();
  }
};

export const isEnterEvent = function (evt, action) {
  if (evt.keyCode === KEYCODE.ENTER) {
    action();
  }
};

export const getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

export const getTiming = function (f) {
  return function (...args) {
    const start = performance.now();
    const result = f.call(this, ...args);
    const time = performance.now() - start;

    return {result, time};
  };
};

export const getCloneObject = (currentObject) => {
  return JSON.parse(JSON.stringify(currentObject));
};
