const interpreter = require('../../../src/support/expressions/interpreter');
const helperString = require('../../../src/support/helper/string');

describe('Interpreter Tests', () => {

    it('should be count letters correctly', () => {
        var text = helperString.countLetters("Smoke on the (sdf) (778)", '(');
        expect(text).toEqual(2);
    });

    it('should be validate if a string has expressions', () => {
        var hasExpression = interpreter.expressionNeedCracked("now");
        expect(hasExpression).toEqual(false);
        hasExpression = interpreter.expressionNeedCracked("now()");
        expect(hasExpression).toEqual(true);
    });

    it('should be validate if the expression cracked correctly', () => {
        var list = interpreter.crackExpression('now', 'now(HHmmss|+2h)');

        expect(list[0]).toEqual('now');
        expect(list[1]).toEqual('HHmmss|+2h');
        expect(list[2]).toEqual('now(HHmmss|+2h)');
    });

    it('should be validate the CHAINED expression', () => {
        var date = new Date();
        var hour = helperString.addZero(date.getHours());
        var min = helperString.addZero(date.getMinutes());
        var sec = helperString.addZero(date.getSeconds());

        var expected = helperString.formatString('TIME NOW {0}:{1}:{2}', [hour, min, sec]);
        var received = interpreter.resolveExpression('concatenate(TIME NOW |now(HH:mm:ss))');

        expect(expected).toEqual(received);
    });

});