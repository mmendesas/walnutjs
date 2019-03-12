const interpreter = require('../../../src/support/expressions/interpreter');

describe('CPF Tests', () => {
    it('should be validate the expression CPF', () => {
        var result = interpreter.resolveExpression('cpf()');
        expect(result.length).toEqual(11);
    });

    it('should be validate the expression CPF with format', () => {
        var result = interpreter.resolveExpression('cpf(f)');
        expect(result.length).toEqual(14);
        expect(result).toContain('-');
        expect(result).toContain('.');
    });
});