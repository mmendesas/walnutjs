var context = require('../src/support/context');
var helperElement = require('../src/support/helper/element');

describe('Helper Element Tests', () => {

    beforeEach(function () {
        context.loadFakeUIMap();
    });

    it('should be read locator value from json', () => {
        var result = helperElement.findLocator("locBB", "key002");
        expect(result[0]).toEqual("type002");
        expect(result[1]).toEqual("value002");
    });

    it('should be read locator value with spaces from json', () => {
        var result = helperElement.findLocator("locBB", "key001");
        expect(result[0]).toEqual("type001");
        expect(result[1]).toEqual("value 00 1");
    });

    it('should not be construct the element with a invalid type', () => {
        var result = helperElement.getElementFinder("locBB", "key002");
        expect(result).toContain("Type not found.");
    });

    it('should be mount list with spaces', () => {
        var name = "SubMenu:[Contatos e Protocolos]";
        var params = helperElement.getParams(name);
        expect(params[0]).toEqual('Contatos e Protocolos');
    });

    it('should be mount list with spaces  and more than one item', () => {
        var name = "SubMenu:[Contatos e Protocolos|Mteste]";
        var params = helperElement.getParams(name);
        expect(params[0]).toEqual('Contatos e Protocolos');
        expect(params[1]).toEqual('Mteste');
    });

    it('should be mount list with special characteres', () => {
        var name = "SubMenu:[Atirei o pau, no gato/to|!@#$%*()_]";
        var params = helperElement.getParams(name);
        expect(params[0]).toEqual('Atirei o pau, no gato/to');
        expect(params[1]).toEqual('!@#$%*()_');
    });

});