var helperString = require('../src/support/helper/string');
var helperVars = require('../src/support/helper/variables');

describe('Helper String Tests', () => {

    it('should be identify quotation mark', () => {
        var result = helperString.hasQuotationMark('"noQuotation"');
        expect(result).toEqual(true);
    });

    it('should be remove quotation mark', () => {
        var msg = helperString.removeQuotationMark('"noQuotation"');
        expect(msg).toEqual('noQuotation');
    });

    it('should be identify brackets mark', () => {
        var result = helperString.hasBracketsMark('${noBrackets}');
        expect(result).toEqual(true);
    });

    it('should be remove brackets mark', () => {
        var msg = helperString.removeBracketsMark('${noBrackets}');
        expect(msg).toEqual('noBrackets');
    });

    it('should be format simple text with one parameter', () => {
        var text = helperString.formatString("Angular with {0} is very cool", ["Cucumber"]);
        expect(text).toEqual("Angular with Cucumber is very cool");
    });

    it('should be format simple text with more than one parameter', () => {
        var text = helperString.formatString("Angular with {0} is {1} and very cool", ["Cucumber", "Amazing"]);
        expect(text).toEqual("Angular with Cucumber is Amazing and very cool");
    });

    it('should be remove spaces and add dash to text', () => {
        var msg = helperString.slugify("Silasticos  Armademonios de Striterax");
        expect(msg).toEqual("silasticos-armademonios-de-striterax");
    });

    it('should be format simple string with parameters', () => {
        var params = ["Water", "Sky"];
        var text = helperString.formatString("Smoke on the {0}, fire in the {1}", params);
        expect(text).toEqual("Smoke on the Water, fire in the Sky");
    });

});