const api = require('../../../src/support/api/client')

describe('API Tests', () => {
  it('make a simple request', () => {
    api.createRequest('get', "https://httpbin.org/get")
    api.sendRequest().then(rsp => {
      console.log('response', rsp.status)
    })
  })
})
