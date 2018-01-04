var helperString = require('../helper/string');

var expCNPJ = {

    /**
     * Used to generate a valid CNPJ with or without format
     */
    parseExpression: function (expression) {

        if (expression != '' && expression != 'f') {
            var sb = [];
            sb.push("[1] - cnpj()  - 19445769000141");
            sb.push("[2] - cnpj(f) - 19.445.769/0001-41");

            throw sb.join('\n');
        }

        var cnpjResult = this.generateCNPJ();

        if (expression === '')
            return cnpjResult;

        if (expression === 'f')
            return helperString.formatString('{0}{1}.{2}{3}{4}.{5}{6}{7}/{8}{9}{10}{11}-{12}{13}', cnpjResult);
    },

    /**
     * Generate the valid CNPJ
     */
    generateCNPJ: function () {
        var ini = '';
        var num = 0;
        for (var i = 0; i < 8; i++) {
            num = Math.floor((Math.random() * 10));
            ini += num.toString();
        }

        ini = ini + "0001"
        return ini + this.calculateLastNums(ini);
    },

    /**
     * Calculate the last two characteres
     */
    calculateLastNums: function (num) {
        var num01 = 0, num02 = 0;
        var sum = 0, weight = 5;

        for (var i = 0; i < 4; i++) {
            sum += parseInt(num.substring(i, i + 1)) * weight--;
        }
        
        weight = 9;

        for (var i = 4; i < num.length; i++) {
            sum += parseInt(num.substring(i, i + 1)) * weight--;
        }

        if (sum % 11 == 0 | sum % 11 == 1)
            num01 = 0;
        else
            num01 = 11 - (sum % 11);

        sum = 0;
        weight = 6;
        
        
        for (var i = 0; i < 5; i++){
            sum += parseInt(num.substring(i, i + 1)) * weight--;
        }

        weight = 9;

        for (var i = 5; i < num.length; i++){
            sum += parseInt(num.substring(i, i + 1)) * weight--;
        }
            
        sum += parseInt(num01) * 2;

        if (sum % 11 == 0 | sum % 11 == 1)
            num02 = 0;
        else
            num02 = 11 - (sum % 11);

        return num01.toString() + num02.toString();
    }
};

module.exports = expCNPJ;