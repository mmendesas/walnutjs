'use strict';

var helperVars = require('./variables');
// var interpreter = require('../expressions/interpreter');

var StringHelper = {

    /**
     * Remove spaces, set tolower and put a dash between words
     */
    slugify: function (text) {
        return text.trim().toLowerCase().replace(/[^a-z0-9]+/gi, '-');
    },

    /**
     * Check if text has Quotation Mark
     */
    hasQuotationMark: function (text) {
        return text.startsWith('\"') && text.endsWith('\"');
    },

    /**
     * Remove Quotation Mark
     */
    removeQuotationMark: function (text) {
        if (this.hasQuotationMark(text))
            text = text.substring(text.indexOf('"') + 1, text.lastIndexOf('"'));
        return text;
    },

    /**
     * Check if text has Brackets Mark
     */
    hasBracketsMark: function (text) {
        return text.startsWith('${') && text.endsWith('}');
    },

    /**
     * Remove Brackets Mark
     */
    removeBracketsMark: function (text) {
        if (this.hasBracketsMark(text))
            text = text.substring(text.indexOf('{') + 1, text.lastIndexOf('}'));
        return text;
    },

    /**
     * Format string with parameters replacement
     */
    formatString: function (text, args) {
        var mgroup = text.match((/{(\d+)}/g));
        if (mgroup) {
            for (var i = 0; i < mgroup.length; i++) {
                text = text.replace(mgroup[i], args[i]);
            }
        }
        return text;
    },

    /**
     * Put zero left of number if is lower than 10
     */
    addZero: function (i) {
        if (i < 10)
            i = '0' + i;
        return i;
    },

    /**
     * Check if char is a letter
     */
    isLetter: function (str) {
        return str.length === 1 && str.match(/[a-z]/i);
    },

    /**
     * Returns the number of occurrences of a letter
     */
    countLetters: function (haystack, needle) {
        var count = 0;
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle)
                count++;
        }
        return count;
    },
    
    formatWitDigits: function (value, padding) {
        var zeroes = new Array(padding + 1).join("0");
        return (zeroes + value).slice(-padding);
    }
};

module.exports = StringHelper;