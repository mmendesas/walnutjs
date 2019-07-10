const element = require('../../../src/support/helpers/element');

describe('Helper Element Tests', () => {
  beforeEach(function () {
    // load fake UI Map
    global['locators'] = require('../../samples/locators.json');
  });

  describe('getLocator()', () => {
    it('should be read locator value from json', () => {
      const result = element.getLocator('locBB', 'key002');
      expect(result.type).toEqual('type002');
      expect(result.value).toEqual('value002');
    });

    it('should be read locator value with spaces from json', () => {
      const result = element.getLocator('locBB', 'key001');
      expect(result.type).toEqual('type001');
      expect(result.value).toEqual('value 00 1');
    });
  });

  describe('getElementFinder()', () => {
    it('should not be construct the element with a invalid type', () => {
      expect(function () {
        element.getElementFinder('locBB', 'key002');
      }).toThrow(new Error('Locator Type not found.'));
    });
  });

  describe('getParams()', () => {
    it('should be mount list with spaces', () => {
      const name = 'SubMenu:[Contatos e Protocolos]';
      const params = element.getParams(name);
      expect(params[0]).toEqual('Contatos e Protocolos');
    });

    it('should be mount list with spaces  and more than one item', () => {
      const name = 'SubMenu:[Contatos e Protocolos|Mteste]';
      const params = element.getParams(name);
      expect(params[0]).toEqual('Contatos e Protocolos');
      expect(params[1]).toEqual('Mteste');
    });

    it('should be mount list with special characteres', () => {
      const name = 'SubMenu:[Atirei o pau, no gato/to|!@#$%*()_]';
      const params = element.getParams(name);
      expect(params[0]).toEqual('Atirei o pau, no gato/to');
      expect(params[1]).toEqual('!@#$%*()_');
    });
  });
});
