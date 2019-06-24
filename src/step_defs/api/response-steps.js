const api = require('../../support/api/client');
const jsonparser = require('../../support/parser/jsonparser');
const xmlparser = require('../../support/parser/xmlparser');
const { vars, common, logger } = helpers;
const { Then } = require('cucumber');
/**
 *  Validates the response status code
 */
Then(/^\(api\) the response (status|statusText) should be '(\d+)'$/, (type, statusCode) => {
  const recStatus = type === 'status' ? api.response.status.toString() : api.response.statusText;
  assert.equal(statusCode, recStatus);
  logger.info(`User receives response status code [${recStatus}]`)
});

/**
 * Compare the full value of body response
 */
Then(/^\(api\) the (JSON|XML) response should be:$/, (type, content) => {
  api.responseContent = api.responseContent.replace(/(\r\n|\n|\r|\s)/gm, '');
  content = content.replace(/(\r\n|\n|\r|\s)/gm, '');
  // compare
  assert.equal(api.responseContent, content)
});

/**
 * Validates a value in specific node in JSON response.body
 */
Then(/^\(api\) the JSON response key '(.*)' should have value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, (keyPath, comparissonType, expectedValue) => {
  keyPath = common.getTreatedValue(keyPath);
  expectedValue = common.getTreatedValue(expectedValue);

  // get value from JSON using JSONPATH
  jsonparser.init(api.response.data);
  const jsonValue = jsonparser.getValue(keyPath)[0];

  // compare
  common.compare(jsonValue, comparissonType, expectedValue);
});

/**
 * Validates a value in specific node in XML response.body
 */
Then(/^\(api\) the XML response key '(.*)' should have value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, (keyPath, comparissonType, expectedValue) => {

  keyPath = common.getTreatedValue(keyPath);
  expectedValue = common.getTreatedValue(expectedValue);

  // get value from XML using XPATH
  xmlparser.init(api.response.data);
  const xmlValue = xmlparser.getTagValue(keyPath) || '<path not found>';

  // compare
  common.compare(xmlValue, comparissonType, expectedValue);

});

// Validates a value in specific node in response header.
Then(/^\(api\) the header response key '(.*)' should have value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, (header, comparissonType, expectedValue) => {
  // Treat the parameters informations
  header = common.getTreatedValue(header);
  expectedValue = common.getTreatedValue(expectedValue);

  // Get the header value response from parameter informed
  const content = api.response.headers[header];

  // compare
  common.compare(content, comparissonType, expectedValue);
});

/**
* Stores the value of the response field found by json path
*/
Then(/^\(api\) user stores the value '(.*)' from response in variable '(.*)'$/, (keyPath, name) => {
  keyPath = common.getTreatedValue(keyPath);
  const varName = common.getTreatedValue(name);

  // get value from JSON using JSONPATH
  jsonparser.init(api.response.data);
  const varValue = jsonparser.getValue(keyPath)[0];

  // Add the value to variables
  vars.addVariable(varName, varValue);
});
