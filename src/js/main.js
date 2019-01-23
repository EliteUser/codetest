import {getRandomArrayElement, KEYCODE, getTiming} from "./util";

const foo = function (n) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
};

const bar = getTiming(foo);

console.log(bar(1e9));
