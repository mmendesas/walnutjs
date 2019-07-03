
/**
 * Used to concatenate list of params with pattern (param1|param2)
 */
const parseExpression = (expression) => {
  let ret = '';
  const parts = expression.split('|');

  if (parts.length < 2) {
    const sb = [];
    sb.push('\t[1] - concatenate(arg1|arg2)      - concatenate(teste|451)      - teste451');
    sb.push('\t[2] - concatenate(arg1|arg2|argN) - concatenate(teste|451|_abc) - teste451_abc');

    throw new Error(sb.join('\n'));
  }

  for (let i = 0; i < parts.length; i += 1) {
    ret += parts[i];
  }

  return ret;
};

module.exports = {
  parseExpression,
};
