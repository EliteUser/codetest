export const getTiming = function (f) {
  return function (...args) {
    const start = performance.now();
    const result = f.call(null, ...args);
    const time = performance.now() - start;

    return {result, time};
  };
};

export const getMeanValue = (array) => {
  return array.reduce((acc, value) => (acc + value), 0) / array.length;
};
