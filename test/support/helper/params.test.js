const helperParams = require('../../../src/support/helpers/params');
const config = require('../../../src/support/config');
const context = require('../../../src/support/context');

describe('Params Tests', () => {

    beforeAll(() => {
        config.parametersPath = "../../samples/params.json";
        context.parameters = require(config.parametersPath);
    });

    it('should process params correctly', () => {
        var teste = helperParams.nutParseParams("url: params.[$.default.base_url]");
        expect(teste).toEqual("url: https://httpbin.org/get");
    });

    it('should process multi params correctly', () => {
        var teste = helperParams.nutParseParams("url: params.[$.default.base_url] name: [params.[$..name]]");
        expect(teste).toEqual("url: https://httpbin.org/get name: [walnutjs-test]");
    });

    it('should return message when using wrong jsonpath', () => {
        var teste = helperParams.nutParseParams("params.[$.wathever]");
        expect(teste).toEqual("unknown-jsonpath");
    });
});