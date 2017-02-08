var helperVars = require('../src/support/helper/variables');

describe('Helper Variables Tests', () => {

    it('should be create simple variable', () => {
        helperVars.addVariable("myVar", "House");
        var teste = helperVars.getVariable("myVar");
        expect(teste).toEqual("House");
    });

    it('should be create simple variable and read with expression', () => {
        helperVars.addVariable("myVar", "House");
        helperVars.addVariable("otherVar", "New Orleans");
        var teste = helperVars.nutParseVars("There is a vars.myVar in vars.otherVar");
        expect(teste).toEqual("There is a House in New Orleans");
    });

});