var helperCommon = require('../src/support/helper/common');
var helperVars = require('../src/support/helper/variables');

describe('Common Helper Tests', () => {

    it('should be process text with expressions/vars correctly', () => {
        helperVars.addVariable('nome', 'Armademônios');
        var msg = helperCommon.getTreatedValue("Silasticos ${vars.nome} de Striterax");
        expect(msg).toEqual("Silasticos Armademônios de Striterax");
    });

    it('should be process text without expressions/vars correctly', () => {
        var msg = helperCommon.getTreatedValue("Silasticos Striterax");
        expect(msg).toEqual("Silasticos Striterax");
    });

    it('should be process compare with all combinations', () => {

        var data =
            [
                // ['Current', 'Comparisson', 'Value', 'Result', 'Return MSG'],
                ['Black Dog', 'which contains', 'Dog', true, ''],
                ['Black Dog', 'which not contains', 'TS', true, ''],
                ['Black Dog', 'equals to', 'Black Dog', true, ''],
                ['Black Dog', 'not equals to', 'Dog', true, ''],
                ['Black Dog', 'which contains', 'Kashimir', false, 'Current value [Black Dog] not contains [Kashimir]'],
                ['Black Dog', 'which not contains', 'Black Dog', false, 'Current value [Black Dog] contains [Black Dog]'],
                ['Black Dog', 'equals to', 'Kashimir', false, 'Current value [Black Dog] not equals to [Kashimir]'],
                ['Black Dog', 'not equals to', 'Black Dog', false, 'Current value [Black Dog] is equals to [Black Dog]']
            ];

        for (var i = 0; i < data.length; i++) {
            var comparisson = helperCommon.compare(data[i][0], data[i][1], data[i][2]);
            expect(comparisson.result).toEqual(data[i][3]);
            expect(comparisson.msg).toEqual(data[i][4]);
        }

    });

});