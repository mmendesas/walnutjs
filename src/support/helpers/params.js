/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
const jsonparser = require('../parser/jsonparser');
const vars = require('./variables');
const flatten = require('./flattenObject').flattenObject;

const clearEnvVariable = text => text.replace('${', '').replace('}', '');

const getEnvVariable = variable => process.env[clearEnvVariable(variable)] || '';

const setAsVariables = (params) => {
  const parameters = flatten(params);

  Object.keys(parameters)
    .forEach((key) => {
      let text = parameters[key];
      const regExp = /\$\{([^${}]+)\}/g;
      const matches = text.match(regExp) || [];
      matches.forEach(envVariable => text = text.replace(envVariable, getEnvVariable(envVariable)));
      vars.addVariable(key, text);
    });
};

/**
 * Replace parameters marks with correspondent value from file
*/
const nutParseParams = (textToParse) => {
  let text = textToParse;
  if (global.parameters) {
    while (text.includes('params.')) {
      // var list = text.match(/(params.[^,{}]+)/g);
      const list = text.match(/params.\[(.*?)\]/g);

      for (let i = 0; i < list.length; i += 1) {
        const item = list[i];
        const keypath = item.substring(item.indexOf('[') + 1, item.length - 1);

        // get value from JSON using JSONPATH
        jsonparser.init(parameters);
        const jsonresult = jsonparser.getValue(keypath)[0];
        const jsonValue = jsonresult === undefined ? 'unknown-jsonpath' : jsonresult;

        text = text.replace(item, jsonValue);
      }
    }
  }
  return text;
};


module.exports = {
  nutParseParams,
  setAsVariables,
};
