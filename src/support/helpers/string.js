

module.exports = {

  /**
   * Remove spaces, set tolower and put a dash between words
   */
  slugify: text => text.trim().toLowerCase().replace(/[^a-z0-9]+/gi, '-'),

  /**
   * Check if text has Quotation Mark
   */
  hasQuotationMark(text) {
    return text.startsWith('"') && text.endsWith('"');
  },

  /**
   * Remove Quotation Mark
   */
  removeQuotationMark(txt) {
    let text = txt;
    if (this.hasQuotationMark(text)) {
      text = text.substring(text.indexOf('"') + 1, text.lastIndexOf('"'));
    }
    return text;
  },

  /**
   * Check if text has Brackets Mark
   */
  hasBracketsMark(text) {
    return text.startsWith('${') && text.endsWith('}');
  },

  /**
   * Remove Brackets Mark
   */
  removeBracketsMark(text) {
    let res = text;
    if (this.hasBracketsMark(text)) {
      res = text.substring(text.indexOf('{') + 1, text.lastIndexOf('}'));
    }
    return res;
  },

  /**
   * Format string with parameters replacement
   */
  formatString(text, args) {
    const mgroup = text.match((/{(\d+)}/g));
    if (mgroup) {
      for (let i = 0; i < mgroup.length; i += 1) {
        // eslint-disable-next-line no-param-reassign
        text = text.replace(mgroup[i], args[i]);
      }
    }
    return text;
  },

  /**
   * Put zero left of number if is lower than 10
   */
  addZero: (i) => {
    let result = i;
    if (i < 10) { result = `0${i}`; }
    return result;
  },

  /**
   * Check if char is a letter
   */
  isLetter: text => text.length === 1 && text.match(/[a-z]/i),

  /**
   * Returns the number of occurrences of a letter
   */
  countLetters: (haystack, needle) => {
    let count = 0;
    for (let i = 0; i < haystack.length; i += 1) {
      if (haystack[i] === needle) {
        count += 1;
      }
    }
    return count;
  },

  formatWitDigits: (value, padding) => {
    const zeroes = new Array(padding + 1).join('0');
    return (zeroes + value).slice(-padding);
  },
};
