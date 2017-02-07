var helperString = require('../src/support/helper/string');
var helperVars = require('../src/support/helper/variables');

describe('String Helper Tests', () => {

    it('should be remove quotation mark', () => {
        var msg = helperString.removeQuotationMark('"noQuotation"');
        expect(msg).toEqual('noQuotation');
    });

    it('should be remove brackets mark', () => {
        var msg = helperString.removeBracketsMark('${noBrackets}');
        expect(msg).toEqual('noBrackets');
    });

    it('should be process expressions correctly', () => {
        helperVars.addVariable('nome', 'Armademônios');
        var msg = helperString.getTreatedValue("Silasticos ${vars.nome} de Striterax");
        expect(msg).toEqual("Silasticos Armademônios de Striterax");
    });

    it('should be process expressions correctly', () => {
        var msg = helperString.getTreatedValue("Silasticos Striterax");
        expect(msg).toEqual("Silasticos Striterax");
    });

});