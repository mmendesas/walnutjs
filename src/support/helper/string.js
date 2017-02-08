'use strict';

var helperVars = require('./variables');

module.exports = function StringHelper() {
    return {

        slugify: function (text) {
            return text.toLowerCase().replace(/[^a-z0-9]+/gi, '-');
        },

        hasQuotationMark: function (text) {
            return text.startsWith('\"') && text.endsWith('\"');
        },

        removeQuotationMark: function (text) {
            if (this.hasQuotationMark(text))
                text = text.substring(text.indexOf('"') + 1, text.lastIndexOf('"'));
            return text;
        },

        hasBracketsMark: function (text) {
            return text.startsWith('${') && text.endsWith('}');
        },

        removeBracketsMark: function (text) {
            if (this.hasBracketsMark(text))
                text = text.substring(text.indexOf('{') + 1, text.lastIndexOf('}'));
            return text;
        },

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
                //replacement
                content = content.replace(word, newWord);
            }

            return content;
        },

        /**
         * Format string with parameters replacement
         */
        formatString: function (text, args) {
            var mgroup = text.match((/{(\d+)}/g));
            for (var i = 0; i < mgroup.length; i++) {
                text = text.replace(mgroup[i], args[i]);
            }
            return text;
        }
    };
}();