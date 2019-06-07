'use strict';

module.exports = {

  /**
   * Remove spaces, set tolower and put a dash between words
   */
  slugify: (text) => {
    return text.trim().toLowerCase().replace(/[^a-z0-9]+/gi, '-');
  },

  /**
   * Check if text has Quotation Mark
   */
  hasQuotationMark: (text) => {
    return text.startsWith('\"') && text.endsWith('\"');
  },

  /**
   * Remove Quotation Mark
   */
  removeQuotationMark: (text) => {
    if (helpers.string.hasQuotationMark(text)) { text = text.substring(text.indexOf('"') + 1, text.lastIndexOf('"')) }
    return text;
  },

  /**
   * Check if text has Brackets Mark
   */
  hasBracketsMark: (text) => {
    return text.startsWith('${') && text.endsWith('}');
  },

  /**
   * Remove Brackets Mark
   */
  removeBracketsMark: (text) => {
    if (helpers.string.hasBracketsMark(text)) { text = text.substring(text.indexOf('{') + 1, text.lastIndexOf('}')) }

    return text;
  },

  /**
   * Format string with parameters replacement
   */
  formatString: (text, args) => {
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
  addZero: (i) => {
    if (i < 10) { i = '0' + i }
    return i;
  },

  /**
   * Check if char is a letter
   */
  isLetter: (str) => {
    return str.length === 1 && str.match(/[a-z]/i);
  },

  /**
   * Returns the number of occurrences of a letter
   */
  countLetters: (haystack, needle) => {
    var count = 0;
    for (var i = 0; i < haystack.length; i++) {
      if (haystack[i] === needle) { count++ }
    }
    return count;
  },

  formatWitDigits: (value, padding) => {
    var zeroes = new Array(padding + 1).join('0');
    return (zeroes + value).slice(-padding);
  }
};

