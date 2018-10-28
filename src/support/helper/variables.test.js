var helperVars = require('./variables');

describe('Helper Variables Tests', () => {

    beforeAll(() => {
        helperVars.addVariable("myVar", "House");
        helperVars.addVariable("otherVar", "New Orleans");
    });

    it('should be create simple variable', () => {
        var result = helperVars.getVariable("myVar");
        expect(result).toEqual("House");
    });

    it('should read an invalida var', () => {
        var result = helperVars.getVariable("grs");
        expect(result).toEqual("unknown-var");
    });

    it('should be create simple variable and read with expression', () => {
        var result = helperVars.nutParseVars("There is a vars.myVar in vars.otherVar");
        expect(result).toEqual("There is a House in New Orleans");
    });

    it('should read multiple vars in the same sentence', () => {
        var result = helperVars.nutParseVars("There is a [vars.myVar] in [vars.otherVar]");
        expect(result).toEqual("There is a [House] in [New Orleans]");
    });

    it('should read multiple invalid vars in the same sentence', () => {
        var result = helperVars.nutParseVars("There is a [vars.test1] in [vars.test2]");
        expect(result).toEqual("There is a [unknown-var] in [unknown-var]");
    });

    it('should return all variables', () => {
        var result = helperVars.getAllVariables();
        expect(result).toEqual({ myVar: "House", otherVar: "New Orleans" });
    });

});