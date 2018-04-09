'use strict';

const assert = require('assertthat');

const calculator = require('../lib/calculator');

test('add returns the sum of the given numbers.', () => {
  const sum = calculator.add(23, 42);

  assert.that(sum).is.equalTo(65);
});
