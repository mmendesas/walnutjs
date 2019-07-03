

const varMap = {};

/**
 * Add variable to list
 */
const addVariable = (key, value) => {
  varMap[key] = value;
};

/**
 * Get simple variable by name
 */
const getVariable = key => varMap[key] || 'unknown-var';

/**
 * Return a list of variables
 */
const getAllVariables = () => varMap;

/**
 * Replace variables marks with correspondent value
 */
const nutParseVars = (text) => {
  if (text.includes('vars.')) {
    const list = text.match(/(vars.[\w]*)/g);

    list.forEach((item) => {
      const varName = item.split('.')[1];
      const varValue = getVariable(varName);

      // eslint-disable-next-line no-param-reassign
      text = text.replace(item, varValue);
    });
  }

  return text;
};

module.exports = {
  addVariable,
  getVariable,
  getAllVariables,
  nutParseVars,
};
