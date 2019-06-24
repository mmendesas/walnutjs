const params = require('../../../src/support/helpers/params');

describe('Params Tests', () => {

  beforeAll(() => {
    global['parameters'] = require("../../samples/params.json");
  });

  it('should process params correctly', () => {
    const result = params.nutParseParams("url: params.[$.default.base_url]");
    expect(result).toEqual("url: https://httpbin.org/get");
  });

  it('should process multi params correctly', () => {
    const result = params.nutParseParams("url: params.[$.default.base_url] name: [params.[$..name]]");
    expect(result).toEqual("url: https://httpbin.org/get name: [walnutjs-test]");
  });

  it('should return message when using wrong jsonpath', () => {
    const result = params.nutParseParams("params.[$.wathever]");
    expect(result).toEqual("unknown-jsonpath");
  });
});
