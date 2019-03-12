const interpreter = require('../../../src/support/expressions/interpreter');

describe('RANDOM Tests', () => {
    it('should be validate the expression RANDOM with letters', () => {
        var result = interpreter.resolveExpression('random(l|6)');
        expect(result.length).toEqual(6);
        expect(result).toMatch(/[a-zA-Z]+/g);
    });

    it('should be validate the expression RANDOM with numbers', () => {
        var result = interpreter.resolveExpression('random(n|12)');
        expect(result.length).toEqual(12);
        expect(result).toMatch(/\d+/g);
    });

    it('should be validate the expression RANDOM with alfanumeric', () => {
        var result = interpreter.resolveExpression('random(a|8)');
        expect(result.length).toEqual(8);
        expect(result).toMatch(/[a-zA-Z0-9]+/g);
    });
});