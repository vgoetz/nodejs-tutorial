'use strict';

const assert = require('assertthat');

const calculator = require('../lib/calculator');

test('add returns the sum of the given numbers.', () => {
  const sum = calculator.add(23, 42);

  assert.that(sum).is.equalTo(65);
});

test('add returns the sum of the given numbers even when the first number is zero.', () => {
  const sum = calculator.add(0, 23);

  assert.that(sum).is.equalTo(23);
});

test('add throws an error if numbers are missing.', () => {
  assert.that(() => {
    calculator.add();
  }).is.throwing('Numbers are missing.');
});
