const interpreter = require('../expressions/interpreter');
const string = require('./string');
const vars = require('./variables');
const params = require('./params');

const fs = require('fs-plus')
const path = require('path');

module.exports = {
  /**
   * Process expressions and vars in a text with walnut marks '${text}'
   */
  getTreatedValue: (text) => {
    let content = string.removeQuotationMark(text);
    const list = text.match(/\${(.*?)}/g);

    if (list === null) {
      return content;
    }

    for (let i = 0; i < list.length; i++) {
      const word = list[i];
      let newWord = word;

      // get only text content
      while (string.hasBracketsMark(newWord) || string.hasQuotationMark(newWord)) {
        newWord = string.removeBracketsMark(newWord);
        newWord = string.removeQuotationMark(newWord);
      }

      // parse vars and params
      newWord = vars.nutParseVars(newWord);
      newWord = params.nutParseParams(newWord);

      // solve expressions
      newWord = interpreter.resolveExpression(newWord);

      // replacement
      content = content.replace(word, newWord);
    }

    return content;
  },

  compare: (current, type, received) => {
    var comparisson = { result: null, msg: null };

    type = type.trim().toLowerCase().replace(/\s/gi, '');

    current = current.toString();
    received = received.toString();

    switch (type) {
      case 'whichcontains':
        comparisson.result = current.includes(received);
        comparisson.msg = `Current value [$${current}] not contains [${received}]`;
        break;

      case 'whichnotcontains':
        comparisson.result = !current.includes(received);
        comparisson.msg = `Current value [${current}] contains [${received}]`;
        break;

      case 'equalsto':
        comparisson.result = current === received;
        comparisson.msg = `Current value [${current}] not equals to [${received}]`;
        break;

      case 'notequalsto':
        comparisson.result = current !== received;
        comparisson.msg = `Current value [${current}] is equals to [${received}]`;
        break;
      case 'whichstartswith':
        comparisson.result = current.startsWith(received);
        comparisson.msg = `Current value [${current}] does not start with [${received}]`;
        break;
      case 'whichendswith':
        comparisson.result = current.endsWith(received);
        comparisson.msg = `Current value [${current}] does not end with [${received}]`;
        break;

      default:
        break;
    }

    if (comparisson.result) { comparisson.msg = '' }

    return comparisson;
  },

  saveScreenshot: (folder_path, name) => {
    driver.takeScreenshot().then((screenshot, err) => {
      fs.writeFile(path.join(folder_path, `${name}.png`), screenshot, 'base64', (err) => {
        console.log(err)
      })
    });
  }

};
