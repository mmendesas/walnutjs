const jsonparser = require('../parser/jsonparser');

module.exports = {

  /**
   * Replace parameters marks with correspondent value from file
  */
  nutParseParams(text) {
    if (global.parameters) {
      while (text.includes('params.')) {
        // var list = text.match(/(params.[^,{}]+)/g);
        const list = text.match(/params.\[(.*?)\]/g);

        list.forEach((item) => {
          const keypath = item.substring(item.indexOf('[') + 1, item.length - 1);

          //get value from JSON using JSONPATH
          jsonparser.init(parameters); //TODO load parameters global
          const jsonresult = jsonparser.getValue(keypath)[0];
          const jsonValue = jsonresult === undefined ? 'unknown-jsonpath' : jsonresult;

          text = text.replace(item, jsonValue);
        });
      }
    }
    return text;
  }
}
