var expConcatenate = {

    /**
     * Used to concatenate list of params with pattern (param1|param2)
     */
    parseExpression: function (expression) {
        var ret = '';
        var parts = expression.split('|');

        if (parts.length < 2) {
            var sb = [];
            sb.push("[1] - concatenate(arg1|arg2)      - concatenate(teste|451)      - teste451");
            sb.push("[2] - concatenate(arg1|arg2|argN) - concatenate(teste|451|_abc) - teste451_abc");

            throw sb.join('\n');
        }

        for (var i = 0; i < parts.length; i++) {
            ret += parts[i];
        }

        return ret;
    }
};

module.exports = expConcatenate;