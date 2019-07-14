/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
const soap = require('soap');
const jsonparser = require('../parser/jsonparser');

class SoapClient {
  constructor() {
    this.wsdlPath = null;
    this.jsonToSend = null;
    this.jsonResponse = null;
    this.client = null;
  }

  startClient(wsdlPath) {
    const that = this;
    return new Promise((res, rej) => {
      soap.createClient(wsdlPath, (err, client) => {
        if (err) { rej(err); }
        that.client = client;
        that.wsdlPath = wsdlPath;
        res('ok');
      });
    });
  }

  getAllMethods() {
    const methods = Reflect.ownKeys(this.client)
      .filter(p => typeof this.client[p] === 'function'
        && !p.endsWith('Async'));

    return methods;
  }

  // eslint-disable-next-line class-methods-use-this
  getMethodByName(object, method) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item in object) {
      if (typeof object[item] === 'function') {
        if (item === method) {
          return object[item];
        }
      }
    }
    return '';
  }

  executeMethod(methodName) {
    return new Promise((res, rej) => {
      const methodToExec = this.getMethodByName(this.client, `${methodName}`);
      methodToExec(this.jsonToSend, (err, result) => {
        if (err) { return rej(err); }
        this.jsonResponse = result;
        return res(result);
      });
    });
  }

  describeMethod(methodName, type) {
    const described = this.client.describe();
    jsonparser.init(described);
    const methodToFind = `$..${methodName}`;
    const myObj = jsonparser.getValue(methodToFind)[0];
    const result = type.toLowerCase() === 'input' ? myObj.input : myObj.output;
    return result;
  }
}

module.exports = new SoapClient();
