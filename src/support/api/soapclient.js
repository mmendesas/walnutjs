/* eslint-disable no-undef */
const soap = require('soap');
const jsonparser = require('../parser/jsonparser');

const { logger } = helpers;

class SoapClient {
  constructor() {
    this.wsdlPath = null;
    this.jsonToSend = null;
    this.jsonResponse = null;
    this.client = null;
  }

  startClient(wsdlPath) {
    soap.createClient(wsdlPath, (err, client) => {
      this.client = client;
      this.wsdlPath = wsdlPath;
    });
  }

  getAllMethods() {
    const methods = Reflect.ownKeys(this.client)
      .filter(p => typeof this.client[p] === 'function');

    return methods;
  }

  static getMethodByName(object, method) {
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
    const methodToExec = this.getMethodByName(this.client, methodName);

    methodToExec(this.jsonToSend, (err, result) => {
      this.jsonResponse = result;
      logger.debug(`SOAP JSON Response: ${JSON.stringify(result)}`);
    });
  }

  describeMethod(methodName, type) {
    jsonparser.init(this.client.describe());
    const methodToFind = `$..${methodName}`;
    const myObj = jsonparser.getValue(methodToFind)[0];
    const result = type.toLowerCase() === 'input' ? myObj.input : myObj.output;
    return result;
  }
}

module.exports = new SoapClient();
