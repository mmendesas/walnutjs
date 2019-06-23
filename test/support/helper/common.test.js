const common = require('../../../src/support/helpers/common');
const vars = require('../../../src/support/helpers/variables');

const assert = require('chai').assert;
global['assert'] = assert;

describe('Common Helper Tests', () => {

  it('should be process text with expressions/vars correctly', () => {
    vars.addVariable('nome', 'Armademônios');
    const msg = common.getTreatedValue("Silasticos ${vars.nome} de Striterax");
    expect(msg).toEqual("Silasticos Armademônios de Striterax");
  });

  it('should be process text without expressions/vars correctly', () => {
    const msg = common.getTreatedValue("Silasticos Striterax");
    expect(msg).toEqual("Silasticos Striterax");
  });

  it('should be process compare with all combinations', () => {
    const data =
      [
        // ['Current', 'Comparisson', 'Value', 'Result', 'Return MSG'],
        ['Black Dog', 'which contains', 'Dog'],
        ['Black Dog', 'which not contains', 'TS'],
        ['Black Dog', 'equals to', 'Black Dog'],
        ['Black Dog', 'not equals to', 'Dog'],
      ];

    for (let i = 0; i < data.length; i++) {
      common.compare(data[i][0], data[i][1], data[i][2]);
    }
  });

});
