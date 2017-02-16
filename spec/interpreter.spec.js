var interpreter = require('../src/support/expressions/interpreter');
var helperString = require('../src/support/helper/string');

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

});