import {getMeanValue} from "../util";

export let executionTimer = null;

export const runCalculations = (functions, iterations, onStep, onFinish, onError) => {
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
      clearTimeout(executionTimer);
      onError();
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

export const getMeanTime = (array) => {
  let resultTimes = [];

  for (let elem of array) {
    resultTimes.push(elem.time);
  }

  return getMeanValue(resultTimes);
};
