const string = require('../helpers/string');

/**
* return a random value like number, letter or both
*/
const getRandomAlfaNumeric = (option, num) => {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  let ret = '';
  let text = '';

  switch (option.trim().toLowerCase()) {
    case 'l':
      text = letters;
      break;
    case 'n':
      text = numbers;
      break;
    case 'a':
      text = numbers + letters;
      break;
    default:
      break;
  }

  for (let i = 0; i < num; i++) {
    const idx = Math.floor((Math.random() * text.length - 1) + 1);
    ret += text[idx];
  }

  return ret;
};

/**
 * Used to return a random value
 */
const parseExpression = (expression) => {
  const parts = expression.split('|');
  let result = '';

  if (parts.length == 2) {
    const part01 = parts[0].trim().toLowerCase();

    // random(n|8);
    if (string.isLetter(part01[0])) {
      result = getRandomAlfaNumeric(part01, parseInt(parts[1]));
      return result;
    }
    // random(15.78|55.98);
    const minimum = parseFloat(parts[0]);
    const maximum = parseFloat(parts[1]);

    const range = maximum - minimum;
    const r = Math.floor((Math.random() * range) + 1);
    const randomNum = minimum + r;

    result = randomNum.tovar();

    return result;
  } if (parts.length == 1) {
    try {
      const num = parseInt(expression);
      result = Math.floor((Math.random() * num - 1) + 1);
      return result;
    } catch (err) {
      const sb = [];
      sb.push('[1] - random(num|num) - random(3|7) - 6');
      sb.push('[2] - random(n|num)   - random(n|5) - 65871');
      sb.push('[3] - random(l|num)   - random(l|5) - 6aS7x');
      sb.push('[4] - random(a|num)   - random(a|3) - XyB');

      throw sb.join('\n');
    }
  }
};


module.exports = {
  parseExpression,
};
