var helperString = require('../helper/string');

var expCPF = {

    /**
     * Used to generate a valid CPF with or without format
     */
    parseExpression: function (expression) {

        if (expression != '' && expression != 'f') {
            var sb = [];
            sb.push("[1] - cpf()  - 32145698787");
            sb.push("[2] - cpf(f) - 312.456.987-87");

            throw sb.join('\n');
        }

        var cpfResult = this.generateCPF();

        if (expression === '')
            return cpfResult;

        if (expression === 'f')
            return helperString.formatString('{0}{1}{2}.{3}{4}{5}.{6}{7}{8}-{9}{10}', cpfResult);
    },

    /**
     * Generate the valid CPF
     */
    generateCPF: function () {
        var ini = '';
        var num = 0;

        for (var i = 0; i < 9; i++) {
            num = Math.floor((Math.random() * 9) + 1);
            ini += num.toString();
        }
        return ini + this.calculateLastNums(ini);
    },

    /**
     * Calculate the last two characteres
     */
    calculateLastNums: function (num) {
        var num01 = 0, num02 = 0;
        var sum = 0, weight = 10;

        for (var i = 0; i < num.length; i++) {
            var mm = num.substring(i, i + 1);
            sum += parseInt(num.substring(i, i + 1)) * weight--;
        }

        if (sum % 11 == 0 | sum % 11 == 1)
            num01 = 0;
        else
            num01 = 11 - (sum % 11);

        sum = 0;
        weight = 11;
        for (var i = 0; i < num.length; i++)
            sum += parseInt(num.substring(i, i + 1)) * weight--;

        sum += parseInt(num01) * 2;

        if (sum % 11 == 0 | sum % 11 == 1)
            num02 = 0;
        else
            num02 = 11 - (sum % 11);

        return num01.toString() + num02.toString();
    }
};

module.exports = expCPF;