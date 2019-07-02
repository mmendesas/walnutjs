const jsonparser = require('../parser/jsonparser');
const vars = require('./variables');
const flatten = require('./flattenObject').flattenObject;

const clearEnvVariable = text => text.replace('${', '').replace('}', '');

const getEnvVariable = variable => process.env[clearEnvVariable(variable)] || '';

const setAsVariables = (parameters) => {
  parameters = flatten(parameters);

  Object.keys(parameters)
    .forEach((key) => {
      const text = parameters[key];
      const regExp = /\$\{([^${}]+)\}/g;
      const matches = text.match(regExp) || [];
      matches.forEach(envVariable => text = text.replace(envVariable, getEnvVariable(envVariable)));
      vars.addVariable(key, text);
    });
};

/**
 * Replace parameters marks with correspondent value from file
*/
const nutParseParams = (text) => {
  if (global.parameters) {
    while (text.includes('params.')) {
      // var list = text.match(/(params.[^,{}]+)/g);
      const list = text.match(/params.\[(.*?)\]/g);

      list.forEach((item) => {
        const keypath = item.substring(item.indexOf('[') + 1, item.length - 1);

        // get value from JSON using JSONPATH
        jsonparser.init(parameters); // TODO load parameters global
        const jsonresult = jsonparser.getValue(keypath)[0];
        const jsonValue = jsonresult === undefined ? 'unknown-jsonpath' : jsonresult;

        text = text.replace(item, jsonValue);
      });
    }
  }
  return text;
};


module.exports = {
  nutParseParams,
  setAsVariables,
};
