'use strict';

var varMap = {};

module.exports = {

  /**
   * Add variable to list
   */
  addVariable: (key, value) => {
    varMap[key] = value;
  },

  /**
   * Get simple variable by name
   */
  getVariable: (key) => {
    return varMap[key] || 'unknown-var';
  },

  /**
   * Return a list of variables
   */
  getAllVariables: () => {
    return varMap;
  },

  /**
   * Replace variables marks with correspondent value
   */
  nutParseVars: (text) => {
    if (text.includes('vars.')) {
      var list = text.match(/(vars.[\w]*)/g);

      list.forEach(function (item) {
        var varName = item.split('.')[1];
        var varValue = Variables.getVariable(varName);

        text = text.replace(item, varValue);
      });
    }

    return text;
  }
};
