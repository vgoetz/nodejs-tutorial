'use strict';

const calculator = {};

calculator.add = function (...numbers) {
  if (!numbers || numbers.length === 0) {
    throw new Error('Numbers are missing.');
  }

  return numbers.reduce((sum, number) => sum + number);
};

calculator.addAsync = function (callback, ...numbers) {
  if (!callback) {
    throw new Error('Callback is missing.');
  }
  if (!numbers || numbers.length === 0) {
    throw new Error('Numbers are missing.');
  }

  const sum = numbers.reduce((intermidiateSum, number) => intermidiateSum + number);

  setTimeout(() => {
    callback(null, sum);
  }, 1 * 1000);
};

module.exports = calculator;
