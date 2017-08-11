const jsonparser = require('../parser/jsonparser');
const context = require('../context');
const config = require('../config');

var Parameters = {

    /**
     * Replace parameters marks with correspondent value from file
    */
    nutParseParams(text) {
        if (config.parametersPath !== '') {
            while (text.includes('params.')) {
                var list = text.match(/(params.[^,{}]+)/g);

                list.forEach(function (item) {
                    const keypath = item.substring(item.indexOf('[') + 1, item.length - 1);

                    //get value from JSON using JSONPATH
                    jsonparser.init(context.parameters);
                    const jsonresult = jsonparser.getValue(keypath)[0];
                    const jsonValue = jsonresult === undefined ? 'unknown-jsonpath' : jsonresult;

                    text = text.replace(item, jsonValue);
                });
            }
        }
        return text;
    }
}

module.exports = Parameters;