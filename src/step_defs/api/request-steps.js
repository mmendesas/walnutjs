const { Given, When, Then } = require('cucumber');

// eslint-disable-next-line no-undef
const { common, logger, file } = helpers;
const api = require('../../support/api/client');
const jsonparser = require('../../support/parser/jsonparser');


/**
 * Set the default baseURI
 */
Given(/^\(api\) user set the baseURI with '(.*)'$/, (baseURI) => {
  const myBaseURI = common.getTreatedValue(baseURI);
  api.setBaseURL(myBaseURI);
});

/**
 * Create the request for a specific path
 */
Given(/^\(api\) user creates a (POST|GET|PUT|PATCH|DELETE|HEAD) request to '(.*)'$/, (method, path) => {
  api.createRequest(method, path);
});

/**
 * Executes the request
 */
When(/^\(api\) user sends the request$/, () => api.sendRequest());

/**
 * Change request headers
 */
When(/^\(api\) user sets the following headers to request:$/, (data) => {
  data.raw().forEach((item) => {
    const name = common.getTreatedValue(item[0]);
    const value = common.getTreatedValue(item[1]);
    api.addHeader(name, value);
  });
});

/**
 * Add parameters to request
 */
When(/^\(api\) user add the following parameters to request:$/, (data) => {
  data.raw().forEach((item) => {
    api.addParam(item[0], item[1]);
  });
});

/**
 * Add body content from resource
 */
When(/^\(api\) user add the request BODY from the resource '(.*)'$/, (filepath) => {
  let resourcePath = common.getTreatedValue(filepath);
  resourcePath = file.getTreatedPath(resourcePath);

  api.requestContent = '';
  if (filepath === '') {
    logger.error(`File [${resourcePath}] not found. Please set the complete path of the file.`);
  } else {
    api.requestContent = file.readContentFromFile(resourcePath);
  }
  logger.info(`Content Pattern used as body:\n${api.requestContent}\n`);
});


/**
 * Add body as string in current request
 */
When(/^\(api\) user add the following value to BODY request:$/, (fileContent) => {
  const content = common.getTreatedValue(fileContent);
  api.requestContent = content;
  logger.info(`Content Pattern used as body:\n${api.requestContent}\n`);
});

/**
 * User update current json body in request
 */
Then(/^\(api\) user fills '(.*)' with '(.*)'$/, (keyPath, newValue) => {
  const key = common.getTreatedValue(keyPath);
  const value = common.getTreatedValue(newValue);

  // change field value in json
  jsonparser.init(JSON.parse(api.requestContent));
  jsonparser.setValue(key, value);

  // update the value in request content file
  api.requestContent = JSON.stringify(jsonparser.jsonObj);
});

/**
 * User update current json body in request
 */
Then(/^\(api\) user fills '(.*)' with '(.*)' using (STRING|INT|DOUBLE|BOOL) type$/, (keyPath, newValue, type) => {
  const key = common.getTreatedValue(keyPath);
  let value = common.getTreatedValue(newValue);

  switch (type) {
    case 'INT':
      value = parseInt(value, 10);
      break;
    case 'DOUBLE':
      value = parseFloat(value);
      break;
    case 'BOOL':
      value = (value.toLowerCase() === 'true');
      break;
    default:
      value = common.getTreatedValue(value);
      break;
  }

  // change field value in json
  jsonparser.init(JSON.parse(api.requestContent));
  jsonparser.setValue(key, value);

  // update the value in request content file
  api.requestContent = JSON.stringify(jsonparser.jsonObj);
});

/**
 * User update current json body in request with null type
 */
Then(/^\(api\) user fills '(.*)' using NULL type$/, (keyPath) => {
  const key = common.getTreatedValue(keyPath);
  // change field value in json
  jsonparser.init(JSON.parse(api.requestContent));
  jsonparser.setValue(key, null);

  // update the value in request content file
  api.requestContent = JSON.stringify(jsonparser.jsonObj);
});

/**
 * User update string with comma to array current json body in request
 */
Then(/^\(api\) user fills '(.*)' with '(.*)' using an ARRAY of (STRING|INT|DOUBLE) type$/, (keyPath, newValue, type) => {
  const key = common.getTreatedValue(keyPath);
  let value = common.getTreatedValue(newValue);

  switch (type) {
    case 'INT':
      value = value.split(',').map(Number);
      break;
    case 'DOUBLE':
      value = value.split(',').map(item => parseFloat(item));
      break;
    default:
      value = value.split(',');
      break;
  }

  // change field value in json
  jsonparser.init(JSON.parse(api.requestContent));
  jsonparser.setValue(key, value);

  // update the value in request content file
  api.requestContent = JSON.stringify(jsonparser.jsonObj);
});


/**
 * User update current json body in request with multiple fields
 */
When(/^\(api\) user fills the request body with the following fields:$/, (data) => {
  data.raw().forEach((item) => {
    const keyPath = common.getTreatedValue(item[0]);
    const value = common.getTreatedValue(item[1]);

    // change field value in json
    jsonparser.init(JSON.parse(api.requestContent));
    jsonparser.setValue(keyPath, value);

    // update the value in request content file
    api.requestContent = JSON.stringify(jsonparser.jsonObj);
  });
});

/**
* User delete key from the current json body in request
*/
Then(/^\(api\) user deletes key '(.*)'$/, (keyPath) => {
  const key = common.getTreatedValue(keyPath);

  // delete the key in json
  jsonparser.init(JSON.parse(api.requestContent));
  jsonparser.deleteKey(key);

  // update the value in request content file
  api.requestContent = JSON.stringify(jsonparser.jsonObj);
});
