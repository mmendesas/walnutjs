var context = require('../src/support/context');
var ele = require('../src/support/helper/element');
var vars = require('../src/support/helper/variables');
var helperString = require('../src/support/helper/string');

describe('Common Tests', () => {

    it('should be create a simple context', () => {
        context.setCurrentFeature("feature test");
        expect(context.getCurrentFeature()).toEqual("feature test");
    });

    it('should be create simple variable', () => {
        vars.addVariable("myVar", "House");
        var teste = vars.getVariable("myVar");
        expect(teste).toEqual("House");
    });

    it('should be create simple variable and read with expression', () => {
        vars.addVariable("myVar", "House");
        vars.addVariable("otherVar", "New Orleans");
        var teste = vars.nutParseVars("There is a vars.myVar in vars.otherVar");
        expect(teste).toEqual("There is a House in New Orleans");
    });

    it('should be format simple string with parameters', () => {
        var params = ["Water", "Sky"];
        var text = helperString.formatString("Smoke on the {0}, fire in the {1}", params);
        expect(text).toEqual("Smoke on the Water, fire in the Sky");
    });

});