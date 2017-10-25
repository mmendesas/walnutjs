var helperString = require('../src/support/helper/string');
var interpreter = require('../src/support/expressions/interpreter');
var helperCommon = require('../src/support/helper/common');

describe('Expressions Tests', () => {

    it('should be validate the expression NOW', () => {
        var date = new Date();
        var hour = helperString.addZero(date.getHours());
        var min = helperString.addZero(date.getMinutes());
        var sec = helperString.addZero(date.getSeconds());

        var expected = helperString.formatString('{0}:{1}:{2}', [hour, min, sec]);
        var received = interpreter.resolveExpression('now(HH:mm:ss)');

        expect(expected).toEqual(received);
    });

    it('should be validate the expression NOW with operators', () => {
        var date = new Date();
        var hour = helperString.addZero(date.getHours() + 2);
        var min = helperString.addZero(date.getMinutes());
        var sec = helperString.addZero(date.getSeconds());

        var expected = helperString.formatString('{0}:{1}:{2}', [hour, min, sec]);
        var received = interpreter.resolveExpression('now(HH:mm:ss|+2h)');

        expect(expected).toEqual(received);
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

    it('should be validate the expression CONCATENATE', () => {
        var teste = interpreter.resolveExpression('concatenate(marcio|mendes)');
        expect(teste).toEqual('marciomendes');
    });

    it('should be validate the expression CONCATENATE run twice', () => {
        var text = interpreter.resolveExpression('concatenate(marcio|mendes)');
        expect(text).toEqual('marciomendes');

        var text2 = interpreter.resolveExpression('concatenate(teste |mendes)');
        expect(text2).toEqual('teste mendes');
    });

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

    it('should be validate the expression MATH with integer', () => {
        var result = interpreter.resolveExpression('math(5|add:d|3)');
        expect(result).toEqual('8');
    });

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

    it('should be validate the expression inside a text', () => {
        var result = helperCommon.getTreatedValue('My email is ${concatenate(m|mendes|.|as|@|gmail.com)}');
        expect(result).toEqual('My email is mmendes.as@gmail.com');
    });

    it('should be validate the expression inside a text without brackets mark', () => {
        var result = helperCommon.getTreatedValue('My email is concatenate(m|mendes|.|as|@|gmail.com)');
        expect(result).toEqual('My email is concatenate(m|mendes|.|as|@|gmail.com)');
    });

});