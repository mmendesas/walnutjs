const interpreter = require('../../../src/support/expressions/interpreter');

describe('CNPJ Tests', () => {
    it('should be validate the expression CNPJ', () => {
        var result = interpreter.resolveExpression('cnpj()');
        expect(result).toContain('0001');
        expect(result.length).toEqual(14);
    });

    it('should be validate the expression CNPJ with format', () => {
        var result = interpreter.resolveExpression('cnpj(f)');
        expect(result.length).toEqual(18);
        expect(result).toContain('/0001');
        expect(result).toContain('-');
        expect(result).toContain('.');
    });
});