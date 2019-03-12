const interpreter = require('../../../src/support/expressions/interpreter');
const helperCommon = require('../../../src/support/helper/common');

describe('CONCATENATE Tests', () => {
    it('should be process invalid expression CONCATENATE', () => {
        var teste = interpreter.resolveExpression('concatenate(asdf)');
        expect(teste).toEqual('concatenate(asdf)');
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

    it('should be validate the expression inside a text', () => {
        var result = helperCommon.getTreatedValue('My email is ${concatenate(m|mendes|.|as|@|gmail.com)}');
        expect(result).toEqual('My email is mmendes.as@gmail.com');
    });

    it('should be validate the expression inside a text without brackets mark', () => {
        var result = helperCommon.getTreatedValue('My email is concatenate(m|mendes|.|as|@|gmail.com)');
        expect(result).toEqual('My email is concatenate(m|mendes|.|as|@|gmail.com)');
    });
});