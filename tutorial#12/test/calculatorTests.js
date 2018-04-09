'use strict';

const assert = require('assertthat');

const calculator = require('../lib/calculator');

test('add returns the sum of the given numbers.', done => {
  const sum = calculator.add(23, 42);

  assert.that(sum).is.equalTo(65);
  done();
});

test('add returns the sum of the given numbers even when the first number is zero.', done => {
  const sum = calculator.add(0, 23);

  assert.that(sum).is.equalTo(23);
  done();
});

test('add throws an error if numbers are missing.', done => {
  assert.that(() => {
    calculator.add();
  }).is.throwing('Numbers are missing.');
  done();
});

test('addAsync returns the sum of the given numbers', done => {
  calculator.addAsync((err, sum) => {
    assert.that(err).is.null();
    assert.that(sum).is.equalTo(65);
    done();
  }, 23, 42);
});
