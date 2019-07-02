const string = require('../helpers/string');

const expCPF = {

  /**
   * Used to generate a valid CPF with or without format
   */
  parseExpression(expression) {
    if (expression != '' && expression != 'f') {
      const sb = [];

      sb.push('[1] - cpf()  - 32145698787');
      sb.push('[2] - cpf(f) - 312.456.987-87');

      throw sb.join('\n');
    }

    const cpfResult = this.generateCPF();

    if (expression === '') { return cpfResult; }

    if (expression === 'f') { return string.formatString('{0}{1}{2}.{3}{4}{5}.{6}{7}{8}-{9}{10}', cpfResult); }
  },

  /**
   * Generate the valid CPF
   */
  generateCPF() {
    let ini = '';
    let num = 0;

    for (let i = 0; i < 9; i++) {
      num = Math.floor((Math.random() * 9) + 1);
      ini += num.toString();
    }

    return ini + this.calculateLastNums(ini);
  },

  /**
   * Calculate the last two characteres
   */
  calculateLastNums(num) {
    let num01 = 0; let
      num02 = 0;
    let sum = 0; let
      weight = 10;

    for (var i = 0; i < num.length; i++) {
      const mm = num.substring(i, i + 1);

      sum += parseInt(num.substring(i, i + 1)) * weight--;
    }

    if (sum % 11 == 0 | sum % 11 == 1) { num01 = 0; } else { num01 = 11 - (sum % 11); }

    sum = 0;
    weight = 11;
    for (var i = 0; i < num.length; i++) { sum += parseInt(num.substring(i, i + 1)) * weight--; }

    sum += parseInt(num01) * 2;

    if (sum % 11 == 0 | sum % 11 == 1) { num02 = 0; } else { num02 = 11 - (sum % 11); }

    return num01.toString() + num02.toString();
  },
};

module.exports = expCPF;
