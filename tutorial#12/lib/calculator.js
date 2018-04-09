'use strict';

const calculator = {};

calculator.add = function (...numbers) {
  if (!numbers || numbers.length === 0) {
    throw new Error('Numbers are missing.');
  }

  return numbers.reduce((sum, number) => sum + number);
};

module.exports = calculator;
