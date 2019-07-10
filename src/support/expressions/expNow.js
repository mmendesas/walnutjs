/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const helperString = require('../helpers/string');

const expNow = {

  /**
   * Used to return the current time based on format
   */
  parseExpression(expression) {
    const parts = expression.split('|');

    if (parts.length === 2) {
      const fmt = parts[0].trim();
      const oper = parts[1].trim();

      if (oper.length < 3) {
        const sb = [];
        sb.push('[1] - now(format)           - now(HH:mm:ss)              - 10:17:05');
        sb.push('[2] - now(format|operator)  - now(HH:mm:ss|+3h)          - 13:17:05');
        sb.push('[3] - now(format|operator)  - now(HH|+1h)                - 15');
        sb.push('[4] - now(format|operator)  - now(yyyyMMdd-HH:mm:ss|+1d) - 20160826-15:30:05');

        throw sb.join('\n');
      }

      return this.formatDate(fmt, oper);
    }

    return this.formatDate(parts[0], null);
  },

  /**
   * Format the currente DateTime
   */
  formatDate(format, oper) {
    const mDate = new Date();
    let dateFormat = format;

    if (oper) {
      const isAdd = (oper.charAt(0) === '+');
      const qtd = parseInt(oper.match(/\d+/)[0], 10);
      const operator = oper.slice(-1);
      let usedDate = '';

      // format based on operator
      switch (operator) {
        case 'y':
          usedDate = isAdd ? mDate.setFullYear(mDate.getFullYear() + qtd) : mDate.setFullYear(mDate.getFullYear() - qtd);
          dateFormat = dateFormat.replace('yyyy', mDate.getFullYear().toString());
          break;

        case 'M':
          usedDate = isAdd ? mDate.setMonth(mDate.getMonth() + qtd) : mDate.setMonth(mDate.getMonth() - qtd);
          dateFormat = dateFormat.replace('MM', helperString.addZero(mDate.getMonth() + 1).toString());
          break;

        case 'd':
          usedDate = isAdd ? mDate.setDate(mDate.getDate() + qtd) : mDate.setDate(mDate.getDate() - qtd);
          dateFormat = dateFormat.replace('dd', helperString.addZero(mDate.getDate()).toString());
          break;

        case 'H':
        case 'h':
          usedDate = isAdd ? mDate.setHours(mDate.getHours() + qtd) : mDate.setHours(mDate.getHours() - qtd);
          dateFormat = dateFormat.replace('HH', helperString.addZero(mDate.getHours()).toString());
          break;

        case 'm':
          usedDate = isAdd ? mDate.setMinutes(mDate.getMinutes() + qtd) : mDate.setMinutes(mDate.getMinutes() - qtd);
          dateFormat = dateFormat.replace('mm', helperString.addZero(mDate.getMinutes()));
          break;

        case 's':
          usedDate = isAdd ? mDate.setSeconds(mDate.getSeconds() + qtd) : mDate(mDate.getSeconds() - qtd);
          dateFormat = dateFormat.replace('ss', helperString.addZero(mDate.getSeconds()));
          break;
        default:
          break;
      }
    }

    // default format
    dateFormat = dateFormat.replace('dd', helperString.addZero(mDate.getDate()));
    dateFormat = dateFormat.replace('MM', helperString.addZero(mDate.getMonth() + 1));
    dateFormat = dateFormat.replace('yyyy', mDate.getFullYear());
    dateFormat = dateFormat.replace('HH', helperString.addZero(mDate.getHours()));
    dateFormat = dateFormat.replace('mm', helperString.addZero(mDate.getMinutes()));
    dateFormat = dateFormat.replace('ss', helperString.addZero(mDate.getSeconds()));

    return dateFormat;
  },
};

module.exports = expNow;
