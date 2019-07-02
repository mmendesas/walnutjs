/* eslint-disable no-undef */
const { Then } = require('cucumber');

const api = require('../../support/api/client');
const jsonparser = require('../../support/parser/jsonparser');
const xmlparser = require('../../support/parser/xmlparser');

const { vars, common, logger } = helpers;

/**
 *  Validates the response status code
 */
Then(/^\(api\) the response (status|statusText) should be '(\d+)'$/, (type, statusCode) => {
  const recStatus = type === 'status' ? api.response.status.toString() : api.response.statusText;
  assert.equal(statusCode, recStatus);
  logger.info(`User receives response status code [${recStatus}]`);
});

/**
 * Compare the full value of body response
 */
Then(/^\(api\) the (JSON|XML) response should be:$/, (type, expectedContent) => {
  api.responseContent = api.responseContent.replace(/(\r\n|\n|\r|\s)/gm, '');
  const content = expectedContent.replace(/(\r\n|\n|\r|\s)/gm, '');
  // compare
  assert.equal(api.responseContent, content);
});

/**
 * Validates a value in specific node in JSON response.body
 */
Then(/^\(api\) the JSON response key '(.*)' should have value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, (keyPath, comparissonType, expectedValue) => {
  const key = common.getTreatedValue(keyPath);
  const expected = common.getTreatedValue(expectedValue);

  // get value from JSON using JSONPATH
  jsonparser.init(api.response.data);
  const jsonValue = jsonparser.getValue(key)[0];

  // compare
  common.compare(jsonValue, comparissonType, expected);
});

/**
 * Validates a value in specific node in XML response.body
 */
Then(/^\(api\) the XML response key '(.*)' should have value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, (keyPath, comparissonType, expectedValue) => {
  const key = common.getTreatedValue(keyPath);
  const expected = common.getTreatedValue(expectedValue);

  // get value from XML using XPATH
  xmlparser.init(api.response.data);
  const xmlValue = xmlparser.getTagValue(key) || '<path not found>';

  // compare
  common.compare(xmlValue, comparissonType, expected);
});

// Validates a value in specific node in response header.
Then(/^\(api\) the header response key '(.*)' should have value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, (header, comparissonType, expectedValue) => {
  // Treat the parameters informations
  const headerName = common.getTreatedValue(header);
  const expected = common.getTreatedValue(expectedValue);

  // Get the header value response from parameter informed
  const content = api.response.headers[headerName];

  // compare
  common.compare(content, comparissonType, expected);
});

/**
* Stores the value of the response field found by json path
*/
Then(/^\(api\) user stores the value '(.*)' from response in variable '(.*)'$/, (keyPath, name) => {
  const key = common.getTreatedValue(keyPath);
  const varName = common.getTreatedValue(name);

  // get value from JSON using JSONPATH
  jsonparser.init(api.response.data);
  const varValue = jsonparser.getValue(key)[0];

  // Add the value to variables
  vars.addVariable(varName, varValue);
});
