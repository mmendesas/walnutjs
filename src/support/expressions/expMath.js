const expMath = {

  /**
   * Used to make simple math operations
   */
  parseExpression(expression) {
    const sb = [];

    sb.push('[1] - math(num|operator:type|num)  - math(5|add:d|2)  - (5.0 + 2.5) - 7.5');
    sb.push('[2] - math(num|operator:type|num)  - math(5|sub:i|2)  - (5 - 2)     - 3  ');
    sb.push('[3] - math(num|operator:type|num)  - math(5|mul:i|2)  - (5 * 2)     - 10 ');
    sb.push('[4] - math(num|operator:type|num)  - math(5|div:d|2)  - (5.0 / 2)   - 2.5');

    const parts = expression.split('|');

    if (parts.length != 3 || !expression.includes(':')) {
      throw sb.join('\n');
    }

    let result;
    const operType = parts[1];
    const oper = operType.split(':')[0];
    const type = operType.split(':')[1];

    const num01 = parts[0].trim();
    const num02 = parts[2].trim();

    try {
      switch (type.toLowerCase().trim()) {
        case 'i':
          result = this.getIntegerProcessedValue(num01, oper, num02);

          return result;
        case 'd':
          result = this.getFloatProcessedValue(num01, oper, num02);

          return result;
        default:
          break;
      }
    } catch (err) {
      throw sb.join('\n');
    }
  },

  /**
   * Return the result of operation as Integer
   */
  getIntegerProcessedValue(num01, oper, num02) {
    let iRetValue = 0;
    const inum01 = parseInt(num01);
    const inum02 = parseInt(num02);

    switch (oper.trim().toLowerCase()) {
      case 'add':
        iRetValue = inum01 + inum02;
        break;
      case 'sub':
        iRetValue = inum01 - inum02;
        break;
      case 'mul':
        iRetValue = inum01 * inum02;
        break;
      case 'div':
        iRetValue = inum01 / inum02;
        break;

      default:
        throw 'Illegal argument';
    }

    return iRetValue.toString();
  },

  /**
   * Return the result of operation as Float
   */
  getFloatProcessedValue(num01, oper, num02) {
    let dRetValue = 0;
    const dnum01 = parseFloat(num01);
    const dnum02 = parseFloat(num02);

    switch (oper.trim().toLowerCase()) {
      case 'add':
        dRetValue = dnum01 + dnum02;
        break;
      case 'sub':
        dRetValue = dnum01 - dnum02;
        break;
      case 'mul':
        dRetValue = dnum01 * dnum02;
        break;
      case 'div':
        dRetValue = dnum01 / dnum02;
        break;

      default:
        throw 'Illegal argument';
    }

    return parseFloat(dRetValue).toString();
  },
};

module.exports = expMath;
