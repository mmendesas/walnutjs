var context = require('../src/support/context');

describe('Context Tests', () => {

    it('should be create a simple context', () => {
        context.setCurrentFeature("feature test");
        expect(context.getCurrentFeature()).toEqual("feature test");
    });

});