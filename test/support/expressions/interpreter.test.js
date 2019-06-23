const interpreter = require('../../../src/support/expressions/interpreter');
const string = require('../../../src/support/helpers/string');

describe('Interpreter Tests', () => {

  it('should be count letters correctly', () => {
    const text = string.countLetters("Smoke on the (sdf) (778)", '(');
    expect(text).toEqual(2);
  });

  it('should be validate if a string has expressions', () => {
    let hasExpression = interpreter.expressionNeedToBeCracked("now");
    expect(hasExpression).toEqual(false);
    hasExpression = interpreter.expressionNeedToBeCracked("now()");
    expect(hasExpression).toEqual(true);
  });

  it('should be validate if the expression cracked correctly', () => {
    const list = interpreter.crackExpression('now', 'now(HHmmss|+2h)');

    expect(list[0]).toEqual('now');
    expect(list[1]).toEqual('HHmmss|+2h');
    expect(list[2]).toEqual('now(HHmmss|+2h)');
  });

  it('should be validate the CHAINED expression', () => {
    const date = new Date();
    const hour = string.addZero(date.getHours());
    const min = string.addZero(date.getMinutes());
    const sec = string.addZero(date.getSeconds());

    const expected = string.formatString('TIME NOW {0}:{1}:{2}', [hour, min, sec]);
    const received = interpreter.resolveExpression('concatenate(TIME NOW |now(HH:mm:ss))');

    expect(expected).toEqual(received);
  });

});
