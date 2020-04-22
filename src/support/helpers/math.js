const math = require('mathjs');

const compile = (expression = '') => math.evaluate(expression);

module.exports = {
  compile,
};
