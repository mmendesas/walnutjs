/* eslint-disable no-undef */
const { Given, When, Then } = require('cucumber');
const soapclient = require('../../support/api/soapclient');
const jsonparser = require('../../support/parser/jsonparser');

const {
  common, file, logger, vars,
} = helpers;

/**
 * User defines the wsdlPath
 */
Given(/^\(soap\) user set the WSDL Path with value '(.*)'$/, (wsdlPath) => {
  const wsdlPathTreated = common.getTreatedValue(wsdlPath);
  return soapclient.startClient(wsdlPathTreated).then(() => logger.info(`User uses the WSDL PATH: ${soapclient.wsdlPath}`));
});

/**
 * User prints the current body content (Req|Res)
 */
Given(/^\(soap\) user prints the current (REQUEST|RESPONSE) body content$/, (type) => {
  const content = type === 'REQUEST' ? soapclient.jsonToSend : soapclient.jsonResponse;
  logger.info(`SOAP [${type}] content:\n${JSON.stringify(content)}\n`);
});

/**
 * Loads the json body to send from a simple file
 */
When(/^\(soap\) user add the JSON body from the resource '(.*)'$/, (path) => {
  let filepath = common.getTreatedValue(path);
  filepath = file.getTreatedPath(filepath);

  if (filepath === '') {
    logger.error(`File [${filepath}] not found. Please set the complete path of the file.`);
    return;
  }

  soapclient.jsonToSend = '';
  const fileContent = file.readContentFromFile(filepath);
  soapclient.jsonToSend = JSON.parse(fileContent);
  logger.info(`SOAP Content:\n${JSON.stringify(soapclient.jsonToSend)}`);
});

/**
 * Executes a operation with SOAP request
 */
When(/^\(soap\) user executes the SOAP Request with operation '(.*)'$/, operation => soapclient.executeMethod(operation)
  .then(() => logger.info(`SOAP Operation: [${operation}]`)));

/**
* Validates a value in specific node in JSON response.body
*/
Then(/^\(soap\) the JSON \(jsonpath\) key '(.*)' has value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, (key, comparissonType, expected) => {
  const keyPath = common.getTreatedValue(key);
  const expectedValue = common.getTreatedValue(expected);

  jsonparser.init(soapclient.jsonResponse);
  const valueFromFile = jsonparser.getValue(keyPath)[0] || '<path not found>';
  common.compare(valueFromFile, comparissonType, expectedValue);
});

/**
* Stores the value from Request/Response
*/
Then(/^\(soap\) user stores the value '(.*)' from (REQUEST|RESPONSE) in variable '(.*)'$/, (key, type, name) => {
  const varName = common.getTreatedValue(name);
  const keyPath = common.getTreatedValue(key);
  const jsonObj = type === 'REQUEST' ? soapclient.jsonToSend : soapclient.jsonResponse;

  jsonparser.init(jsonObj);
  const varValue = jsonparser.getValue(keyPath)[0] || '<path not found>';
  vars.addVariable(varName, varValue);
});

/**
 * Update the content of jsonToSend
 */
When(/^\(soap\) user fills the \(jsonpath\) key '(.*)' with value '(.*)'$/, (path, value) => {
  const jsonPath = common.getTreatedValue(path);
  const newValue = common.getTreatedValue(value);

  jsonparser.init(soapclient.jsonToSend);
  jsonparser.setValue(jsonPath, newValue);
});

/**
* Prints the list of methods inside this endpoint
*/
When(/^\(soap\) user prints the list of methods in current endpoint$/, () => soapclient.getAllMethods()
  .then(values => logger.info(`SOAP Methods in current endpoint:\n${JSON.stringify(values)}\n`)));

/**
* Export a template (input/output) from the method
*/
When(/^\(soap\) user exports the (INPUT|OUTPUT) template of method '(.*)' to file '(.*)'$/, (type, method, path) => {
  const filepath = file.getTreatedPath(path);

  soapclient.describeMethod(method, type)
    .then((result) => {
      const content = JSON.stringify(result, null, '\t');
      logger.debug(`SOAP ${type} template in current endpoint:\n${content}\n`);
      file.writeContentToFile(content, filepath);
    });
});

/**
* Exports all templates from current endpoint
*/
When(/^\(soap\) user export all templates from current endpoint to folder '(.*)'$/, (path) => {
  const folderpath = file.getTreatedPath(path);
  file.ensureDirectoryExistence(`${folderpath}/m.js`); // fake file for right operation

  soapclient.getAllMethods()
    .then((values) => {
      values.forEach((method) => {
        soapclient.describeMethod(method, 'input')
          .then((result) => {
            const content = JSON.stringify(result, null, '\t');
            const filepath = `${folderpath}/input_${method}.json`;
            file.writeContentToFile(content, filepath);
          });
        soapclient.describeMethod(method, 'output')
          .then((result) => {
            const content = JSON.stringify(result, null, '\t');
            const filepath = `${folderpath}/output_${method}.json`;
            file.writeContentToFile(content, filepath);
          });
      });
    });
});
