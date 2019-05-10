
const api = require('../../../src/support/api/client')
const helperVars = require('../../../src/support/helper/variables')

describe('API Tests', () => {
  const baseURL = "https://httpbin.org/get"

  beforeEach(() => {
    api.options = {}
  })

  it('should be able to create a simple request', () => {
    api.createRequest('get', baseURL)
    expect(api.options).toEqual({ method: 'get', url: baseURL })
  })

  it('should be able to create a simple request with options already set', () => {
    api.setBaseURL('myBaseURL')
    api.createRequest('get', baseURL)
    expect(api.options).toEqual({ baseURL: "myBaseURL", method: "get", url: baseURL })
  })

  it('should be able to create a simple request with treated value', () => {
    helperVars.addVariable('my_url', baseURL);
    api.createRequest('get', "${vars.my_url}")
    expect(api.options).toEqual({ method: 'get', url: baseURL })
  })
})
