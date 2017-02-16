'use strict'

var varMap = {};

var Variables = {

    /**
     * Add variable to list
     */
    addVariable: function (key, value) {
        varMap[key] = value;
    },

    /**
     * Get simple variable by name
     */
    getVariable: function (key) {
        return varMap[key];
    },

    /**
     * Return a list of variables
     */
    getAllVariables: function () {
        return varMap;
    },

    /**
     * Replace variables marks with correspondent value
     */
    nutParseVars: function (text) {
        if (text.includes('vars.')) {
            var list = text.match(/(vars.[\w]*)/g);

            list.forEach(function (item) {
                var varName = item.split(".")[1];
                var varValue = varMap[varName];

                text = text.replace(item, varValue);
            });
        }
        return text;
    }
};

module.exports = Variables;