import {assert} from 'chai';
import {getMeanValue} from '../util';

describe(`Calculating mean value from array`, () => {
  it(`Should calculate mean value properly`, () => {
    assert.equal(getMeanValue([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 5.5);
    assert.equal(getMeanValue([5, 2, -10, 9, 2, 1, 0, 3]), 1.5);
  });
});
