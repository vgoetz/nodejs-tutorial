'use strict';

const assert = require('assertthat');

const calculator = require('../lib/calculator');

suite('calculator', () => {

  suite('add', () => {
    test('returns the sum of the given numbers.', done => {
      const sum = calculator.add(23, 42);

      assert.that(sum).is.equalTo(65);
      done();
    });

    test('returns the sum of the given numbers even when the first number is zero.', done => {
      const sum = calculator.add(0, 23);

      assert.that(sum).is.equalTo(23);
      done();
    });

    test('throws an error if numbers are missing.', done => {
      assert.that(() => {
        calculator.add();
      }).is.throwing('Numbers are missing.');
      done();
    });
  });
  suite('add', () => {
    test('addAsync returns the sum of the given numbers', function (done) {
      this.timeout(5 * 1000);

      calculator.addAsync((err, sum) => {
        assert.that(err).is.null();
        assert.that(sum).is.equalTo(65);
        done();
      }, 23, 42);
    });
  });
});

