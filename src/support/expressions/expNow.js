var helperString = require('../helper/string');

var expNow = {

    /**
     * Used to return the current time based on format
     */
    parseExpression: function (expression) {

        var parts = expression.split('|');

        if (parts.length == 2) {
            var fmt = parts[0].trim();
            var oper = parts[1].trim();

            if (oper.length < 3) {
                var sb = [];
                sb.push("[1] - now(format)  	     - now(HH:mm:ss) 		      - 10:17:05");
                sb.push("[2] - now(format|operator)  - now(HH:mm:ss|+3h) 		  - 13:17:05");
                sb.push("[3] - now(format|operator)  - now(HH|+1h) 				  - 15");
                sb.push("[4] - now(format|operator)  - now(yyyyMMdd-HH:mm:ss|+1d) - 20160826-15:30:05");

                throw sb.join('\n');
            }
            return this.formatDate(fmt, oper);
        } else {
            return this.formatDate(parts[0], null);
        }
    },

    /**
     * Format the currente DateTime
     */
    formatDate: function (dateFormat, oper) {

        var mDate = new Date();

        if (oper) {
            var isAdd = (oper.charAt(0) === '+');
            var qtd = parseInt(oper.match(/\d+/)[0]);
            var operator = oper.slice(-1);
            var newDate;

            //format based on operator
            switch (operator) {
                case 'y':
                    newDate = isAdd ? mDate.getFullYear() + qtd : mDate.getFullYear() - qtd;
                    dateFormat = dateFormat.replace('yyyy', helperString.addZero(newDate).toString());
                    break;

                case 'M':
                    newDate = isAdd ? mDate.getMonth() + qtd : mDate.getMonth() - qtd;
                    dateFormat = dateFormat.replace('MM', helperString.addZero(newDate));
                    break;

                case 'd':
                    newDate = isAdd ? mDate.getDate() + qtd : mDate.getDate() - qtd;
                    dateFormat = dateFormat.replace('dd', helperString.addZero(newDate));
                    break;

                case 'H':
                case 'h':
                    newDate = isAdd ? mDate.getHours() + qtd : mDate.getHours() - qtd;
                    dateFormat = dateFormat.replace('HH', helperString.addZero(newDate).toString());
                    break;

                case 'm':
                    newDate = isAdd ? mDate.getMinutes() + qtd : mDate.getMinutes() - qtd;
                    dateFormat = dateFormat.replace('mm', helperString.addZero(newDate));
                    break;

                case 's':
                    newDate = isAdd ? mDate.getSeconds() + qtd : mDate.getSeconds() - qtd;
                    dateFormat = dateFormat.replace('ss', helperString.addZero(newDate));
                    break;
            }
        }

        //default format
        dateFormat = dateFormat.replace('dd', mDate.getDate());
        dateFormat = dateFormat.replace('MM', helperString.addZero(mDate.getMonth()));
        dateFormat = dateFormat.replace('yyyy', mDate.getFullYear());
        dateFormat = dateFormat.replace('HH', helperString.addZero(mDate.getHours()));
        dateFormat = dateFormat.replace('mm', helperString.addZero(mDate.getMinutes()));
        dateFormat = dateFormat.replace('ss', helperString.addZero(mDate.getSeconds()));

        return dateFormat;
    }
};

module.exports = expNow;