var expToNumber = {

    /**
     * Used to return only number of string value
     */
    parseExpression: function (expression) {

        var parts = expression.split('|');

        if (parts.length < 2) {
            var sb = [];
            sb.push("[1] - tonumber(text | format) - tonumber(R$16,70|d)  - 16.7");
            sb.push("[2] - tonumber(text | format) - tonumber(R$16,70|i)  - 16");
            throw sb.join('\n');
        }

        var text = parts[0].trim();
        var format = parts[1].trim();

        var mgroup = text.match((/\d+(.|,)\d+/g));
        var item = (mgroup.length > 0) ? mgroup[0] : text;
        item = item.replace(',', '.');

        switch (format) {
            case 'i':
                return parseInt(item).toString();
            case 'd':
                return parseFloat(item).toString();
            default:
                break;
        }
    }
};

module.exports = expToNumber;