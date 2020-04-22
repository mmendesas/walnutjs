const { compile } = require('../../../src/support/helpers/math');

describe('Helper Math - exp', () => {
  it('should return correctly result from given expression', () => {
    const expression = '1+2*4';
    const result = compile(expression);
    expect(result).toEqual(9);
  });

  it('should return correctly result from given expression with variables', () => {
    const item = 2;
    const expression = `1+2*4/${item}`;
    const result = compile(expression);
    expect(result).toEqual(5);
  });

  it('should throw error in undefined variables or symbols', () => {
    const item = 'a';
    const expression = `1+2*4/${item}`;
    try {
      compile(expression);
    } catch (error) {
      expect(error.message).toEqual('Undefined symbol a');
    }
  });
});
