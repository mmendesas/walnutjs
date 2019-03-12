const interpreter = require('../../../src/support/expressions/interpreter');

describe('TO NUMBER Tests', () => {

    it('should be validate the expression TONUMBER with double', () => {
        var result = interpreter.resolveExpression('tonumber(R$16,70|d:2|BRL)');
        expect(result).toEqual('16.70');
    });

    it('should be validate the expression TONUMBER with double and precision of 3 caracters', () => {
        var result = interpreter.resolveExpression('tonumber(R$16,70|d:3|BRL)');
        expect(result).toEqual('16.700');
    });

    it('should be validate the expression TONUMBER with integer', () => {
        var result = interpreter.resolveExpression('tonumber(R$ 16,70|i|BRL)');
        expect(result).toEqual('16');
    });

    it('should be validate the expression TONUMBER with double', () => {
        var result = interpreter.resolveExpression('tonumber($1,678.70|d:2|EN)');
        expect(result).toEqual('1678.70');
    });

    it('should be validate the expression TONUMBER with integer', () => {
        var result = interpreter.resolveExpression('tonumber($ 1,678.70|i|EN)');
        expect(result).toEqual('1678');
    });
});