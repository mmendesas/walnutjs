var context = require('../src/support/context');
var helperElement = require('../src/support/helper/element');

describe('Helper Element Tests', () => {

    beforeEach(function () {
        context.loadFakeUIMap();
    });

    it('should be read value from json correctly', () => {
        var result = helperElement.findLocator("locBB", "key002");
        expect(result[0]).toEqual("type002");
        expect(result[1]).toEqual("value002");
    });

    it('should be read value from json correctly', () => {
        var result = helperElement.getElementFinder("locBB", "key002");
        expect(result).toContain("Type not found.");
    });

});