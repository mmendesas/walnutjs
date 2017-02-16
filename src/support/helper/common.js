'use strict'

var helperVars = require('./variables');
var helperString = require('./string');
var interpreter = require('../expressions/interpreter');

var common = {
    /**
     * Process expressions and vars in a text with walnut marks '${text}'
     */
    getTreatedValue: function (text) {
        var content = this.removeQuotationMark(text);

        var list = text.match(/\${(.*?)}/g);
        if (list === null) {
            return content;
        }

        for (var i = 0; i < list.length; i++) {
            var word = list[i];
            var newWord = word;

            //get only text content
            while (this.hasBracketsMark(newWord) || this.hasQuotationMark(newWord)) {
                newWord = this.removeBracketsMark(newWord);
                newWord = this.removeQuotationMark(newWord);
            }

            //parse vars
            newWord = helperVars.nutParseVars(newWord);

            //solve expressions
            newWord = interpreter.resolveExpression(newWord);

            //replacement
            content = content.replace(word, newWord);
        }

        return content;
    }
};

module.exports = common;