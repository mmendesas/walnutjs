var expMath = {

    /**
     * Used to make simple math operations
     */
    parseExpression: function (expression) {

        var sb = [];
        sb.push("[1] - math(num|operator:type|num)  - math(5|add:d|2)  - (5.0 + 2.5) - 7.5");
        sb.push("[2] - math(num|operator:type|num)  - math(5|sub:i|2)  - (5 - 2)     - 3  ");
        sb.push("[3] - math(num|operator:type|num)  - math(5|mul:i|2)  - (5 * 2)     - 10 ");
        sb.push("[4] - math(num|operator:type|num)  - math(5|div:d|2)  - (5.0 / 2)   - 2.5");

        var parts = expression.split('|');

        if (parts.length != 3 || !expression.includes(':')) {
            throw sb.join('\n');
        }

        var result;
        var operType = parts[1];
        var oper = operType.split(':')[0];
        var type = operType.split(':')[1];

        var num01 = parts[0].trim();
        var num02 = parts[2].trim();

        try {
            switch (type.toLowerCase().trim()) {
                case 'i':
                    result = this.getIntegerProcessedValue(num01, oper, num02);
                    return result;
                case 'd':
                    result = this.getFloatProcessedValue(num01, oper, num02);
                    return result;
                default:
                    break;
            }

        } catch (err) {
            throw sb.join('\n');
        }
    },

    /**
     * Return the result of operation as Integer
     */
    getIntegerProcessedValue: function (num01, oper, num02) {
        var iRetValue = 0;
        var inum01 = parseInt(num01);
        var inum02 = parseInt(num02);

        switch (oper.trim().toLowerCase()) {
            case "add":
                iRetValue = inum01 + inum02;
                break;
            case "sub":
                iRetValue = inum01 - inum02;
                break;
            case "mul":
                iRetValue = inum01 * inum02;
                break;
            case "div":
                iRetValue = inum01 / inum02;
                break;

            default:
                throw 'Illegal argument';
        }

        return iRetValue.toString();
    },

    /**
     * Return the result of operation as Float
     */
    getFloatProcessedValue: function (num01, oper, num02) {
        var dRetValue = 0;
        var dnum01 = parseFloat(num01);
        var dnum02 = parseFloat(num02);

        switch (oper.trim().toLowerCase()) {
            case "add":
                dRetValue = dnum01 + dnum02;
                break;
            case "sub":
                dRetValue = dnum01 - dnum02;
                break;
            case "mul":
                dRetValue = dnum01 * dnum02;
                break;
            case "div":
                dRetValue = dnum01 / dnum02;
                break;

            default:
                throw 'Illegal argument';
        }

        return parseFloat(dRetValue).toString();
    }
};

module.exports = expMath;