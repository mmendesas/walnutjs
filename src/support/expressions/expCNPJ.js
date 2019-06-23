const string = require('../helpers/string');

/**
 * Used to generate a valid CNPJ with or without format
 */
const parseExpression = (expression) => {
  if (expression != '' && expression != 'f') {
    var sb = [];

    sb.push('[1] - cnpj()  - 19445769000141');
    sb.push('[2] - cnpj(f) - 19.445.769/0001-41');

    throw sb.join('\n');
  }

  const cnpjResult = generateCNPJ();

  if (expression === '') { return cnpjResult }
  if (expression === 'f') { return string.formatString('{0}{1}.{2}{3}{4}.{5}{6}{7}/{8}{9}{10}{11}-{12}{13}', cnpjResult) }
};

/**
 * Generate the valid CNPJ
 */
const generateCNPJ = () => {
  var ini = '';
  var num = 0;

  for (var i = 0; i < 8; i++) {
    num = Math.floor((Math.random() * 10));
    ini += num.toString();
  }

  ini += '0001';

  return ini + calculateLastNums(ini);
};

/**
 * Calculate the last two characteres
 */
const calculateLastNums = (num) => {
  let num01 = 0, num02 = 0;
  let sum = 0, weight = 5;

  for (let i = 0; i < 4; i++) {
    sum += parseInt(num.substring(i, i + 1)) * weight--;
  }

  weight = 9;

  for (let i = 4; i < num.length; i++) {
    sum += parseInt(num.substring(i, i + 1)) * weight--;
  }

  if (sum % 11 == 0 | sum % 11 == 1) { num01 = 0 } else { num01 = 11 - (sum % 11) }

  sum = 0;
  weight = 6;


  for (let i = 0; i < 5; i++) {
    sum += parseInt(num.substring(i, i + 1)) * weight--;
  }

  weight = 9;

  for (let i = 5; i < num.length; i++) {
    sum += parseInt(num.substring(i, i + 1)) * weight--;
  }

  sum += parseInt(num01) * 2;

  if (sum % 11 == 0 | sum % 11 == 1) { num02 = 0 } else { num02 = 11 - (sum % 11) }

  return num01.toString() + num02.toString();
};

module.exports = {
  parseExpression
};
