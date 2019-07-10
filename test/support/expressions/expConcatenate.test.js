const interpreter = require('../../../src/support/expressions/interpreter');
const common = require('../../../src/support/helpers/common');

describe('CONCATENATE Tests', () => {
  it('should be process invalid expression CONCATENATE', () => {
    const teste = interpreter.resolveExpression('concatenate(asdf)');
    expect(teste).toEqual('concatenate(asdf)');
  });

  it('should be validate the expression CONCATENATE', () => {
    const teste = interpreter.resolveExpression('concatenate(marcio|mendes)');
    expect(teste).toEqual('marciomendes');
  });

  it('should be validate the expression CONCATENATE run twice', () => {
    const text = interpreter.resolveExpression('concatenate(marcio|mendes)');
    expect(text).toEqual('marciomendes');

    const text2 = interpreter.resolveExpression('concatenate(teste |mendes)');
    expect(text2).toEqual('teste mendes');
  });

  it('should be validate the expression inside a text', () => {
    const result = common.getTreatedValue('My email is ${concatenate(m|mendes|.|as|@|gmail.com)}');
    expect(result).toEqual('My email is mmendes.as@gmail.com');
  });

  it('should be validate the expression inside a text without brackets mark', () => {
    const result = common.getTreatedValue('My email is concatenate(m|mendes|.|as|@|gmail.com)');
    expect(result).toEqual('My email is concatenate(m|mendes|.|as|@|gmail.com)');
  });
});
