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

});