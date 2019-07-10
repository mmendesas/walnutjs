const string = require('../../../src/support/helpers/string');
const interpreter = require('../../../src/support/expressions/interpreter');

describe('NOW Tests', () => {
  it('should be validate the expression NOW', () => {
    const date = new Date();
    const hour = string.addZero(date.getHours());
    const min = string.addZero(date.getMinutes());
    const sec = string.addZero(date.getSeconds());

    const expected = string.formatString('{0}:{1}:{2}', [hour, min, sec]);
    const received = interpreter.resolveExpression('now(HH:mm:ss)');

    expect(expected).toEqual(received);
  });

  it('should be validate the expression NOW with operators', () => {
    const date = new Date();
    date.setHours(date.getHours() + 2)
    const hour = string.addZero(date.getHours());
    const min = string.addZero(date.getMinutes());
    const sec = string.addZero(date.getSeconds());

    const expected = string.formatString('{0}:{1}:{2}', [hour, min, sec]);
    const received = interpreter.resolveExpression('now(HH:mm:ss|+2h)');
    expect(expected).toEqual(received);
  });

});
